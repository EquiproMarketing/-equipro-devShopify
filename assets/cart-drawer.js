class CartDrawer {
    constructor() {
      this.drawer = document.getElementById('CartDrawer');
      this.overlay = document.getElementById('CartDrawerOverlay');
      this.closeBtn = document.getElementById('CartDrawerClose');
      this.continueBtn = document.getElementById('CartDrawerContinue');
      
      this.pending = false;
      this.unsynced = false;
      this.init();
    }
  
    init() {
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.overlay) this.overlay.addEventListener('click', () => this.close());

  
      this.bindEvents();
    }
  
    focusableElements() {
      return [...this.drawer.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]')]
        .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && !element.closest('[inert], [hidden]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
    }

    focusInside(preferred) {
      const elements = this.focusableElements();
      (elements.includes(preferred) ? preferred : elements.includes(this.closeBtn) ? this.closeBtn : elements[0] || this.drawer).focus({ preventScroll: true });
    }

    open(trigger = this.pendingTrigger || document.activeElement) {
      if (document.querySelector('#QuoteModal.is-open')) return;
      if (this.drawer && this.overlay) {
        if (this.drawer.classList.contains('is-open')) return;
        this.returnFocus = trigger && !this.drawer.contains(trigger) ? trigger : null;
        this.previousOverflow = document.body.style.overflow;
        this.previousTabIndex = this.drawer.getAttribute('tabindex');
        this.drawer.setAttribute('tabindex', '-1');
        this.drawer.classList.add('is-open');
        this.drawer.setAttribute('aria-hidden', 'false');
        this.drawer.removeAttribute('inert');
        this.overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        this.focusListeners = new AbortController();
        const options = { capture: true, signal: this.focusListeners.signal };
        document.addEventListener('keydown', event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.close();
          } else if (event.key === 'Tab') {
            const elements = this.focusableElements();
            const index = elements.indexOf(document.activeElement);
            if (!elements.length || index === -1 || (event.shiftKey ? index === 0 : index === elements.length - 1)) {
              event.preventDefault();
              this.focusInside(event.shiftKey ? elements[elements.length - 1] : elements[0]);
            }
          }
        }, options);
        document.addEventListener('focusin', event => {
          if (document.querySelector('#QuoteModal.is-open')) this.close(false);
          else if (!this.drawer.contains(event.target)) this.focusInside();
        }, options);
        this.focusInside();
      }
    }

    close(restoreFocus = true) {
      if (this.drawer && this.overlay && this.drawer.classList.contains('is-open')) {
        this.focusListeners?.abort();
        this.focusListeners = null;
        this.drawer.classList.remove('is-open');
        this.overlay.classList.remove('is-active');
        if (!document.querySelector('#QuoteModal.is-open')) {
          document.body.style.overflow = this.previousOverflow;
          if (restoreFocus) {
            const usable = element => element?.isConnected && !element.matches(':disabled') && !element.closest('[inert], [hidden]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
            const fallback = [...document.querySelectorAll('a[href]')].find(element => !this.drawer.contains(element) && usable(element) && new URL(element.href).pathname === window.Shopify.routes.root + 'cart');
            const target = usable(this.returnFocus) ? this.returnFocus : fallback;
            if (target) target.focus({ preventScroll: true });
            else {
              const main = document.querySelector('main, #MainContent') || document.body;
              const tabIndex = main.getAttribute('tabindex');
              main.setAttribute('tabindex', '-1');
              main.focus({ preventScroll: true });
              if (tabIndex === null) main.removeAttribute('tabindex'); else main.setAttribute('tabindex', tabIndex);
            }
          }
        }
        this.returnFocus = null;
        this.drawer.setAttribute('aria-hidden', 'true');
        this.drawer.setAttribute('inert', '');
        if (this.previousTabIndex === null) this.drawer.removeAttribute('tabindex');
        else this.drawer.setAttribute('tabindex', this.previousTabIndex);
      }
    }

    bindEvents() {
      document.addEventListener('click', (e) => {
        if ((this.pending || this.unsynced) && e.target.closest('a[href$="/checkout"]')) { e.preventDefault(); return; }
        if (e.target.closest('#CartDrawerContinue')) this.close();
        if (e.target.closest('#CartFeedbackRetry')) this.run(() => this.refreshDrawer(), true);
        // Cart-page controls share the same transaction/recovery owner as the drawer.
        const pageControl = e.target.closest('.js-qty-change, .js-remove-cart-item');
        const page = document.getElementById('main-cart-container');
        if (pageControl && page?.contains(pageControl)) {
          e.preventDefault();
          if (this.pending || this.unsynced) return;
          const input = pageControl.parentElement.querySelector('input[type="number"]');
          const quantity = pageControl.classList.contains('js-remove-cart-item') ? 0 :
            input?.value === '' ? NaN : Number(input?.value);
          if (!Number.isSafeInteger(quantity) || quantity < 0) { this.feedback(this.errorMessage()); return; }
          this.updateQuantity(pageControl.dataset.key, pageControl.classList.contains('js-remove-cart-item') ? 0 :
            Math.max(0, quantity + (pageControl.dataset.action === 'plus' ? 1 : -1)));
          return;
        }
        // Modificar cantidad (+ / -)
        if (e.target.classList.contains('js-qty-btn')) {
          const key = e.target.getAttribute('data-key');
          const action = e.target.getAttribute('data-action');
          const input = e.target.parentElement.querySelector('.js-qty-input');
          let currentQty = parseInt(input.value) || 0;
  
          if (action === 'plus') currentQty += 1;
          if (action === 'minus') currentQty -= 1;
  
          this.updateQuantity(key, currentQty);
        }
  
        // Eliminar producto
        if (e.target.classList.contains('js-remove-item')) {
          const key = e.target.getAttribute('data-key');
          this.updateQuantity(key, 0);
        }
      });
      document.addEventListener('change', e => {
        if (e.target.matches('.js-qty-input')) this.updateQuantity(e.target.dataset.key, e.target.value === '' ? NaN : Number(e.target.value));
      });
      document.addEventListener('submit', e => {
        const url = new URL(e.target.action, window.location.href);
        if ((this.pending || this.unsynced) && url.origin === window.location.origin && [window.Shopify.routes.root + 'cart/add', window.Shopify.routes.root + 'cart'].includes(url.pathname)) e.preventDefault();
      });
    }

    feedback(message) {
      const region = document.getElementById('CartFeedback');
      if (region) { region.textContent = message; region.hidden = !message; }
      const retry = document.getElementById('CartFeedbackRetry');
      if (retry) retry.hidden = !this.unsynced;
    }

    errorMessage(kind = 'error') {
      return document.getElementById('CartFeedback')?.dataset[kind] || 'Unable to update cart.';
    }

    async request(url, options = {}) {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000), ...options, headers: { Accept: 'application/json', ...options.headers } });
      let data;
      try { data = await response.json(); } catch { throw new Error(this.errorMessage()); }
      if (!response.ok) {
        const errors = data?.errors && typeof data.errors === 'object' ? Object.values(data.errors).flat().filter(value => typeof value === 'string').join(' ') : data?.errors;
        const message = [data?.description, data?.message, errors].find(value => typeof value === 'string' && value.trim());
        throw Object.assign(new Error(message || this.errorMessage()), { status: response.status });
      }
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(this.errorMessage());
      return data;
    }

    async run(work, recovery = false) {
      if (this.pending || (this.unsynced && !recovery)) return false;
      this.pending = true;
      this.pendingTrigger = document.activeElement;
      const page = document.getElementById('main-cart-container');
      const row = this.pendingTrigger?.closest('[data-line-item-key]');
      if (page?.contains(row)) {
        this.pageFocusRequest = {
          trigger: this.pendingTrigger, key: row.dataset.lineItemKey,
          tagName: this.pendingTrigger.tagName, action: this.pendingTrigger.dataset.action,
          remove: this.pendingTrigger.classList.contains('js-remove-cart-item'), cancelled: false
        };
      } else if (!recovery || this.pendingTrigger?.id !== 'CartFeedbackRetry') this.pageFocusRequest = null;
      const intent = this.pageFocusRequest;
      const trackFocus = event => {
        if (intent && event.target !== intent.trigger && event.target !== document.body && event.target.id !== 'CartFeedbackRetry') intent.cancelled = true;
      };
      document.addEventListener('focusin', trackFocus);
      this.feedback('');
      const controls = [...document.querySelectorAll('.js-add-to-cart-btn, .js-qty-btn, .js-remove-item, .js-qty-input, .js-qty-change, .js-remove-cart-item, #CartFeedbackRetry, button[name="checkout"]')].filter(control => !control.disabled);
      controls.forEach(control => { control.disabled = true; });
      try { await work(); this.feedback(''); return true; }
      catch (error) {
        this.unsynced = true;
        if (!recovery) { try { await this.refreshDrawer(); } catch {} }
        this.feedback(this.unsynced ? this.errorMessage('refreshError') : error.message || this.errorMessage());
        return false;
      } finally {
        document.removeEventListener('focusin', trackFocus);
        if (!this.unsynced) this.pageFocusRequest = null;
        controls.forEach(control => { if (control.isConnected) control.disabled = false; });
        document.querySelectorAll('#main-cart-form button[name="checkout"]').forEach(control => { control.disabled = this.unsynced; });
        if (this.unsynced && intent && !intent.cancelled && document.activeElement === document.body &&
            intent.trigger.isConnected && !intent.trigger.disabled && !this.drawer.classList.contains('is-open')) intent.trigger.focus({ preventScroll: true });
        this.pending = false;
        this.pendingTrigger = null;
      }
    }

    updateQuantity(key, quantity) {
      if (!Number.isSafeInteger(quantity) || quantity < 0) { this.feedback(this.errorMessage()); return Promise.resolve(false); }
      return this.run(async () => {
        const cart = await this.request(window.Shopify.routes.root + 'cart/change.js', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: key, quantity })
        });
        if (!Array.isArray(cart.items)) throw new Error(this.errorMessage());
        await this.refreshDrawer();
      });
    }

    async refreshDrawer() {
      const url = new URL(window.location.href);
      const page = document.getElementById('main-cart-container');
      const pageSection = page?.dataset.cartSectionId;
      if (page && !pageSection) throw new Error(this.errorMessage('refreshError'));
      url.searchParams.set('sections', pageSection ? 'cart-drawer,' + pageSection : 'cart-drawer');
      // Request section rendering, rather than the cart/product JSON representation.
      const sections = await this.request(url.toString(), { headers: { Accept: 'text/html' } });
      if (typeof sections['cart-drawer'] !== 'string') throw new Error(this.errorMessage('refreshError'));
      const html = new DOMParser().parseFromString(sections['cart-drawer'], 'text/html');
      const newBody = html.getElementById('CartDrawerBody');
      const newCount = html.getElementById('CartDrawerCount');
      const newFooter = html.getElementById('CartDrawerFooter');
      const body = document.getElementById('CartDrawerBody');
      const count = document.getElementById('CartDrawerCount');
      const footer = document.getElementById('CartDrawerFooter');
      if (!newBody || !newCount || !body || !count || !this.drawer) throw new Error(this.errorMessage('refreshError'));
      let newPage;
      const active = document.activeElement;
      const currentPageFocus = page?.contains(active) ? active : null;
      const savedFocus = this.pageFocusRequest;
      const restoreSaved = savedFocus && !savedFocus.cancelled && !this.drawer.classList.contains('is-open') &&
        (active === document.body || active === savedFocus.trigger || active?.id === 'CartFeedbackRetry');
      const pageFocus = currentPageFocus ? {
        key: currentPageFocus.closest('[data-line-item-key]')?.dataset.lineItemKey,
        tagName: currentPageFocus.tagName, action: currentPageFocus.dataset.action,
        remove: currentPageFocus.classList.contains('js-remove-cart-item')
      } : restoreSaved ? savedFocus : null;
      if (page) {
        if (typeof sections[pageSection] !== 'string') throw new Error(this.errorMessage('refreshError'));
        const pageHTML = new DOMParser().parseFromString(sections[pageSection], 'text/html');
        newPage = pageHTML.getElementById('main-cart-container');
        const countValue = Number(newCount.textContent.replace(/[()]/g, '').trim());
        if (!newPage || newPage.dataset.cartSectionId !== pageSection || !Number.isSafeInteger(countValue) || countValue < 0 ||
            (countValue === 0 ? !newPage.querySelector('[data-cart-empty]') || newPage.querySelector('#main-cart-form') :
              !newPage.querySelector('#main-cart-form') || !newPage.querySelector('#cart-subtotal'))) throw new Error(this.errorMessage('refreshError'));
        const pageLines = [...newPage.querySelectorAll('[data-line-item-key]')];
        const drawerLines = [...newBody.querySelectorAll('.cart-drawer-item')];
        const keys = pageLines.map(row => row.dataset.lineItemKey);
        const quantities = pageLines.map(row => Number(row.querySelector('input[type="number"]')?.value));
        if (new Set(keys).size !== keys.length || keys.some(key => !key) || quantities.some(value => !Number.isSafeInteger(value) || value < 1) ||
            quantities.reduce((total, value) => total + value, 0) !== countValue || pageLines.length !== drawerLines.length || pageLines.some(row => {
          const input = row.querySelector('input[type="number"]');
          const line = drawerLines.find(item => item.dataset.key === row.dataset.lineItemKey);
          return !input || !line || input.value !== line.querySelector('.js-qty-input')?.value;
        })) throw new Error(this.errorMessage('refreshError'));
      }
      const focused = this.drawer.contains(document.activeElement) ? document.activeElement : null;
      body.innerHTML = newBody.innerHTML;
      count.textContent = newCount.textContent;
      if (footer) { if (newFooter) footer.replaceWith(newFooter); else footer.remove(); }
      else if (newFooter) body.after(newFooter);
      document.querySelectorAll('.site-header__cart-count').forEach(badge => { badge.textContent = newCount.textContent.replace(/[()]/g, '').trim(); });
      if (this.drawer.classList.contains('is-open') && (!this.drawer.contains(document.activeElement) || document.activeElement.matches(':disabled'))) {
        const replacement = focused && this.focusableElements().find(element =>
          (focused.id && element.id === focused.id) ||
          (focused.dataset.key && element.dataset.key === focused.dataset.key && element.tagName === focused.tagName && element.dataset.action === focused.dataset.action) ||
          (focused.tagName === 'A' && element.tagName === 'A' && element.getAttribute('href') === focused.getAttribute('href')));
        this.focusInside(replacement);
      }
      if (page) {
        page.innerHTML = newPage.innerHTML;
        if (pageFocus) {
          const row = [...page.querySelectorAll('[data-line-item-key]')].find(item => item.dataset.lineItemKey === pageFocus.key);
          const replacement = row && [...row.querySelectorAll('button, input, a')].find(item =>
            !item.disabled && item.tagName === pageFocus.tagName && item.dataset.action === pageFocus.action &&
            (pageFocus.tagName !== 'BUTTON' || item.classList.contains('js-remove-cart-item') === pageFocus.remove));
          if (replacement) replacement.focus({ preventScroll: true });
          else {
            page.setAttribute('tabindex', '-1');
            page.focus({ preventScroll: true });
          }
        }
      }
      this.unsynced = false;
      document.dispatchEvent(new CustomEvent('cart:reconciled'));
    }

  }
  
  // Inicializar globalmente para poder invocarlo desde los botones de Add to Cart
  window.cartDrawer = new CartDrawer();

  document.addEventListener('DOMContentLoaded', () => {
    // Solo intercepta clics en /cart si vienen de enlaces fuera de la página de carrito activa
    const isCartPage = window.location.pathname.includes('/cart');
    
    if (!isCartPage) {
      const cartLinks = document.querySelectorAll('a[href="/cart"], a[href*="/cart"]');
      cartLinks.forEach(link => {
        if (!link.closest('#CartDrawer')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.cartDrawer) window.cartDrawer.open();
          });
        }
      });
    }
  });
