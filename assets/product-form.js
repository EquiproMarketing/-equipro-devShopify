/* Product-form enhancement only; the shared CartDrawer owns cart mutations and reconciliation. */
(() => {
  if (!window.customElements || !window.MutationObserver || customElements.get('equipro-product-form')) return;
  // Keep acceptance/uncertainty across a section reconnect for this document only.
  const operations = new Map();
  customElements.define('equipro-product-form', class extends HTMLElement {
    constructor() {
      super();
      this.inFlight = false;
      this.submit = this.submit.bind(this);
      this.recover = this.recover.bind(this);
      this.checked = this.checked.bind(this);
      this.onGlobalRetry = event => {
        const retry = document.getElementById('CartFeedbackRetry');
        if (this.operation.awaitingRecovery && event.target.closest('#CartFeedbackRetry') && document.activeElement === retry) {
          this.globalRetryRestore?.();
          this.globalRetryRestore = this.rememberFocus(true);
        }
      };
      this.onReconciled = () => {
        this.operation.reconciled = true;
        this.operation.awaitingRecovery = false;
        if (this.operation.kind === 'accepted') this.operation.kind = 'confirmed';
        // The shared controller releases its pending lock after dispatching this event.
        clearTimeout(this.syncTimer);
        this.syncTimer = setTimeout(() => { if (this.bound) this.sync(); }, 0);
      };
    }

    connectedCallback() {
      if (this.bound) return;
      const root = this.closest('.product-page');
      this.form = this.querySelector('form');
      this.button = this.form?.querySelector('[type="submit"]');
      const map = root && [...document.querySelectorAll('script[type="application/json"][data-quote-root]')].find(script => script.dataset.quoteRoot === root.id);
      if (!this.form || !this.button || !map || this.dataset.ajaxEligible !== 'true') return;
      try { this.variants = JSON.parse(map.textContent); } catch { return; }
      if (!Array.isArray(this.variants)) return;
      if (this.displayVariant === undefined) this.displayVariant = this.variants.find(item => String(item.id) === map.dataset.quoteInitialVariantId);
      const key = root.id + ':' + map.id;
      if (!operations.has(key)) operations.set(key, {kind:'idle', attempted:false, reconciled:false});
      this.operation = operations.get(key);
      this.status = this.querySelector('[data-product-status]');
      this.error = this.querySelector('[data-product-error]');
      this.actions = this.querySelector('[data-product-actions]');
      this.retry = this.querySelector('[data-product-retry]');
      this.acknowledge = this.querySelector('[data-product-checked]');
      if (!this.status || !this.error || !this.actions || !this.retry || !this.acknowledge) return;
      this.bound = true;
      this.button.classList.add('js-add-to-cart-btn');
      this.form.addEventListener('submit', this.submit);
      this.retry.addEventListener('click', this.recover);
      this.acknowledge.addEventListener('click', this.checked);
      document.addEventListener('cart:reconciled', this.onReconciled);
      document.addEventListener('click', this.onGlobalRetry, true);
      // Other callers use the same shared lock. Do not let their finally block
      // re-enable an invalid variant or an unresolved product-form submission.
      this.observer = new MutationObserver(() => {
        this.sync();
        if (this.globalRetryRestore && !this.cart()?.pending) {
          const restore = this.globalRetryRestore;
          this.globalRetryRestore = null;
          restore();
        }
      });
      this.observer.observe(this.button, {attributes:true, attributeFilter:['disabled']});
      const sharedRetry = document.getElementById('CartFeedbackRetry');
      if (sharedRetry) this.observer.observe(sharedRetry, {attributes:true, attributeFilter:['disabled']});
      this.sync();
    }

    disconnectedCallback() {
      if (!this.bound) return;
      this.bound = false;
      this.form.removeEventListener('submit', this.submit);
      this.retry.removeEventListener('click', this.recover);
      this.acknowledge.removeEventListener('click', this.checked);
      document.removeEventListener('cart:reconciled', this.onReconciled);
      document.removeEventListener('click', this.onGlobalRetry, true);
      this.globalRetryRestore?.();
      this.globalRetryRestore = null;
      this.observer.disconnect();
      clearTimeout(this.syncTimer);
    }

    cart() {
      const cart = window.cartDrawer;
      return ['run','request','refreshDrawer'].every(method => typeof cart?.[method] === 'function') ? cart : null;
    }

    variant() {
      const id = this.form.querySelector('[name="id"]')?.value;
      return this.variants.find(item => String(item.id) === id);
    }

    sync(selectedVariant) {
      if (!this.bound) return;
      if (selectedVariant !== undefined) this.displayVariant = selectedVariant;
      const cart = this.cart(), variant = this.variant(), op = this.operation;
      const displayVariant = variant || this.displayVariant;
      const blocked = !variant?.available || !variant?.purchasable || this.inFlight || cart?.pending || cart?.unsynced ||
        ['accepted','uncertain'].includes(op.kind) || ((!cart || typeof FormData !== 'function') && op.attempted);
      if (this.button.disabled !== Boolean(blocked)) this.button.disabled = Boolean(blocked);
      if (this.inFlight) {
        this.button.textContent = this.dataset.adding;
        this.button.setAttribute('aria-busy','true');
      } else {
        this.button.removeAttribute('aria-busy');
        this.button.textContent = !displayVariant ? this.dataset.invalid : !displayVariant.purchasable ? this.dataset.unavailable :
          !displayVariant.available ? this.dataset.soldout : this.dataset.addLabel;
      }
      let message = '';
      if (this.inFlight && op.kind === 'submitting') message = this.dataset.adding;
      else if (op.kind === 'confirmed') message = this.dataset.added.replace('__VARIANT__', op.label);
      else if (op.kind === 'accepted') message = this.dataset.accepted;
      const error = op.kind === 'uncertain' ? [this.dataset.uncertain, op.error].filter(Boolean).join(' ') : op.error || '';
      if (this.status.textContent !== message) this.status.textContent = message;
      if (this.error.textContent !== error) this.error.textContent = error;
      this.error.hidden = !error;
      this.actions.hidden = !message && !error;
      this.retry.hidden = !cart?.unsynced && !['accepted','uncertain'].includes(op.kind);
      this.retry.disabled = Boolean(this.inFlight || cart?.pending || !cart);
      this.acknowledge.hidden = op.kind !== 'uncertain' || !op.reconciled || Boolean(cart?.unsynced) || !cart;
      this.acknowledge.disabled = Boolean(this.inFlight || cart?.pending);
      this.classList.toggle('has-feedback', Boolean(message || error));
    }

    rememberFocus(sharedRetry = false) {
      const trigger = document.activeElement;
      if (!sharedRetry && !this.contains(trigger)) return () => {};
      let moved = false;
      const watch = event => { if (event.target !== trigger && event.target !== document.body) moved = true; };
      document.addEventListener('focusin', watch);
      return () => {
        document.removeEventListener('focusin', watch);
        if (moved || !this.isConnected || document.querySelector('#CartDrawer.is-open') ||
            (document.activeElement !== trigger && document.activeElement !== document.body)) return;
        const usable = element => element && !element.disabled && !element.closest('[hidden], [inert]');
        const target = usable(trigger) ? trigger : usable(this.button) ? this.button : usable(this.retry) ? this.retry : null;
        target?.focus({preventScroll:true});
      };
    }

    payload(event) {
      // Snapshot before either the local or shared controller disables a control.
      const data = event.submitter ? new FormData(this.form, event.submitter) : new FormData(this.form);
      const ids = data.getAll('id'), quantities = data.getAll('quantity');
      const variant = this.variant(), quantity = Number(quantities[0]);
      const rule = variant?.quantity_rule || {min:1,increment:1,max:null};
      if (ids.length !== 1 || !/^\d+$/.test(ids[0]) || !variant?.available || !variant.purchasable ||
          quantities.length !== 1 || !/^\d+$/.test(quantities[0]) || !Number.isSafeInteger(quantity) || quantity < rule.min ||
          (rule.max !== null && quantity > rule.max) || (quantity - rule.min) % rule.increment !== 0 ||
          [...this.form.querySelectorAll('.product-variant-selector')].some(select => variant.options[Number(select.dataset.optionIndex)] !== select.value) ||
          !this.form.checkValidity()) throw new Error(this.dataset.invalid);
      return {data, variant, label: variant.title === 'Default Title' ? this.dataset.productLabel : this.dataset.productLabel + ' — ' + variant.title};
    }

    async submit(event) {
      if (event.defaultPrevented) return;
      const cart = this.cart(), op = this.operation;
      if (this.inFlight || ['accepted','uncertain'].includes(op.kind) || cart?.pending || cart?.unsynced || ((!cart || typeof FormData !== 'function') && op.attempted)) {
        event.preventDefault(); this.sync(); return;
      }
      // Native fallback is allowed only before an AJAX attempt, never after one.
      if (!cart || typeof FormData !== 'function') return;
      event.preventDefault();
      let snapshot;
      try { snapshot = this.payload(event); }
      catch (error) { op.kind = 'rejected'; op.error = error.message; this.sync(); return; }
      const opener = event.submitter || this.button;
      const restoreFocus = this.rememberFocus();
      let addedAndSynced = false;
      Object.assign(op, {kind:'submitting', attempted:true, reconciled:false, awaitingRecovery:false, label:snapshot.label, error:''});
      this.inFlight = true; this.sync();
      try {
        addedAndSynced = await cart.run(async () => {
          try {
            const data = await cart.request(window.Shopify.routes.root + 'cart/add.js', {method:'POST', body:snapshot.data});
            const items = Array.isArray(data.items) ? data.items : [data];
            if (items.length !== 1 || String(items[0].variant_id ?? items[0].id) !== String(snapshot.variant.id) ||
                !Number.isSafeInteger(items[0].quantity) || items[0].quantity < 1) throw new Error(this.dataset.requestError);
            op.kind = 'accepted';
          } catch (error) {
            const rejected = Number.isInteger(error.status) && error.status >= 400 && error.status < 500 && error.status !== 408;
            op.kind = rejected ? 'rejected' : 'uncertain';
            op.error = error.message;
            throw error;
          }
          await cart.refreshDrawer();
        });
      } finally {
        this.inFlight = false;
        op.awaitingRecovery = cart.unsynced;
        if (op.kind === 'accepted' && !cart.unsynced) op.kind = 'confirmed';
        if (op.kind === 'confirmed' && !cart.unsynced && !cart.pending) cart.feedback?.('');
        this.sync();
        if (addedAndSynced && this.isConnected) cart.open?.(opener);
        restoreFocus();
      }
    }

    async recover() {
      const cart = this.cart();
      if (!cart || this.inFlight || cart.pending) return;
      const restoreFocus = this.rememberFocus();
      this.inFlight = true; this.sync();
      try { await cart.run(() => cart.refreshDrawer(), true); }
      finally { this.inFlight = false; this.sync(); restoreFocus(); }
    }

    checked() {
      const cart = this.cart();
      if (!cart || cart.pending || cart.unsynced || this.inFlight || this.operation.kind !== 'uncertain' || !this.operation.reconciled) return;
      Object.assign(this.operation, {kind:'idle', error:''});
      this.sync();
      this.button.focus({preventScroll:true});
    }
  });
})();
