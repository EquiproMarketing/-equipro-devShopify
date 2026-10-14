/* One controller owns cart mutations and all cart surfaces. */
class CartDrawer {
  constructor() {
    this.root = window.Shopify?.routes?.root || '/';
    this.busy = false;
    this.unsynced = false;
    this.bindEvents();
  }
  get drawer() { return document.getElementById('CartDrawer'); }
  open() {
    this.returnFocus = document.activeElement;
    this.drawer?.classList.add('is-open');
    this.drawer?.setAttribute('aria-hidden', 'false');
    document.getElementById('CartDrawerOverlay')?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    document.getElementById('CartDrawerClose')?.focus();
  }
  close() {
    this.drawer?.classList.remove('is-open');
    this.drawer?.setAttribute('aria-hidden', 'true');
    document.getElementById('CartDrawerOverlay')?.classList.remove('is-active');
    document.body.style.overflow = '';
    if (this.returnFocus?.isConnected) this.returnFocus.focus();
  }
  status(message, error = false) {
    const status = document.getElementById('CartStatus');
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
    status.classList.toggle('is-error', error);
    document.getElementById('CartRetry').hidden = !this.unsynced;
  }
  setBusy(value) {
    this.busy = value;
    for (const surface of document.querySelectorAll('#CartDrawer, #main-cart-container')) {
      surface.setAttribute('aria-busy', String(value));
    }
    const controls = '.js-qty-btn, .js-qty-change, .js-remove-item, .js-remove-cart-item, .js-qty-input, .js-add-to-cart-btn, form[action$="/cart/add"] button[type="submit"], form[action$="/cart/add"] input[type="submit"], #main-cart-form button[name="checkout"]';
    for (const control of document.querySelectorAll(controls)) {
      if (value && !control.disabled) {
        control.dataset.cartLocked = 'true';
        control.disabled = true;
      } else if (!value && control.dataset.cartLocked) {
        delete control.dataset.cartLocked;
        control.disabled = false;
      }
    }
  }
  sectionIds() {
    return ['cart-drawer', document.getElementById('main-cart-container')?.dataset.sectionId].filter(Boolean);
  }
  async request(url, options = {}) {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), ...options, headers: { Accept: 'application/json', ...options.headers } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.description || data.message || 'Unable to update cart.');
    return data;
  }
  render(sections) {
    const parser = new DOMParser();
    const drawer = parser.parseFromString(sections?.['cart-drawer'] || '', 'text/html');
    const replacements = ['CartDrawerBody', 'CartDrawerFooter', 'CartDrawerCount'].map(id => [document.getElementById(id), drawer.getElementById(id)]);
    const main = document.getElementById('main-cart-container');
    if (main) {
      const page = parser.parseFromString(sections?.[main.dataset.sectionId] || '', 'text/html');
      replacements.push([main, page.getElementById('main-cart-container')]);
    }
    // Validate everything before changing any surface: null sections are possible.
    if (replacements.some(([current, next]) => !current || !next)) throw new Error('Cart updated, but its display could not be refreshed.');
    const count = drawer.getElementById('CartDrawerCount').textContent.replace(/[()]/g, '').trim();
    for (const [current, next] of replacements) current.innerHTML = next.innerHTML;
    for (const badge of document.querySelectorAll('.site-header__cart-count')) badge.textContent = count;
  }
  async refreshDrawer() {
    const url = new URL(window.location.href);
    url.searchParams.set('sections', this.sectionIds().join(','));
    this.render(await this.request(url));
    this.unsynced = false;
  }
  async mutate(endpoint, body, adding = false) {
    if (this.busy || this.unsynced) return;
    this.setBusy(true);
    this.status(adding ? 'Adding to cart…' : 'Updating cart…');
    try {
      const payload = { sections: this.sectionIds(), sections_url: window.location.pathname + window.location.search };
      if (body instanceof FormData) {
        body.set('sections', payload.sections.join(','));
        body.set('sections_url', payload.sections_url);
      } else body = JSON.stringify({ ...body, ...payload });
      const data = await this.request(this.root + endpoint, {
        method: 'POST', body,
        headers: typeof body === 'string' ? { 'Content-Type': 'application/json' } : {}
      });
      try { this.render(data.sections); }
      catch { await this.refreshDrawer(); }
      if (adding) this.open();
      this.status(adding ? 'Added to cart.' : 'Cart updated.');
    } catch (error) {
      // Never retry a POST: a lost response may already have changed the cart.
      this.unsynced = true;
      try { await this.refreshDrawer(); } catch { /* Keep mutations blocked until reconciliation succeeds. */ }
      this.status(this.unsynced ? 'Could not confirm the cart. Check your connection and refresh the cart before continuing.' : error.message, true);
    } finally {
      this.setBusy(false);
    }
  }
  updateQuantity(key, quantity) {
    if (!Number.isSafeInteger(quantity) || quantity < 0) {
      this.status('Enter a whole quantity of zero or more.', true);
      return;
    }
    return this.mutate('cart/change.js', { id: key, quantity });
  }
  bindEvents() {
    document.addEventListener('click', event => {
      const target = event.target.closest('button, a, #CartDrawerOverlay');
      if (!target) return;
      if ((this.busy || this.unsynced) && target.matches('a[href$="/checkout"], button[name="checkout"]')) {
        event.preventDefault();
        return;
      }
      if (['CartDrawerClose', 'CartDrawerContinue', 'CartDrawerOverlay'].includes(target.id)) return this.close();
      if (target.id === 'CartRetry') {
        if (this.busy) return;
        this.setBusy(true);
        this.status('Refreshing cart…');
        this.refreshDrawer().then(() => this.status('Cart refreshed.')).catch(() => this.status('Unable to refresh cart. Check your connection.', true)).finally(() => this.setBusy(false));
        return;
      }
      if (target.matches('.js-qty-btn, .js-qty-change, .js-remove-item, .js-remove-cart-item')) {
        event.preventDefault();
        const input = target.parentElement.querySelector('input');
        const remove = target.matches('.js-remove-item, .js-remove-cart-item');
        const quantity = remove ? 0 : Math.max(0, Number(input.value) + (target.dataset.action === 'plus' ? 1 : -1));
        this.updateQuantity(target.dataset.key, quantity);
      } else if (target.matches('.js-add-to-cart-btn')) {
        event.preventDefault();
        if (target.disabled || !target.dataset.variantId) return;
        this.mutate('cart/add.js', { items: [{ id: target.dataset.variantId, quantity: 1 }] }, true);
      } else if (target.matches('a') && !target.closest('#CartDrawer')) {
        const url = new URL(target.href);
        const cartPath = this.root + 'cart';
        if (url.origin === location.origin && url.pathname.replace(/\/$/, '') === cartPath && location.pathname.replace(/\/$/, '') !== cartPath && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
          event.preventDefault();
          this.open();
        }
      }
    });
    document.addEventListener('change', event => {
      if (event.target.matches('.js-qty-input')) this.updateQuantity(event.target.dataset.key, event.target.value === '' ? NaN : Number(event.target.value));
    });
    document.addEventListener('submit', event => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (form.id === 'main-cart-form' && (this.busy || this.unsynced)) { event.preventDefault(); return; }
      const url = new URL(form.action);
      // Only existing purchase forms are intercepted; quote/contact forms keep their flow.
      if (url.origin !== location.origin || url.pathname !== this.root + 'cart/add') return;
      event.preventDefault();
      if (event.submitter?.disabled) return;
      this.mutate('cart/add.js', new FormData(form), true);
    });
    document.addEventListener('keydown', event => {
      if (!this.drawer?.classList.contains('is-open')) return;
      if (event.key === 'Escape') this.close();
      if (event.key !== 'Tab') return;
      const items = [...this.drawer.querySelectorAll('a, button, input')].filter(el => !el.disabled && el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
  }
}
window.cartDrawer = new CartDrawer();
