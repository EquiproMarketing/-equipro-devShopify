function calculateCATransit() {
    const input = document.getElementById('ca-postal-code').value.trim().toUpperCase();
    const resultDiv = document.getElementById('ca-result');
    
    if (!input) {
      showResult(resultDiv, 'Please enter a valid postal code or province code.', true);
      return;
    }
  
    // Lógica de estimación para Canadá (Origen: Montreal, QC)
    let days = '3-5 business days';
    const firstChar = input.charAt(0);
    
    if (firstChar === 'H' || firstChar === 'J' || input.includes('QC') || input.includes('QUEBEC')) {
      days = '1-2 business days'; // Quebec local
    } else if (firstChar === 'K' || firstChar === 'L' || firstChar === 'M' || firstChar === 'N' || input.includes('ON')) {
      days = '2-3 business days'; // Ontario
    } else if (['B', 'C', 'E', 'G'].includes(firstChar)) {
      days = '3-4 business days'; // Maritimes
    } else if (['R', 'S', 'T', 'V'].includes(firstChar)) {
      days = '4-6 business days'; // Western Canada
    }
  
    showResult(resultDiv, `Estimated transit time from Montreal: <strong>${days}</strong>`, false);
  }
  
  function calculateUSTransit() {
    const state = document.getElementById('us-state-code').value.trim().toUpperCase();
    const resultDiv = document.getElementById('us-result');
  
    if (!state || state.length !== 2) {
      showResult(resultDiv, 'Please enter a valid 2-letter US state code (e.g., NY, FL).', true);
      return;
    }
  
    // Lógica de estimación para EE.UU. (Origen: Isle La Motte, VT)
    let days = '3-5 business days';
    const zoneNortheast = ['VT', 'NY', 'MA', 'NH', 'ME', 'CT', 'RI', 'NJ', 'PA'];
    const zoneSoutheastMidwest = ['FL', 'GA', 'NC', 'SC', 'VA', 'OH', 'MI', 'IN', 'IL'];
    
    if (zoneNortheast.includes(state)) {
      days = '1-3 business days';
    } else if (zoneSoutheastMidwest.includes(state)) {
      days = '3-4 business days';
    } else {
      days = '4-6 business days'; // West Coast / Central
    }
  
    showResult(resultDiv, `Estimated transit time from Vermont: <strong>${days}</strong>`, false);
  }
  
  function showResult(element, message, isError) {
    element.innerHTML = message;
    element.className = 'shipping-result active' + (isError ? ' error' : '');
  }