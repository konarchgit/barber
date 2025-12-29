import React from 'react';

const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* Map Section */}
            <div className="contact-map">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.33!2d73.81!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.1) contrast(1.2)' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            <div className="container contact-container">
                <div className="contact-header-section text-center">
                    <div className="contact-icon-top">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                    </div>
                    <h2 className="contact-title-main">FEEL FREE TO DROP US A LINE</h2>
                    <p className="contact-subtitle">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </p>
                </div>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="contact-form-row">
                        <div className="contact-form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="contact-form-group">
                            <input type="email" placeholder="Your Email" required />
                        </div>
                    </div>

                    <div className="contact-form-row">
                        <div className="contact-form-group">
                            <input type="tel" placeholder="Phone Number" />
                        </div>
                        <div className="contact-form-group">
                            <input type="text" placeholder="Subject" />
                        </div>
                    </div>

                    <div className="contact-form-group full-width">
                        <textarea placeholder="Message" rows="8"></textarea>
                    </div>

                    <div className="contact-submit-wrapper text-center">
                        <button type="submit" className="contact-submit-btn">
                            SUBMIT &nbsp; ✈
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
