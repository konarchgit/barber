
import React, { useState } from 'react';

const Shop = ({ onProductClick, addToCart }) => {
    const categories = [
        { name: 'Hair Styling & Treatments', count: 2 },
        { name: 'Hair Styling Products', count: 2 },
        { name: 'Hair Tools', count: 2 },
        { name: 'Men\'s', count: 2 },
        { name: 'Shampoo & Conditioner', count: 2 },
        { name: 'Uncategorized', count: 4 },
        { name: 'Value & Gift Sets', count: 1 },
    ];

    const recentProducts = [
        { name: 'Shave Knives 8', price: '$32.00', image: require('./hero-shave.png') },
        { name: 'Shave Knives 7', price: '$30.00', oldPrice: '$50.00', image: require('./hero-man.png') },
        { name: 'Shave Knives 6', price: '$29.00', image: require('./amazing-man.png') },
    ];

    const products = [
        { id: 1, name: 'Cosmetic Mockup', price: '$59.00', image: require('./hero-shave.png') },
        { id: 2, name: 'Shave Knives 2', price: '$49.00', image: require('./hero-man.png') },
        { id: 3, name: 'Shave Knives 3', price: '$39.00', image: require('./hero-haircut.png') },
        { id: 4, name: 'Shave Knives 4', price: '$29.00', image: require('./amazing-man.png') },
        { id: 5, name: 'Shave Knives 5', price: '$19.00', image: require('./hero-shave.png') },
        { id: 6, name: 'Shave Knives 6', price: '$99.00', image: require('./hero-man.png') },
    ];

    const [viewMode, setViewMode] = useState('grid'); // grid or list

    return (
        <div className="shop-page">
            <div className="container shop-container">

                {/* Sidebar */}
                <aside className="shop-sidebar">
                    <div className="sidebar-widget">
                        <h3 className="widget-title">BY CATEGORIES</h3>
                        <ul className="category-list">
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <a href="#">{cat.name}</a>
                                    <span className="count">({cat.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-widget">
                        <h3 className="widget-title">RECENT PRODUCTS</h3>
                        <ul className="recent-list">
                            {recentProducts.map((prod, index) => (
                                <li key={index} className="recent-item">
                                    <div className="recent-img">
                                        <img src={prod.image} alt={prod.name} />
                                    </div>
                                    <div className="recent-info">
                                        <a href="#" className="recent-name">{prod.name}</a>
                                        <div className="recent-price">
                                            {prod.oldPrice && <span className="old-price">{prod.oldPrice}</span>}
                                            <span className="current-price">{prod.price}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="shop-content">
                    <div className="shop-toolbar">
                        <div className="toolbar-left">
                            <span className="category-title-mobile-only">Shop</span>
                            {/* Could add breadcrumbs here */}
                        </div>
                        <div className="toolbar-right">
                            <div className="view-toggle">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    &#8862;
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    &#9776;
                                </button>
                            </div>
                            <select className="shop-select">
                                <option>Sort by: Default sorting</option>
                                <option>Sort by: Price low to high</option>
                                <option>Sort by: Price high to low</option>
                            </select>
                            <div className="show-count">
                                <span>Show</span>
                                <select className="shop-select" style={{ width: 'auto', marginLeft: '5px' }}>
                                    <option>8</option>
                                    <option>12</option>
                                    <option>24</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={`shop-products ${viewMode}`}>
                        {products.map(product => (
                            <div key={product.id} className="shop-card" onClick={() => onProductClick(product)}>
                                <div className="shop-card-img">
                                    <img src={product.image} alt={product.name} />
                                    <div className="shop-card-actions">
                                        <button
                                            className="add-to-cart-quick"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                        >
                                            🛒
                                        </button>
                                    </div>
                                </div>
                                <div className="shop-card-body">
                                    <h3 className="shop-card-title">{product.name}</h3>
                                    <div className="shop-card-price">{product.price}</div>
                                    <div className="shop-card-rating">★★★★★</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="shop-pagination">
                        <button className="active">1</button>
                        <button>2</button>
                        <button>&rarr;</button>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Shop;
