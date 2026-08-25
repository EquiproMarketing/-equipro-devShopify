// assets/shipping-calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const shippingForm = document.getElementById('EquiproShippingForm');
    if (!shippingForm) return;
  
    const countrySelect = document.getElementById('ShippingCountry');
    const regionSelect = document.getElementById('ShippingRegion');
    const resultContainer = document.getElementById('ShippingResult');
  
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
          DEFAULT: { min: 3, max: 6 }
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
  
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const country = countrySelect.value;
      const region = regionSelect.value;
      
      if (!country || !region) return;
  
      const config = transitTimes[country];
      const transit = config.zones[region] || config.zones['DEFAULT'];
  
      const totalMin = config.processingDays.min + transit.min;
      const totalMax = config.processingDays.max + transit.max;
  
      resultContainer.innerHTML = `
        <div class="shipping-calculator__card">
          <h4>Delivery Estimate</h4>
          <p><strong>Fulfillment Origin:</strong> ${config.origin}</p>
          <ul>
            <li><strong>Factory Handling & Processing:</strong> ${config.processingDays.min} - ${config.processingDays.max} business days</li>
            <li><strong>Ground Freight Transit:</strong> ${transit.min} - ${transit.max} business days</li>
          </ul>
          <div class="shipping-calculator__total">
            <span>Total Estimated Time:</span>
            <strong>${totalMin} to ${totalMax} business days</strong>
          </div>
        </div>
      `;
      resultContainer.style.display = 'block';
    });
  });