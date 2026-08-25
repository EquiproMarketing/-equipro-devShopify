// assets/quote-modal.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('QuoteModal');
    if (!modal) return;
  
    const openBtns = document.querySelectorAll('[data-open-quote-modal]');
    const closeBtns = document.querySelectorAll('[data-close-quote-modal]');
  
    // Abrir Modal
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
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
  
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
      });
    });
  
    // Cerrar Modal
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  });