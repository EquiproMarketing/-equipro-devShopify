/**
 * Equipro Beauty - Dynamic Shipping & Transit Time Calculator
 * Origins: Montreal, QC (Canada) & Isle La Motte, VT (United States)
 */

document.addEventListener('DOMContentLoaded', () => {
    const shippingForm = document.getElementById('EquiproShippingForm');
    if (!shippingForm) return;
  
    const countrySelect = document.getElementById('ShippingCountry');
    const regionSelect = document.getElementById('ShippingRegion');
    const postalInput = document.getElementById('ShippingPostalCode');
    const resultContainer = document.getElementById('ShippingResult');
  
    // Tabla de tiempos de tránsito (días hábiles en carretera)
    const transitTimes = {
      CA: {
        origin: 'Montreal, QC',
        processingDays: { min: 2, max: 4 },
        zones: {
          QC: { min: 1, max: 2 },
          ON: { min: 1, max: 3 },
          NB: { min: 2, max: 4 },
          NS: { min: 2, max: 4 },
          PE: { min: 3, max: 5 },
          NL: { min: 4, max: 7 },
          MB: { min: 3, max: 5 },
          SK: { min: 3, max: 6 },
          AB: { min: 4, max: 6 },
          BC: { min: 5, max: 7 },
          YT: { min: 7, max: 10 },
          NT: { min: 7, max: 10 },
          NU: { min: 8, max: 12 }
        }
      },
      US: {
        origin: 'Isle La Motte, VT',
        processingDays: { min: 2, max: 4 },
        zones: {
          VT: { min: 1, max: 2 },
          NY: { min: 1, max: 2 },
          MA: { min: 1, max: 2 },
          ME: { min: 1, max: 3 },
          NH: { min: 1, max: 2 },
          CT: { min: 1, max: 2 },
          RI: { min: 1, max: 2 },
          NJ: { min: 2, max: 3 },
          PA: { min: 2, max: 3 },
          FL: { min: 3, max: 5 },
          CA: { min: 5, max: 7 },
          TX: { min: 4, max: 6 },
          DEFAULT: { min: 3, max: 6 }
        }
      }
    };
  
    // Escuchar cambio de país para alternar origen y regiones
    countrySelect?.addEventListener('change', (e) => {
      const country = e.target.value;
      updateRegionOptions(country);
    });
  
    // Calcular tiempo de entrega al enviar el formulario
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const country = countrySelect.value;
      const region = regionSelect.value;
      
      if (!country || !region) return;
  
      const config = transitTimes[country];
      const transit = config.zones[region] || config.zones['DEFAULT'] || { min: 3, max: 6 };
  
      // Total = Procesamiento + Tránsito
      const totalMin = config.processingDays.min + transit.min;
      const totalMax = config.processingDays.max + transit.max;
  
      renderResult({
        origin: config.origin,
        processingMin: config.processingDays.min,
        processingMax: config.processingDays.max,
        transitMin: transit.min,
        transitMax: transit.max,
        totalMin,
        totalMax
      });
    });
  
    function renderResult(data) {
      resultContainer.innerHTML = `
        <div class="shipping-calculator__card">
          <h4>Estimación de Entrega</h4>
          <p><strong>Origen de Despacho:</strong> ${data.origin}</p>
          <ul>
            <li><strong>Procesamiento de fábrica:</strong> ${data.processingMin} - ${data.processingMax} días hábiles</li>
            <li><strong>Tránsito terrestre:</strong> ${data.transitMin} - ${data.transitMax} días hábiles</li>
          </ul>
          <div class="shipping-calculator__total">
            <span>Tiempo Total Estimado:</span>
            <strong>${data.totalMin} a ${data.totalMax} días hábiles</strong>
          </div>
        </div>
      `;
      resultContainer.style.display = 'block';
    }
  
    function updateRegionOptions(country) {
      // Lógica para alternar las provincias de CA o estados de US dinámicamente
    }
  });