import React, { useState } from 'react';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, onBackToShop }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

    return (
        <div className="cart-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">CART</h1>
                    <div className="breadcrumbs">
                        <span>Home</span> / <span>Cart</span>
                    </div>
                </div>
            </div>

            <div className="container cart-container">
                {cartItems.length === 0 ? (
                    <div className="empty-cart-message">
                        <p>Your cart is currently empty.</p>
                        <button className="return-shop-btn" onClick={onBackToShop}>Return to Shop</button>
                    </div>
                ) : (
                    <>
                        <div className="cart-notice">
                            "{cartItems[cartItems.length - 1].name}" has been added to your cart.
                        </div>

                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th className="product-remove">&nbsp;</th>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">PRODUCT</th>
                                    <th className="product-price">PRICE</th>
                                    <th className="product-quantity">QUANTITY</th>
                                    <th className="product-subtotal">SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="product-remove">
                                            <button onClick={() => onRemoveItem(item.id)}>×</button>
                                        </td>
                                        <td className="product-thumbnail">
                                            <img src={item.image} alt={item.name} />
                                        </td>
                                        <td className="product-name">
                                            {item.name}
                                        </td>
                                        <td className="product-price">
                                            {item.price}
                                        </td>
                                        <td className="product-quantity">
                                            <div className="qty-controls small">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </td>
                                        <td className="product-subtotal">
                                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="cart-actions">
                            <div className="coupon-code">
                                <input type="text" placeholder="Coupon code" />
                                <button className="apply-coupon-btn">APPLY COUPON</button>
                            </div>
                            <button className="update-cart-btn" disabled>UPDATE CART</button>
                        </div>

                        <div className="cart-collaterals">
                            <div className="cart-totals">
                                <h2>CART TOTALS</h2>
                                <table className="totals-table">
                                    <tbody>
                                        <tr className="cart-subtotal">
                                            <th>Subtotal</th>
                                            <td>${subtotal.toFixed(2)}</td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Total</th>
                                            <td><strong>${subtotal.toFixed(2)}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="checkout-btn-wrapper">
                                    <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
