(() => {
  const initialize = () => {
    const modal = document.getElementById('QuoteModal');
    if (!modal || modal.dataset.quoteReady) return;
    modal.dataset.quoteReady = 'true';
    const form = modal.querySelector('#QuoteForm');
    const field = name => form.elements.namedItem(`contact[${name}]`);
    const results = [...modal.querySelectorAll('[data-quote-result]')];
    const storageKey = 'equipro.quote.pending';
    let returnFocus;
    let contextInvalid = false;
    const contextError = modal.querySelector('#QuoteVariantError');
    let previousOverflow;
    let inertElements = [];
    let pending = null;
    let storageAvailable = true;
    try { pending = JSON.parse(sessionStorage.getItem(storageKey)); } catch { storageAvailable = false; }

    const clearPending = () => {
      try { sessionStorage.removeItem(storageKey); } catch {}
    };
    const clearResult = () => {
      results.forEach(result => { result.hidden = true; });
      field('email').removeAttribute('aria-invalid');
      field('email').removeAttribute('aria-describedby');
    };
    const preview = () => {
      document.getElementById('QuoteProductDisplay').textContent = field('Requested_Product').value || 'General Equipment Inquiry';
      document.getElementById('QuoteVariantDisplay').textContent = [field('Variant').value, field('SKU').value].filter(Boolean).join(' / ');
    };
    const captureProduct = opener => {
      for (const name of ['Product_ID', 'Variant_ID', 'Requested_Product', 'Variant', 'SKU']) field(name).value = '';
      field('Quantity').value = '1';
      contextInvalid = false;
      if (contextError) contextError.hidden = true;
      form.querySelector('[type="submit"]').disabled = false;
      if (!opener.hasAttribute('data-quote-general')) {
        const source = document.querySelector('[data-quote-product-id]');
        if (source) {
          const productInput = [...document.querySelectorAll('form input[name="product-id"]')].find(input => input.value === source.dataset.quoteProductId);
          const candidateRoot = source.dataset.quoteRoot ? document.getElementById(source.dataset.quoteRoot) : productInput?.form;
          const root = productInput && candidateRoot?.contains(productInput) ? candidateRoot : null;
          const variantInput = root?.querySelector('input[name="id"], select[name="id"]');
          const quantityInput = root?.querySelector('[name="quantity"]');
          let variants = [];
          try {
            const parsed = JSON.parse(source.textContent);
            if (Array.isArray(parsed)) variants = parsed.filter(item => item && /^\d+$/.test(String(item.id)));
          } catch {}
          // Quote identity follows real selected options, never purchase eligibility.
          // Missing or ambiguous context must not fall back to an initial variant.
          const selectors = root ? [...root.querySelectorAll('.product-variant-selector[data-option-index]')] : [];
          let variant;
          if (root && selectors.length) {
            const indexes = selectors.map(select => Number(select.dataset.optionIndex));
            const valid = indexes.every(index => Number.isInteger(index) && index >= 0 && index < 3) &&
              new Set(indexes).size === indexes.length && selectors.every(select => select.selectedIndex >= 0);
            const matches = valid ? variants.filter(item => Array.isArray(item.options) &&
              selectors.every((select, i) => item.options[indexes[i]] === select.value)) : [];
            if (matches.length === 1) variant = matches[0];
          } else if (root) {
            const matches = variants.filter(item => String(item.id) === variantInput?.value);
            if (matches.length === 1) variant = matches[0];
            else if (!variantInput?.value && variants.length === 1) variant = variants[0];
          }
          contextInvalid = !variant;
          if (contextError) contextError.hidden = !contextInvalid;
          form.querySelector('[type="submit"]').disabled = contextInvalid;
          field('Product_ID').value = source.dataset.quoteProductId;
          field('Requested_Product').value = source.dataset.quoteProductTitle;
          field('Variant_ID').value = variant ? String(variant.id) : '';
          field('Variant').value = variant?.title || decodeURIComponent((variant?.quote_title || '').replace(/\+/g, ' '));
          field('SKU').value = decodeURIComponent((variant?.quote_sku || '').replace(/\+/g, ' '));
          field('Quantity').value = quantityInput ? quantityInput.value : '1';
        } else if (document.querySelector('form input[name="product-id"]')) {
          contextInvalid = true;
          if (contextError) contextError.hidden = false;
          form.querySelector('[type="submit"]').disabled = true;
        }
      }
      preview();
    };
    const focusable = () => [...modal.querySelectorAll('button, input:not([type="hidden"]), textarea, select, a[href]')]
      .filter(element => !element.disabled && element.getClientRects().length);
    const open = (opener, result) => {
      if (modal.classList.contains('is-open')) return;
      returnFocus = opener || document.querySelector('[data-open-quote-modal]') || document.activeElement;
      previousOverflow = document.body.style.overflow;
      for (const element of document.body.children) {
        if (!element.contains(modal) && !element.inert) {
          element.inert = true;
          inertElements.push(element);
        }
      }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      (result || field('Name')).focus();
    };
    const close = () => {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      inertElements.forEach(element => { element.inert = false; });
      inertElements = [];
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus();
    };
    const cleanReturnMarker = () => {
      const url = new URL(location.href);
      if (!url.searchParams.has('quote_request')) return;
      url.searchParams.delete('quote_request');
      if (url.hash === '#QuoteForm') url.hash = '';
      history.replaceState(history.state, '', url);
    };

    document.addEventListener('click', event => {
      const opener = event.target.closest('[data-open-quote-modal]');
      if (opener) {
        event.preventDefault();
        clearResult();
        captureProduct(opener);
        open(opener);
      } else if (event.target.closest('[data-close-quote-modal]')?.closest('#QuoteModal') === modal) close();
    });
    document.addEventListener('keydown', event => {
      if (!modal.classList.contains('is-open')) return;
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const controls = focusable();
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    });
    document.addEventListener('submit', event => {
      if (event.target !== form) {
        if (event.target.elements?.namedItem('form_type')?.value === 'contact') {
          clearPending();
          cleanReturnMarker();
        }
        return;
      }
      if (event.defaultPrevented) return;
      if (contextInvalid) { event.preventDefault(); contextError?.focus(); return; }
      if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); return; }
      const token = crypto.randomUUID();
      const url = new URL(location.href);
      url.searchParams.delete('contact_posted');
      url.searchParams.delete('form_type');
      url.searchParams.set('quote_request', token);
      url.hash = 'QuoteForm';
      form.elements.namedItem('return_to').value = url.pathname + url.search + url.hash;
      const action = new URL(form.action);
      action.searchParams.set('quote_request', token);
      action.hash = 'QuoteForm';
      form.action = action.href;
      const fields = {};
      for (const input of form.elements) {
        if (input.name?.startsWith('contact[')) fields[input.name] = input.value;
      }
      try { sessionStorage.setItem(storageKey, JSON.stringify({ token, time: Date.now(), fields })); } catch {}
    });

    const url = new URL(location.href);
    const token = url.searchParams.get('quote_request');
    const recent = pending && Date.now() - pending.time >= 0 && Date.now() - pending.time < 20 * 60 * 1000;
    const attributed = token && url.hash === '#QuoteForm' && (storageAvailable ? recent && pending.token === token : /^[a-f\d-]{36}$/i.test(token));
    const result = results.find(item => item.dataset.quoteResult === 'error') || results[0];
    if (attributed && result) {
      if (recent && pending.token === token) {
        for (const input of form.elements) {
          if (input.name?.startsWith('contact[') && Object.hasOwn(pending.fields || {}, input.name)) input.value = pending.fields[input.name];
        }
      }
      preview();
      result.hidden = false;
      if (result.dataset.quoteResult === 'error' && result.hasAttribute('data-quote-email-error')) {
        field('email').setAttribute('aria-invalid', 'true');
        field('email').setAttribute('aria-describedby', 'QuoteErrors');
      }
      open(null, result);
      clearPending();
    } else if (pending && !recent) clearPending();
    cleanReturnMarker();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
