// Calculator functionality
function initCalculator() {
    const productTypeSelect = document.getElementById('productType');
    const paperTypeSelect = document.getElementById('paperType');
    const paperWeightSelect = document.getElementById('paperWeight');
    const colorTypeSelect = document.getElementById('colorType');
    const circulationSlider = document.getElementById('circulation');
    const circulationValue = document.getElementById('circulationValue');
    const totalPriceElement = document.getElementById('totalPrice');
    const basePriceElement = document.getElementById('basePrice');
    const optionsPriceElement = document.getElementById('optionsPrice');
    
    // Price configuration
    const priceConfig = {
        basePrices: {
            'visiting-card': 500,
            'flyer': 1200,
            'booklet': 2500,
            'poster': 800,
            'form': 1500,
            'envelope': 600,
            'calendar': 2000,
            'badge': 400
        },
        paperTypeMultipliers: {
            'offset': 1.0,
            'coated': 1.2,
            'design': 1.5
        },
        paperWeightMultipliers: {
            '130': 1.0,
            '170': 1.3,
            '250': 1.7,
            '300': 2.0
        },
        colorTypeMultipliers: {
            '1+0': 1.0,
            '1+1': 1.5,
            '4+0': 2.0,
            '4+4': 2.5
        }
    };
    
    // Initialize circulation slider
    if (circulationSlider && circulationValue) {
        circulationSlider.addEventListener('input', function() {
            circulationValue.textContent = this.value;
            recalculatePrice();
        });
    }
    
    // Add event listeners to all parameter controls
    const parameterControls = [
        productTypeSelect,
        paperTypeSelect,
        paperWeightSelect,
        colorTypeSelect
    ];
    
    parameterControls.forEach(control => {
        if (control) {
            control.addEventListener('change', recalculatePrice);
        }
    });
    
    // Recalculate price function
    function recalculatePrice() {
        if (!totalPriceElement || !basePriceElement || !optionsPriceElement) return;
        
        // Get current values
        const productType = productTypeSelect ? productTypeSelect.value : 'visiting-card';
        const paperType = paperTypeSelect ? paperTypeSelect.value : 'offset';
        const paperWeight = paperWeightSelect ? paperWeightSelect.value : '130';
        const colorType = colorTypeSelect ? colorTypeSelect.value : '1+0';
        const circulation = circulationSlider ? parseInt(circulationSlider.value) : 100;
        
        // Calculate base price
        const basePricePerUnit = priceConfig.basePrices[productType] || 500;
        let basePrice = basePricePerUnit;
        
        // Apply multipliers
        basePrice *= priceConfig.paperTypeMultipliers[paperType] || 1.0;
        basePrice *= priceConfig.paperWeightMultipliers[paperWeight] || 1.0;
        basePrice *= priceConfig.colorTypeMultipliers[colorType] || 1.0;
        
        // Calculate total base price
        const totalBasePrice = basePrice * (circulation / 100);
        
        // Calculate additional options price (simplified)
        const optionsPrice = totalBasePrice * 0.2; // 20% of base price
        
        // Calculate total price
        const totalPrice = totalBasePrice + optionsPrice;
        
        // Update UI
        basePriceElement.textContent = formatPrice(totalBasePrice);
        optionsPriceElement.textContent = formatPrice(optionsPrice);
        totalPriceElement.textContent = formatPrice(totalPrice);
    }
    
    // Format price helper function
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
    }
    
    // Add to cart functionality for calculator
    const addToCartBtn = document.querySelector('.calculator-result .btn-primary');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productType = productTypeSelect ? productTypeSelect.value : 'visiting-card';
            const productName = getProductName(productType);
            
            if (typeof addToCart === 'function') {
                addToCart({
                    id: Date.now(),
                    name: productName,
                    price: parseFloat(totalPriceElement.textContent.replace(/\s|₽/g, '')),
                    params: {
                        productType: productType,
                        paperType: paperTypeSelect ? paperTypeSelect.value : 'offset',
                        paperWeight: paperWeightSelect ? paperWeightSelect.value : '130',
                        colorType: colorTypeSelect ? colorTypeSelect.value : '1+0',
                        circulation: circulationSlider ? parseInt(circulationSlider.value) : 100
                    }
                });
            }
        });
    }
    
    // Helper function to get product name from type
    function getProductName(productType) {
        const names = {
            'visiting-card': 'Визитки',
            'flyer': 'Листовки',
            'booklet': 'Брошюры',
            'poster': 'Плакаты',
            'form': 'Бланки',
            'envelope': 'Конверты',
            'calendar': 'Календари',
            'badge': 'Бейджи'
        };
        return names[productType] || 'Продукция';
    }
    
    // Initial calculation
    recalculatePrice();
}