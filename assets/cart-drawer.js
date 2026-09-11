class CartDrawer {
    constructor() {
      this.drawer = document.getElementById('CartDrawer');
      this.overlay = document.getElementById('CartDrawerOverlay');
      this.closeBtn = document.getElementById('CartDrawerClose');
      this.continueBtn = document.getElementById('CartDrawerContinue');
      
      this.init();
    }
  
    init() {
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.overlay) this.overlay.addEventListener('click', () => this.close());
      if (this.continueBtn) this.continueBtn.addEventListener('click', () => this.close());
  
      this.bindEvents();
    }
  
    open() {
      if (this.drawer && this.overlay) {
        this.drawer.classList.add('is-open');
        this.overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    }
  
    close() {
      if (this.drawer && this.overlay) {
        this.drawer.classList.remove('is-open');
        this.overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  
    bindEvents() {
      document.addEventListener('click', (e) => {
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
    }
  
    updateQuantity(key, quantity) {
      fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: key, quantity: quantity })
      })
      .then(response => response.json())
      .then(() => {
        this.refreshDrawer();
      })
      .catch(error => console.error('Error updating cart:', error));
    }
  
    refreshDrawer() {
      fetch(`${window.Shopify.routes.root}?sections=cart-drawer`)
        .then(res => res.json())
        .then(sections => {
          const parser = new DOMParser();
          const html = parser.parseFromString(sections['cart-drawer'], 'text/html');
  
          const newBody = html.getElementById('CartDrawerBody');
          const newFooter = html.getElementById('CartDrawerFooter');
          const newCount = html.getElementById('CartDrawerCount');
  
          if (newBody) document.getElementById('CartDrawerBody').innerHTML = newBody.innerHTML;
          if (newFooter && document.getElementById('CartDrawerFooter')) {
            document.getElementById('CartDrawerFooter').innerHTML = newFooter.innerHTML;
          }
          if (newCount) document.getElementById('CartDrawerCount').textContent = newCount.textContent;
        });
    }
  }
  
  // Inicializar globalmente para poder invocarlo desde los botones de Add to Cart
  window.cartDrawer = new CartDrawer();