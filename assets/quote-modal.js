// assets/quote-modal.js
(() => {
  const initialize = () => {
    const modal = document.getElementById('QuoteModal');
    if (!modal || modal.dataset.quoteReady) return;
    modal.dataset.quoteReady = 'true';
    modal.setAttribute('aria-modal', 'true');
    modal.tabIndex = -1;
    modal.inert = true;
  
    const openBtns = document.querySelectorAll('[data-open-quote-modal]');
    const closeBtns = modal.querySelectorAll('[data-close-quote-modal]');
    const form = modal.querySelector('#QuoteForm');
    const titleField = form.querySelector('#QuoteProductTitle');
    const variantField = form.querySelector('#QuoteProductVariant');
    const skuField = form.querySelector('#QuoteProductSKU');
    const submit = form.querySelector('[type="submit"]');
    const productDisplay = modal.querySelector('#QuoteProductDisplay');
    const pageProductTitle = titleField.value;
    const initialDisplay = productDisplay.textContent.trim();
    const selectionStatus = document.createElement('p');
    selectionStatus.setAttribute('role', 'status');
    selectionStatus.tabIndex = -1;
    selectionStatus.hidden = true;
    form.prepend(selectionStatus);
    let returnFocus;
    let previousOverflow;
    let inertElements = [];
    const usable = element => element && element.isConnected && !element.disabled &&
      !element.closest('[inert]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
    const focusable = () => [...modal.querySelectorAll('button, input:not([type="hidden"]), textarea, select, a[href], [tabindex]')]
      .filter(element => element.tabIndex >= 0 && usable(element));
    let focusFrame = 0;
    let focusEpoch = 0;
    const cancelFocus = () => {
      focusEpoch += 1;
      cancelAnimationFrame(focusFrame);
      focusFrame = 0;
    };
    const selectedVariant = (map, productRoot) => {
      if (!map || !productRoot) return null;
      let variants;
      try { variants = JSON.parse(map.textContent); } catch { return null; }
      if (!Array.isArray(variants)) return null;
      const initial = variants.find(variant => String(variant.id) === map.dataset.quoteInitialVariantId);
      if (!Array.isArray(initial?.options)) return null;

      const selectors = [...productRoot.querySelectorAll('.product-variant-selector')];
      if (!selectors.length) return initial;
      const options = [...initial.options];
      const indexes = new Set();
      for (const selector of selectors) {
        const index = Number(selector.dataset.optionIndex);
        if (!selector.value || !Number.isInteger(index) || index < 0 || index >= options.length || indexes.has(index)) return null;
        indexes.add(index);
        options[index] = selector.value;
      }
      const matches = variants.filter(variant => options.every((value, index) => value === variant.options?.[index]));
      return matches.length === 1 ? matches[0] : null;
    };

    const syncQuoteProduct = trigger => {
      const triggerRoot = trigger?.closest('.product-page');
      const maps = [...document.querySelectorAll('script[data-quote-root]')].filter(map =>
        triggerRoot ? map.dataset.quoteRoot === triggerRoot.id : map.hasAttribute('data-quote-page-product')
      );
      const map = maps.length === 1 ? maps[0] : null;
      const explicitTitle = trigger?.dataset.productTitle;
      const title = explicitTitle || map?.dataset.quoteProductTitle || pageProductTitle;
      const productRoot = map && document.getElementById(map.dataset.quoteRoot);
      const variant = !explicitTitle || explicitTitle === map?.dataset.quoteProductTitle
        ? selectedVariant(map, productRoot)
        : null;
      const needsSelection = Boolean((title || triggerRoot || maps.length) && !variant);

      titleField.value = title;
      variantField.value = variant?.title ?? '';
      skuField.value = variant?.sku ?? '';
      productDisplay.textContent = title || initialDisplay;
      submit.disabled = needsSelection;
      selectionStatus.hidden = !needsSelection;
      selectionStatus.textContent = needsSelection
        ? document.documentElement.lang.toLowerCase().startsWith('fr')
          ? 'Fermez cette fenêtre et sélectionnez une variante du produit.'
          : 'Close this window and select a product variant.'
        : '';
      return !needsSelection;
    };

    const focusInside = () => {
      cancelFocus();
      const epoch = focusEpoch;
      const attempt = () => {
        focusFrame = 0;
        if (epoch !== focusEpoch || !modal.classList.contains('is-open')) return;
        const target = selectionStatus.hidden ? modal.querySelector('#QuoteName') : selectionStatus;
        if (usable(target)) {
          target.focus();
        } else if (getComputedStyle(modal).visibility === 'hidden') {
          focusFrame = requestAnimationFrame(attempt);
        } else {
          (focusable()[0] || modal).focus();
        }
      };
      focusFrame = requestAnimationFrame(attempt);
    };
    document.addEventListener('equipro:quote-menu-release', event => {
      if (modal.classList.contains('is-open') &&
          !document.getElementById('MobileDrawer')?.classList.contains('is-open') &&
          typeof event.detail?.previousOverflow === 'string') {
        previousOverflow = event.detail.previousOverflow;
      }
    });
  
    // Abrir Modal
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal.classList.contains('is-open')) return;
        
        syncQuoteProduct(btn);
        returnFocus = btn;
        previousOverflow = document.body.style.overflow;
        inertElements = [];
        for (const element of document.body.children) {
          if (!element.contains(modal) && !element.inert) {
            element.inert = true;
            inertElements.push(element);
          }
        }
        modal.inert = false;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
        focusInside();
      });
    });
  
    form.addEventListener('submit', event => {
      if (!syncQuoteProduct(returnFocus)) {
        event.preventDefault();
        focusInside();
      }
    });

    // Cerrar Modal
    const closeModal = () => {
      if (!modal.classList.contains('is-open')) return;
      cancelFocus();
      modal.classList.remove('is-open');
      modal.inert = true;
      modal.setAttribute('aria-hidden', 'true');
      inertElements.forEach(element => { element.inert = false; });
      inertElements = [];
      document.body.style.overflow = previousOverflow;
      const opener = [returnFocus, ...openBtns, document.getElementById('HeaderHamburger')].find(usable);
      opener?.focus({ preventScroll: true });
    };
  
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      } else if (e.key === 'Tab') {
        const controls = focusable();
        const index = controls.indexOf(document.activeElement);
        if (index === -1 || (e.shiftKey ? index === 0 : index === controls.length - 1)) {
          e.preventDefault();
          (e.shiftKey ? controls[controls.length - 1] : controls[0])?.focus();
          if (!controls.length) modal.focus();
        }
      }
    }, true);
    document.addEventListener('focusin', () => {
      if (modal.classList.contains('is-open') && !modal.contains(document.activeElement)) focusInside();
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
