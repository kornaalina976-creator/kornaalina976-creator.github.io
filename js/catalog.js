// Catalog functionality
function initCatalog() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    
    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Визитки',
            category: 'visiting-cards',
            description: 'Стандартные визитки 90x50мм',
            price: 500,
            popular: true,
            image: 'visiting-card'
        },
        {
            id: 2,
            name: 'Листовки А4',
            category: 'flyers',
            description: 'Листовки формата А4',
            price: 1200,
            popular: true,
            image: 'flyer'
        },
        {
            id: 3,
            name: 'Брошюры А5',
            category: 'booklets',
            description: 'Брошюры с цветной печатью',
            price: 2500,
            popular: false,
            image: 'booklet'
        },
        {
            id: 4,
            name: 'Плакаты А3',
            category: 'posters',
            description: 'Яркие плакаты для мероприятий',
            price: 800,
            popular: true,
            image: 'poster'
        },
        {
            id: 5,
            name: 'Бланки',
            category: 'forms',
            description: 'Фирменные бланки организации',
            price: 1500,
            popular: false,
            image: 'form'
        },
        {
            id: 6,
            name: 'Конверты',
            category: 'envelopes',
            description: 'Конверты разных размеров',
            price: 600,
            popular: false,
            image: 'envelope'
        },
        {
            id: 7,
            name: 'Календари',
            category: 'calendars',
            description: 'Настенные и карманные календари',
            price: 2000,
            popular: true,
            image: 'calendar'
        },
        {
            id: 8,
            name: 'Бейджи',
            category: 'badges',
            description: 'Бейджи для сотрудников',
            price: 400,
            popular: false,
            image: 'badge'
        }
    ];
    
    // Render products
    function renderProducts(productsToRender) {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">Товары не найдены</p>';
            return;
        }
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <i class="fas fa-${getProductIcon(product.image)}"></i>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">от ${formatPrice(product.price)}</span>
                        <button class="btn btn-primary btn-calculate" data-id="${product.id}">
                            Рассчитать
                        </button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to calculate buttons
        document.querySelectorAll('.btn-calculate').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    // Scroll to calculator and pre-select product
                    const calculatorSection = document.getElementById('calculator');
                    if (calculatorSection) {
                        window.scrollTo({
                            top: calculatorSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Set product type in calculator
                        const productTypeSelect = document.getElementById('productType');
                        if (productTypeSelect) {
                            const option = Array.from(productTypeSelect.options).find(
                                opt => opt.value === product.category
                            );
                            if (option) {
                                productTypeSelect.value = product.category;
                                
                                // Trigger change event to recalculate price
                                if (typeof recalculatePrice === 'function') {
                                    recalculatePrice();
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    
    // Filter and sort products
    function filterAndSortProducts() {
        let filteredProducts = [...products];
        
        // Apply search filter
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply category filter
        const category = categoryFilter ? categoryFilter.value : 'all';
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === category
            );
        }
        
        // Apply sorting
        const sortBy = sortSelect ? sortSelect.value : 'popular';
        switch(sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
            default:
                filteredProducts.sort((a, b) => {
                    if (a.popular && !b.popular) return -1;
                    if (!a.popular && b.popular) return 1;
                    return 0;
                });
                break;
        }
        
        renderProducts(filteredProducts);
    }
    
    // Helper functions
    function getProductIcon(imageType) {
        const icons = {
            'visiting-card': 'id-card',
            'flyer': 'file-alt',
            'booklet': 'book',
            'poster': 'image',
            'form': 'file-contract',
            'envelope': 'envelope',
            'calendar': 'calendar',
            'badge': 'id-badge'
        };
        return icons[imageType] || 'box';
    }
    
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortProducts);
    }
    
    // Initial render
    renderProducts(products);
}