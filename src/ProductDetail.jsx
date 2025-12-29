
import React, { useState, useRef, useEffect, useCallback } from 'react';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if needed
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ProductDetail = ({ onBack, product, addToCart }) => {
    const lightGallery = useRef(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Images array
    const images = product ? [product.image, require('./hero-man.png')] : [
        require('./hero-shave.png'),
        require('./hero-man.png')
    ];
    const [selectedImage, setSelectedImage] = useState(images[0]);


    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    useEffect(() => {
        if (lightGallery.current) {
            lightGallery.current.refresh();
        }
    }, [selectedImage]);


    const categories = [
        { name: 'Hair Styling & Treatments', count: 2 },
        { name: 'Hair Styling Products', count: 2 },
        { name: 'Hair Tools', count: 2 },
        { name: 'Men\'s', count: 2 },
        { name: 'Shampoo & Conditioner', count: 2, active: true },
        { name: 'Uncategorized', count: 4 },
        { name: 'Value & Gift Sets', count: 1 },
    ];

    const recentProducts = [
        { name: 'Shave Knives 8', price: '$32.00', image: require('./hero-shave.png') },
        { name: 'Shave Knives 7', price: '$30.00', oldPrice: '$50.00', image: require('./hero-man.png') },
        { name: 'Shave Knives 3', price: '$39.00', image: require('./amazing-man.png') },
    ];

    return (
        <div className="product-page">
            {/* ... Page Header ... */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">SHAVE KNIVES 2</h1>
                    <div className="breadcrumbs">
                        <span>Home</span> / <span>Shampoo & Conditioner</span> / <span>Shave Knives 2</span>
                    </div>
                </div>
            </div>

            <div className="container product-container">
                <div className="product-main">
                    <div className="product-top">
                        {/* Images */}
                        <div className="product-gallery">
                            <div className="gallery-thumbnails">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Thumb"
                                        className={`thumb ${selectedImage === img ? 'active' : ''} `}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                            <div className="gallery-main">
                                <LightGallery
                                    onInit={onInit}
                                    speed={500}
                                    plugins={[lgThumbnail, lgZoom]}
                                    elementClassNames="custom-lightgallery"
                                >
                                    <a href={selectedImage}>
                                        <img src={selectedImage} alt="Main Product" />
                                        <span className="search-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </span>
                                    </a>
                                    {/* Hidden links for other images so they show up in gallery navigation */}
                                    {images.filter(img => img !== selectedImage).map((img, idx) => (
                                        <a href={img} key={idx} style={{ display: 'none' }}>
                                            <img src={img} alt="Product" />
                                        </a>
                                    ))}
                                </LightGallery>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="product-info">
                            <h2 className="product-title-main">{product?.name || 'SHAVE KNIVES 2'}</h2>
                            <div className="product-price-large">{product?.price || '$49.00'}</div>

                            <div className="product-availability">
                                <strong>Availability: </strong> <span>In Stock & Ready to Ship</span>
                            </div>

                            <div className="product-short-desc">
                                <strong>Quick description</strong>
                                <p>Proin tincidunt, ipsum nec vehicula euismod, neque nibh pretium lorem, at ornare risus sem et risus. Curabitur pulvinar dui viverra libero lobortis in dictum velit luctus. Donec imperdiet tincidunt interdum.</p>
                            </div>

                            <div className="product-actions">
                                <div className="quantity-selector">
                                    <label>QTY:</label>
                                    <div className="qty-controls">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <input type="text" value={quantity.toString().padStart(2, '0')} readOnly />
                                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(product || { id: 2, name: 'SHAVE KNIVES 2', price: '$49.00', image: require('./hero-shave.png') }, quantity)}
                                >
                                    ADD TO CART &nbsp;
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="product-tabs">
                        <div className="tab-headers">
                            <button
                                className={`tab - btn ${activeTab === 'description' ? 'active' : ''} `}
                                onClick={() => setActiveTab('description')}
                            >
                                DESCRIPTION
                            </button>
                            <button
                                className={`tab - btn ${activeTab === 'reviews' ? 'active' : ''} `}
                                onClick={() => setActiveTab('reviews')}
                            >
                                REVIEWS
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra malesuada sagittis. Sed et diam nec ipsum suscipit tincidunt. Sed malesuada quam maximus sem fringilla, et facilisis libero maximus. Donec efficitur lorem eu iaculis lacinia. Sed bibendum sapien leo, quis auctor quam auctor vitae. Donec eu tortor odio. Curabitur dictum justo a enim egestas porttitor.</p>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="reviews-placeholder">There are no reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Reused structure) */}
                <aside className="shop-sidebar">
                    <div className="sidebar-widget">
                        <h3 className="widget-title">BY CATEGORIES</h3>
                        <ul className="category-list">
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <a href="#" className={cat.active ? 'active-cat' : ''}>{cat.name}</a>
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

            </div>
        </div>
    );
};

export default ProductDetail;
