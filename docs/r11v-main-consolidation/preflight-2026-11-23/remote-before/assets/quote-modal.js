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
    const focusInside = () => {
      cancelFocus();
      const epoch = focusEpoch;
      const attempt = () => {
        focusFrame = 0;
        if (epoch !== focusEpoch || !modal.classList.contains('is-open')) return;
        const name = modal.querySelector('#QuoteName');
        if (usable(name)) {
          name.focus();
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
        
        // Capturar la variante activa del selector nativo de Shopify si existe
        const variantInput = document.querySelector('input[name="id"]:checked, select[name="id"]');
        const productTitle = btn.dataset.productTitle || document.querySelector('.product__title')?.innerText || '';
        
        if (variantInput) {
          const variantTitle = variantInput.dataset.variantTitle || variantInput.options?.[variantInput.selectedIndex]?.text || '';
          document.getElementById('QuoteProductVariant').value = variantTitle;
        }
  
        if (productTitle) {
          document.getElementById('QuoteProductTitle').value = productTitle;
          document.getElementById('QuoteProductDisplay').innerText = productTitle;
        }
  
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
