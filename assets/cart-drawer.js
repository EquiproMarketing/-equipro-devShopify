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
        const error = new Error(message || this.errorMessage());
        error.status = response.status;
        throw error;
      }
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(this.errorMessage());
      return data;
    }

    async run(work, recovery = false) {
      if (this.pending || (this.unsynced && !recovery)) return false;
      this.pending = true;
      this.pendingTrigger = document.activeElement;
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
        controls.forEach(control => { if (control.isConnected) control.disabled = false; });
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
        if (window.location.pathname.replace(/\/$/, '') === window.Shopify.routes.root + 'cart') window.location.reload();
      });
    }

    async refreshDrawer() {
      const url = new URL(window.location.href);
      url.searchParams.set('sections', 'cart-drawer');
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
      this.unsynced = false;
      if (typeof CustomEvent === 'function') document.dispatchEvent(new CustomEvent('cart:reconciled'));
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
