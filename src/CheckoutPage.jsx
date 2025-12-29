import React from 'react';

const CheckoutPage = ({ cartItems }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
    const total = subtotal; // Can add shipping logic later

    return (
        <div className="checkout-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">CHECKOUT</h1>
                    <div className="breadcrumbs">
                        <span>Home</span> / <span>Checkout</span>
                    </div>
                </div>
            </div>

            <div className="container checkout-container">
                <div className="checkout-login-notice">
                    Have a coupon? <a href="#">Click here to enter your code</a>
                </div>

                <form className="checkout-form">
                    <div className="billing-details">
                        <h2 className="checkout-section-title">BILLING DETAILS</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>First name <span className="required">*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Last name <span className="required">*</span></label>
                                <input type="text" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Company name (optional)</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label>Country / Region <span className="required">*</span></label>
                            <select required>
                                <option value="">Select a country / region...</option>
                                <option value="US">United States (US)</option>
                                <option value="UK">United Kingdom (UK)</option>
                                <option value="IN">India</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Street address <span className="required">*</span></label>
                            <input type="text" placeholder="House number and street name" required />
                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" style={{ marginTop: '10px' }} />
                        </div>

                        <div className="form-group">
                            <label>Town / City <span className="required">*</span></label>
                            <input type="text" required />
                        </div>

                        <div className="form-group">
                            <label>State / County <span className="required">*</span></label>
                            <input type="text" required />
                        </div>

                        <div className="form-group">
                            <label>Postcode / ZIP <span className="required">*</span></label>
                            <input type="text" required />
                        </div>

                        <div className="form-group">
                            <label>Phone <span className="required">*</span></label>
                            <input type="tel" required />
                        </div>

                        <div className="form-group">
                            <label>Email address <span className="required">*</span></label>
                            <input type="email" required />
                        </div>

                        <div className="form-group extra-notes">
                            <h2 className="checkout-section-title">ADDITIONAL INFORMATION</h2>
                            <label>Order notes (optional)</label>
                            <textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        </div>
                    </div>

                    <div className="order-review">
                        <h2 className="checkout-section-title">YOUR ORDER</h2>
                        <div className="order-summary-box">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>PRODUCT</th>
                                        <th>SUBTOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name} × {item.quantity}</td>
                                            <td>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>${subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td><strong>${total.toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="payment-methods">
                                <div className="payment-option">
                                    <input type="radio" name="payment" id="bank" defaultChecked />
                                    <label htmlFor="bank">Direct bank transfer</label>
                                    <div className="payment-desc">
                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                    </div>
                                </div>
                                <div className="payment-option">
                                    <input type="radio" name="payment" id="cod" />
                                    <label htmlFor="cod">Cash on delivery</label>
                                </div>
                                <div className="payment-option">
                                    <input type="radio" name="payment" id="paypal" />
                                    <label htmlFor="paypal">PayPal <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="PayPal" style={{ height: '18px', marginLeft: '10px' }} /></label>
                                </div>
                            </div>

                            <div className="place-order-wrapper">
                                <p className="policy-text">
                                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
                                </p>
                                <button type="submit" className="place-order-btn" onClick={(e) => { e.preventDefault(); alert('Order Placed! Thank you.'); }}>
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
