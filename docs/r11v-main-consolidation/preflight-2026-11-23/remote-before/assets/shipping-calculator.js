// assets/shipping-calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const shippingForm = document.getElementById('EquiproShippingForm');
    if (!shippingForm) return;
  
    const countrySelect = document.getElementById('ShippingCountry');
    const regionSelect = document.getElementById('ShippingRegion');
    const resultContainer = document.getElementById('ShippingResult');
    const labels = JSON.parse(document.getElementById('ShippingCalculatorLabels')?.textContent || '{}');
  
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
  
      const card = document.createElement('div');
      card.className = 'shipping-calculator__card';
      const heading = document.createElement('h4');
      heading.textContent = labels.estimate;
      const origin = document.createElement('p');
      const originLabel = document.createElement('strong');
      originLabel.textContent = `${labels.origin}: `;
      origin.append(originLabel, document.createTextNode(country === 'CA' ? labels.originCa : labels.originUs));
      const list = document.createElement('ul');
      [[labels.processing, config.processingDays], [labels.transit, transit]].forEach(([label, days]) => {
        const item = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = `${label}: `;
        item.append(strong, document.createTextNode(labels.range.replace('{{ minimum }}', days.min).replace('{{ maximum }}', days.max)));
        list.append(item);
      });
      const total = document.createElement('div');
      total.className = 'shipping-calculator__total';
      const totalLabel = document.createElement('span');
      totalLabel.textContent = `${labels.total}: `;
      const totalValue = document.createElement('strong');
      totalValue.textContent = labels.range.replace('{{ minimum }}', totalMin).replace('{{ maximum }}', totalMax);
      total.append(totalLabel, totalValue);
      card.append(heading, origin, list, total);
      resultContainer.replaceChildren(card);
      resultContainer.style.display = 'block';
    });
  });
