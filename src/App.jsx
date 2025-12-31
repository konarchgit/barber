import { useState, useEffect } from 'react';
import './App.css';
import Shop from './Shop';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import ContactPage from './ContactPage';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';

// Slide Data
const slides = [
  {
    id: 1,
    image: require('./hero-man.png'),
    subtitle: 'Keep Your',
    title: <>Perfect <br /> Look</>,
    description: 'Experience the art of grooming in a premium atmosphere where tradition meets modern style.',
  },
  {
    id: 2,
    image: require('./hero-haircut.png'),
    subtitle: 'Precision',
    title: <>Classic <br /> Cuts</>,
    description: 'Our master barbers specialize in precision scissor cuts and classic styles tailored just for you.',
  },
  {
    id: 3,
    image: require('./hero-shave.png'),
    subtitle: 'Relaxation',
    title: <>Luxury <br /> Shaves</>,
    description: 'Indulge in a traditional hot towel straight razor shave. The ultimate gentlemen\'s treat.',
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [artistIndex, setArtistIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };


  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);


  // Artist Data
  const artists = [
    { name: 'MARK JOHNSON', image: require('./amazing-man.png') },
    { name: 'MARTIN COLLINS', image: require('./hero-man.png') },
    { name: 'JOHN DOE', image: require('./hero-haircut.png') },
    { name: 'DAVID SMITH', image: require('./hero-shave.png') }, // Extra for carousel demo
  ];

  /* 
     Carousel Logic:
     On desktop, we show 3 items. Scrolling moves by 1 item.
     Logic: The track moves -300px (width of card + gap) * index.
     Or percentages.
     To keep it simple responsive:
     We can just shift the 'start' index of the slice?
     No, the smooth transition is requested "image carousal".
     Let's use the transform approach.
  */
  const nextArtist = () => {
    // Loop
    setArtistIndex((prev) => (prev + 1) % artists.length);
  };

  const prevArtist = () => {
    setArtistIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /* Appointment Wizard State */
  const [appointStep, setAppointStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState('any');

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleExtra = (extra) => {
    if (selectedExtra.includes(extra)) {
      setSelectedExtra(selectedExtra.filter(e => e !== extra));
    } else {
      setSelectedExtra([...selectedExtra, extra]);
    }
  };

  // Mock Data
  const servicesList = [
    { name: 'Manicure', price: 15, time: '' },
    { name: 'Beard Trim', price: 15, time: '' },
    { name: 'Haircut', price: 10, time: '01:00' },
  ];
  const extrasList = [
    { name: 'Shampoo', price: 29, time: '01:00' },
    { name: 'Face Mask', price: 40, time: '00:30' },
  ];
  const assistantsList = [
    { id: 'any', name: 'Choose an assistant for me', avatar: '' },
    { id: 'mark', name: 'Mark JOHNSON', avatar: '' },
    { id: 'mario', name: 'Mario Puzzo', avatar: '' },
    { id: 'pablo', name: 'Pablo Gusto', avatar: '' },
  ];

  const calculateTotal = () => {
    let total = 0;
    // Simple mock calculation
    selectedServices.forEach(s => {
      const item = servicesList.find(i => i.name === s);
      if (item) total += item.price;
    });
    selectedExtra.forEach(s => {
      const item = extrasList.find(i => i.name === s);
      if (item) total += item.price;
    });
    return total;
  };

  const renderWizardStep = () => {
    if (appointStep === 1) {
      return (
        <div className="wizard-step">
          <h4 className="wizard-question">What do you need?</h4>
          <div className="wizard-options">
            {servicesList.map((item) => (
              <div
                key={item.name}
                className={`wizard-option ${selectedServices.includes(item.name) ? 'selected' : ''}`}
                onClick={() => toggleService(item.name)}
              >
                <div className="opt-info">
                  <span className="opt-name">{item.name}</span>
                  <span className="opt-meta">{item.price}$ {item.time && <span className="opt-time">{item.time}</span>}</span>
                </div>
                <div className="opt-check">{selectedServices.includes(item.name) && '✔'}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (appointStep === 2) {
      return (
        <div className="wizard-step">
          <h4 className="wizard-question">Something more?</h4>
          <div className="wizard-options">
            {extrasList.map((item) => (
              <div
                key={item.name}
                className={`wizard-option ${selectedExtra.includes(item.name) ? 'selected' : ''}`}
                onClick={() => toggleExtra(item.name)}
              >
                <div className="opt-info">
                  <span className="opt-name">{item.name}</span>
                  <span className="opt-meta">{item.price}$ {item.time && <span className="opt-time">{item.time}</span>}</span>
                </div>
                <div className="opt-check">{selectedExtra.includes(item.name) && '✔'}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (appointStep === 3) {
      return (
        <div className="wizard-step">
          <h4 className="wizard-question">Select your assistant</h4>
          <div className="wizard-options">
            {assistantsList.map((item) => (
              <div
                key={item.id}
                className={`wizard-option ${selectedAssistant === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedAssistant(item.id)}
              >
                <div className="opt-info">
                  <span className="opt-name">{item.name}</span>
                  <span className="opt-role">{item.id === 'any' ? '' : 'Barber'}</span>
                </div>
                <div className="opt-radio">
                  <div className={`radio-circle ${selectedAssistant === item.id ? 'active' : ''}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Final Step Mock
    return <div className="wizard-step text-center"><h3 style={{ color: '#fff' }}>Processing...</h3></div>;
  };

  return (
    <div className="App">

      <nav className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo">
            <img src={require('./barber-logo.png')} alt="Barber Salon" className="logo-img" />
          </a>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav-item">
              <a href="#" className={page === 'home' ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); setPage('home') }}>Home</a>
              <span className="nav-arrow">∨</span>
            </div>
            <div className={`nav-item has-submenu ${activeSubmenu === 'portfolio' ? 'submenu-active' : ''}`}>
              <a href="#" onClick={(e) => { if (window.innerWidth <= 900) { e.preventDefault(); toggleSubmenu('portfolio'); } }}>Portfolio</a>
              <span className="nav-arrow">∨</span>
              <ul className="submenu">
                <li><a href="#">Portfolio Masonry</a></li>
                <li><a href="#">Portfolio Grid</a></li>
                <li><a href="#">Portfolio 4 Columns</a></li>
                <li><a href="#">Portfolio packery 1</a></li>
                <li><a href="#">Portfolio packery 2</a></li>
                <li><a href="#">Single Slide Infomation</a></li>
                <li><a href="#">Single Wide</a></li>
                <li><a href="#">Single Silder</a></li>
              </ul>
            </div>
            <div className="nav-item">
              <a href="#" className={page === 'blog' ? 'active-link' : ''} onClick={(e) => { e.preventDefault(); setPage('blog') }}>Blog</a>
              <span className="nav-arrow">∨</span>
            </div>
            <div className={`nav-item has-submenu mega-menu-parent ${activeSubmenu === 'shop' ? 'submenu-active' : ''}`}>
              <a href="#" className={page === 'shop' ? 'active-link' : ''} onClick={(e) => {
                if (window.innerWidth <= 900) {
                  e.preventDefault();
                  toggleSubmenu('shop');
                } else {
                  e.preventDefault();
                  setPage('shop');
                }
              }}>Shop</a>
              <span className="nav-arrow">∨</span>
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>CATEGORY PAGE</h4>
                  <ul>
                    <li><a href="#">Men's</a></li>
                    <li><a href="#">Hair Tools</a></li>
                    <li><a href="#">Hair Styling Products</a></li>
                    <li><a href="#">Hair & Treatments</a></li>
                    <li><a href="#">Shampoo & Conditioner</a></li>
                  </ul>
                </div>
                <div className="mega-column">
                  <h4>SINGLE PRODUCT</h4>
                  <ul>
                    <li><a href="#">Single Product</a></li>
                    <li><a href="#">Cart</a></li>
                    <li><a href="#">Checkout</a></li>
                    <li><a href="#">Wishlist</a></li>
                  </ul>
                </div>
                <div className="mega-column">
                  <h4>BEST SELLING</h4>

                  <div className="mega-product">
                    <img src={require('./hero-shave.png')} alt="Product" />
                    <div className="mega-product-info">
                      <span className="name">Shave Knives 8</span>
                      <span className="price">$32.00</span>
                    </div>
                  </div>

                  <div className="mega-product">
                    <img src={require('./hero-man.png')} alt="Product" />
                    <div className="mega-product-info">
                      <span className="name">Shave Knives 7</span>
                      <span className="price">$30.00</span>
                    </div>
                  </div>

                  <div className="mega-product">
                    <img src={require('./amazing-man.png')} alt="Product" />
                    <div className="mega-product-info">
                      <span className="name">Shave Knives 6</span>
                      <span className="price">$29.00</span>
                    </div>
                  </div>
                </div>

                <div className="mega-column">
                  <h4>TEXT BLOCK</h4>
                  <div className="mega-text-block">
                    <img src={require('./hero-man.png')} style={{ width: '100%', marginBottom: '0.5rem', opacity: 0.7 }} alt="Ad" />
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`nav-item has-submenu ${activeSubmenu === 'pages' ? 'submenu-active' : ''}`}>
              <a href="#" className={page === 'contact' ? 'active-link' : ''} onClick={(e) => {
                if (window.innerWidth <= 900) {
                  e.preventDefault();
                  toggleSubmenu('pages');
                }
              }}>Pages</a>
              <span className="nav-arrow">∨</span>
              <ul className="submenu">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('contact') }}>Contact Us</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div className="nav-item">
              <a href="#">Shortcode</a>
              <span className="nav-arrow">∨</span>
            </div>
          </div>

          <div className="nav-actions">
            <div className="nav-icons">
              <div className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="nav-icon cart-icon-wrapper" onClick={() => setPage('cart')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>

                <div className="mini-cart-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="mini-cart-header">
                    You have {cart.reduce((acc, item) => acc + item.quantity, 0)} item(s) in your cart
                  </div>
                  <div className="mini-cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="mini-cart-item">
                        <img src={item.image} alt={item.name} className="mini-cart-img" />
                        <div className="mini-cart-info">
                          <h4>{item.name}</h4>
                          <div className="mini-cart-price">{item.quantity} × {item.price}</div>
                        </div>
                        <button className="mini-cart-remove" onClick={() => removeFromCart(item.id)}>×</button>
                      </div>
                    ))}
                  </div>
                  {cart.length > 0 && (
                    <>
                      <div className="mini-cart-total">
                        <span>SUBTOTAL:</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="mini-cart-actions">
                        <button className="mini-cart-btn view-cart-btn" onClick={() => setPage('cart')}>VIEW CART</button>
                        <button className="mini-cart-btn checkout-btn-mini" onClick={() => setPage('checkout')}>CHECKOUT</button>
                      </div>
                    </>
                  )}
                  {cart.length === 0 && (
                    <div className="empty-mini-cart">Your cart is empty</div>
                  )}
                </div>
              </div>
              <div className="nav-icon desktop-only-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </nav>

      {page === 'home' && (<>
        <header id="home" className="hero">
          <div className="hero-slider-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="hero-image-wrapper">
                  <img src={slide.image} alt={slide.subtitle} className="hero-image" />
                </div>
                <div className="hero-content">
                  <span className="hero-subtitle">{slide.subtitle}</span>
                  <h1>{slide.title}</h1>
                  <p className="hero-description">
                    {slide.description}
                  </p>
                  <div className="separator"></div>
                  <div>
                    <a href="#book" className="btn">Book Now</a>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls */}
            <div className="slider-controls">
              <button className="slider-btn" onClick={prevSlide}>&larr;</button>
              <button className="slider-btn" onClick={nextSlide}>&rarr;</button>
            </div>

            <div className="slider-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </header>

        <section className="section-passion">
          <div className="container">
            <span className="passion-subtitle">AMAZING THINGS COME FROM</span>
            <h2 className="passion-title">PASSION</h2>

            <div className="passion-text">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.
              </p>
              <div className="passion-signature">Alexandra Hamilton</div>
            </div>
          </div>
        </section>

        <section className="section-amazing">
          <div className="amazing-left"></div>
          <div className="amazing-right">
            <div className="amazing-watermark">BARBER</div>
            <div className="amazing-content-wrapper">
              <div className="amazing-icon-top">
                {/* Scissors and Comb icon or similar decorative icon from reference */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
              </div>
              <h2 className="amazing-title">AMAZING SERVICES</h2>
              <p className="amazing-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s.
              </p>

              <div className="amazing-grid">
                {/* Item 1 */}
                <div className="amazing-item">
                  <div className="amazing-item-icon">
                    {/* Scissors */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
                  </div>
                  <div className="amazing-item-content">
                    <h3>CLASSIC HAIRCUT</h3>
                    <span className="amazing-item-price">$25</span>
                    <p className="amazing-item-text">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="amazing-item">
                  <div className="amazing-item-icon">
                    {/* Razor / Shaver */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21v-8a2 2 0 0 1-2-2.5V10c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9a2 2 0 1 0-4 0v1a2 2 0 1 1-4 0V9a6 6 0 1 1 12 0v5a2 2 0 0 1-4 0v-.5a2 2 0 0 0-4 0V21"></path></svg>
                  </div>
                  <div className="amazing-item-content">
                    <h3>STRAIGHT RAZOR SHAVER</h3>
                    <span className="amazing-item-price">$15</span>
                    <p className="amazing-item-text">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="amazing-item">
                  <div className="amazing-item-icon">
                    {/* Beard Trim - Razor */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  </div>
                  <div className="amazing-item-content">
                    <h3>BEARD TRIM ADD- ON</h3>
                    <span className="amazing-item-price">$25</span>
                    <p className="amazing-item-text">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="amazing-item">
                  <div className="amazing-item-icon">
                    {/* Crossed Tools */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path></svg>
                  </div>
                  <div className="amazing-item-content">
                    <h3>HAIRCUT & SHAVE</h3>
                    <span className="amazing-item-price">$35</span>
                    <p className="amazing-item-text">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Works Section */}
        <section className="section-works">
          <div className="works-content">
            <div className="works-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4a158' }}>
                <path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path>
              </svg>
            </div>
            <h2 className="works-title">OUR WORKS</h2>
            <p className="works-desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
            </p>

            <div className="works-filter">
              <span className="filter-item active">ALL</span>
              <span className="filter-separator">|</span>
              <span className="filter-item">HAIRSTYLING</span>
              <span className="filter-separator">|</span>
              <span className="filter-item">SHAVES</span>
            </div>
          </div>

          <div className="works-gallery">
            {/* Using existing images as placeholders since quota is full */}
            <div className="work-item">
              <img src={require('./hero-haircut.png')} alt="Work 1" />
              <div className="work-overlay"></div>
            </div>
            <div className="work-item">
              <img src={require('./hero-shave.png')} alt="Work 2" />
              <div className="work-overlay"></div>
            </div>
            <div className="work-item">
              <img src={require('./hero-man.png')} alt="Work 3" />
              <div className="work-overlay"></div>
            </div>
            <div className="work-item">
              <img src={require('./amazing-man.png')} alt="Work 4" />
              <div className="work-overlay"></div>
            </div>
          </div>
        </section>

        {/* Meet Our Artists */}
        <section className="section-artists">
          <div className="container text-center">
            <h2 className="artists-title">MEET OUR ARTISTS</h2>
            <p className="artists-desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
            </p>

            {/* Carousel Wrapper */}
            <div className="artists-carousel-wrapper">
              <button className="carousel-btn prev" onClick={prevArtist}>&larr;</button>

              <div className="artists-carousel-track-container">
                <div
                  className="artists-carousel-track"
                  style={{ transform: `translateX(calc(-${artistIndex} * (320px + 2rem)))` }}
                >
                  {/* We group artists into 'slides' of 3 for desktop, or handle strictly by CSS. 
                      For simplicity, let's treat the Track as a flex container and move it. 
                      However, moving by percentage implies all items are same width. 
                      A simpler approach for "3 items visible" without complex Math is 
                      pagination of pages.
                      Let's try a simpler layout: 
                      Just 1 active view? No, we need 3.
                      Let's stick to the grid but make it "scrollable" or "swappable"?
                      Actually, let's implement a 'slide' based carousel where we map the data.
                  */}
                  {artists.map((artist, idx) => (
                    <div className="artist-card" key={idx}>
                      <div className="artist-image">
                        <img src={artist.image} alt={artist.name} />
                      </div>
                      <div className="artist-brush-info">
                        <span className="artist-role">BARBER</span>
                        <h3 className="artist-name">{artist.name}</h3>
                        <a href="#book" className="artist-book">Book now</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="carousel-btn next" onClick={nextArtist}>&rarr;</button>
            </div>

            {/* Mobile Dots or Indication */}
            <div className="carousel-dots">
              {artists.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === artistIndex ? 'active' : ''}`}
                  onClick={() => setArtistIndex(idx)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section-pricing">
          <div className="pricing-overlay"></div>
          <div className="container pricing-container">
            <div className="works-icon text-center">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4a158' }}>
                <path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path>
              </svg>
            </div>
            <h2 className="works-title text-center">OUR PRICING</h2>
            <p className="works-desc text-center" style={{ maxWidth: '700px', margin: '0 auto 4rem' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div className="pricing-grid">
              {/* Header Row */}
              <div className="pricing-col-labels">
                <h3 className="package-label-title">PACKAGE <br /> <span style={{ color: '#fff' }}>PRICES</span></h3>
              </div>
              <div className="pricing-col-header">
                <div className="pricing-header-box">STANDARD</div>
                <div className="pricing-price-box">$ 69.99</div>
              </div>
              <div className="pricing-col-header featured">
                <div className="pricing-header-box gold-bg">DIAMOND</div>
                <div className="pricing-price-box gold-light-bg">$ 169.99</div>
              </div>
              <div className="pricing-col-header">
                <div className="pricing-header-box">GOLD</div>
                <div className="pricing-price-box">$ 99.99</div>
              </div>

              {/* Rows */}
              {/* Row 1 */}
              <div className="pricing-row-label">Haircut & Blowdry</div>
              <div className="pricing-cell"><span className="check">✔</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="check">✔</span></div>

              {/* Row 2 */}
              <div className="pricing-row-label">Sleek and Shiny</div>
              <div className="pricing-cell"><span className="check">✔</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="check">✔</span></div>

              {/* Row 3 */}
              <div className="pricing-row-label">Shampoo & Set with Haircut</div>
              <div className="pricing-cell"><span className="cross">✖</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="check">✔</span></div>

              {/* Row 4 */}
              <div className="pricing-row-label">Hair Treatment</div>
              <div className="pricing-cell"><span className="cross">✖</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="check">✔</span></div>

              {/* Row 5 */}
              <div className="pricing-row-label">Face Mask</div>
              <div className="pricing-cell"><span className="cross">✖</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="cross">✖</span></div>

              {/* Row 6 */}
              <div className="pricing-row-label">Dimensional Color with Haircut</div>
              <div className="pricing-cell"><span className="cross">✖</span></div>
              <div className="pricing-cell featured-cell"><span className="check">✔</span></div>
              <div className="pricing-cell"><span className="cross">✖</span></div>
            </div>
          </div>
        </section>

        {/* Opening Hours CTA */}
        <section className="section-opening-cta">
          <div className="container opening-container">
            <div className="opening-text">
              <span className="opening-label">OUR OPENING HOURS :</span>
              <span className="opening-time">Mon - Sun: 9:00 - 19:00</span>
            </div>
            <a href="#book" className="btn-appointment">MAKE AN APPOINTMENT NOW</a>
          </div>
        </section>

        {/* From Our Shop */}
        <section className="section-shop">
          <div className="container text-center">
            <div className="works-icon" style={{ margin: '0 auto 1rem', display: 'inline-block' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4a158' }}>
                <path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path>
              </svg>
            </div>
            <h2 className="works-title" style={{ color: '#000' }}>FROM OUR SHOP</h2>
            <p className="works-desc" style={{ color: '#555', maxWidth: '700px', margin: '0 auto 3rem' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div className="shop-carousel-container">
              <button className="shop-nav-btn prev">&larr;</button>
              <div className="shop-grid">
                {/* Product 1 */}
                <div className="shop-card">
                  <div className="shop-img-box">
                    <img src={require('./hero-shave.png')} alt="Product 1" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                  </div>
                  <h3 className="shop-product-title">SHAVE KNIVES 8</h3>
                  <div className="shop-price">
                    <span className="old-price">$34,134.00</span>
                    <span className="new-price">$32.00</span>
                  </div>
                  <div className="shop-rating">★★★★★</div>
                </div>

                {/* Product 2 */}
                <div className="shop-card">
                  <div className="shop-img-box">
                    <img src={require('./hero-man.png')} alt="Product 2" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                  </div>
                  <h3 className="shop-product-title">SHAVE KNIVES 7</h3>
                  <div className="shop-price">
                    <span className="old-price">$50.00</span>
                    <span className="new-price">$30.00</span>
                  </div>
                  <div className="shop-rating">★★★★★</div>
                </div>

                {/* Product 3 */}
                <div className="shop-card">
                  <div className="shop-img-box">
                    <img src={require('./amazing-man.png')} alt="Product 3" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                  </div>
                  <h3 className="shop-product-title">SHAVE KNIVES 6</h3>
                  <div className="shop-price">
                    <span className="new-price">$29.00</span>
                  </div>
                  <div className="shop-rating">★★★★★</div>
                </div>

                {/* Product 4 */}
                <div className="shop-card">
                  <div className="shop-img-box">
                    <img src={require('./hero-haircut.png')} alt="Product 4" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                  </div>
                  <h3 className="shop-product-title">SHAVE KNIVES 5</h3>
                  <div className="shop-price">
                    <span className="new-price">$49.00</span>
                  </div>
                  <div className="shop-rating">★★★★★</div>
                </div>
              </div>
              <button className="shop-nav-btn next">&rarr;</button>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <a href="#shop" className="btn-visit-shop">VISIT OUR SHOP ONLINE &rarr;</a>
            </div>
          </div>
        </section>

        {/* Appointment Wizard Section */}
        <section className="section-appointment" id="appointment">
          {/* Left Side: Testimonial/Hero */}
          <div className="appoint-left">
            <div className="appoint-overlay"></div>
            <div className="appoint-content-left text-center">
              <p className="appoint-sub">WHAT CLIENTS SAY ABOUT US</p>
              <h2 className="appoint-title">QUALITY SERVICES AND <br /> BEST REPAIR</h2>
              <p className="appoint-testimonial">
                "Vestibulum varius, velit sit amet tempor efficitur, ligula mi lacinia libero, vehicula dui nisi eget purus. Integer cursus nibh non risus maximus dictum. Suspendisse potenti."
              </p>
              <p className="appoint-author">JONT NICOLIN KOOK</p>
              <div className="testimonial-dots">
                <span></span><span className="active"></span><span></span>
              </div>
            </div>
          </div>

          {/* Right Side: Wizard */}
          <div className="appoint-right">
            <div className="wizard-container">
              <div className="wizard-header text-center">
                <div className="works-icon" style={{ margin: '0 auto 1rem', display: 'inline-block' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4a158' }}>
                    <path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path>
                  </svg>
                </div>
                <h2 className="wizard-title">APPOINTMENT</h2>
                <p className="wizard-desc">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <div className="wizard-login-link">
                  <a href="#login" style={{ color: 'var(--color-primary)' }}>👤 Log in</a>
                </div>
              </div>

              <div className="wizard-progress-area">
                <span className="step-count">Step {appointStep}/7</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${(appointStep / 7) * 100}%` }}></div>
                </div>
              </div>

              <div className="wizard-body">
                {renderWizardStep()}
              </div>

              <div className="wizard-footer">
                {appointStep > 1 && (
                  <button className="btn-wizard-back" onClick={() => setAppointStep(prev => prev - 1)}>Back</button>
                )}
                <div style={{ flex: 1 }}></div>
                <div className="wizard-subtotal-area">
                  <span className="subtotal-label">Subtotal</span>
                  <span className="subtotal-amount">{calculateTotal()} $</span>
                </div>
                <button className="btn-wizard-next" onClick={() => setAppointStep(prev => Math.min(prev + 1, 7))}>
                  Next step &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Blog Section */}
        <section className="section-blog">
          <div className="container text-center">
            <div className="works-icon" style={{ margin: '0 auto 1rem', display: 'inline-block' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4a158' }}>
                <path d="M14.5 10l-2.5-2.5"></path><path d="M7 22l9-8"></path><path d="M11 22L8 15"></path><path d="M5 5l2 2"></path><path d="M14.5 10L12 12"></path>
              </svg>
            </div>
            <h2 className="works-title" style={{ color: '#000' }}>OUR BLOG</h2>
            <p className="works-desc" style={{ color: '#555', maxWidth: '700px', margin: '0 auto 4rem' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div className="blog-grid">
              {/* Article 1 */}
              <div className="blog-item" onClick={() => {
                setSelectedBlogPost({
                  id: 1,
                  title: 'Fusce nec ex tellus',
                  date: '21',
                  month: 'MAR',
                  author: 'Ad-min',
                  image: require('./hero-haircut.png')
                });
                setPage('blog-detail');
              }}>
                <div className="blog-img">
                  <img src={require('./hero-haircut.png')} alt="Blog 1" />
                  <div className="blog-overlay">
                    <span className="blog-icon">🔗</span>
                  </div>
                </div>
                <div className="blog-meta">POSTED 21 MARCH 2023 BY AD-MIN</div>
                <h3 className="blog-title">Fusce nec ex tellus</h3>
              </div>

              {/* Article 2 */}
              <div className="blog-item" onClick={() => {
                setSelectedBlogPost({
                  id: 2,
                  title: 'Ut quis lorem eu est auctor ultricies',
                  date: '21',
                  month: 'MAR',
                  author: 'Sad-Wu',
                  image: require('./hero-shave.png')
                });
                setPage('blog-detail');
              }}>
                <div className="blog-img">
                  <img src={require('./hero-shave.png')} alt="Blog 2" />
                  <div className="blog-overlay">
                    <span className="blog-icon">🔗</span>
                  </div>
                </div>
                <div className="blog-meta">POSTED 21 MARCH 2017 BY SAD-WU</div>
                <h3 className="blog-title">Ut quis lorem eu est auctor ultricies</h3>
              </div>

              {/* Article 3 */}
              <div className="blog-item" onClick={() => {
                setSelectedBlogPost({
                  id: 3,
                  title: 'Fusce nec ex tellus. Pellentesque lobortis',
                  date: '20',
                  month: 'MAR',
                  author: 'Sad-Wu',
                  image: require('./hero-man.png')
                });
                setPage('blog-detail');
              }}>
                <div className="blog-img">
                  <img src={require('./hero-man.png')} alt="Blog 3" />
                  <div className="blog-overlay">
                    <span className="blog-icon">🔗</span>
                  </div>
                </div>
                <div className="blog-meta">POSTED 20 MARCH 2017 BY SAD-WU</div>
                <h3 className="blog-title">Fusce nec ex tellus. Pellentesque lobortis</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Retro Brand Logos */}
        <section className="section-brands">
          <div className="container brands-container">
            <span className="brand-logo">Frank's Co.</span>
            <span className="brand-logo">RETRO PRESS</span>
            <span className="brand-logo">Vintage California</span>
            <span className="brand-logo">New York TOURNIER</span>
          </div>
        </section>
      </>)
      }

      {
        page === 'shop' && <Shop
          onProductClick={(prod) => {
            setSelectedProduct(prod);
            setPage('product');
          }}
          addToCart={addToCart}
        />
      }

      {
        page === 'product' && <ProductDetail
          product={selectedProduct}
          onBack={() => setPage('shop')}
          addToCart={addToCart}
        />
      }

      {
        page === 'cart' && <CartPage
          cartItems={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => setPage('checkout')}
          onBackToShop={() => setPage('shop')}
        />
      }

      {
        page === 'checkout' && <CheckoutPage
          cartItems={cart}
        />
      }

      {page === 'contact' && <ContactPage />}

      {
        page === 'blog' && <BlogList
          onBlogPostClick={(post) => {
            setSelectedBlogPost(post);
            setPage('blog-detail');
          }}
        />
      }

      {page === 'blog-detail' && <BlogDetail post={selectedBlogPost} />}






      <footer className="footer">
        <div className="footer-overlay"></div>
        <div className="container footer-content">
          {/* Newsletter CTA */}
          <div className="footer-cta text-center">
            <div className="footer-logo-main">
              <img src={require('./barber-logo.png')} alt="Barber Salon" style={{ height: '60px' }} />
            </div>
            <h2 className="footer-cta-title">TEN PERCENT MEMBER DISCOUNT</h2>
            <div className="footer-subscribe">
              <input type="email" placeholder="Enter your email" />
              <button>BECOME A MEMBER &nbsp; ✈</button>
            </div>
          </div>

          <div className="footer-columns">
            {/* Col 1: About */}
            <div className="footer-col about-col">
              <h3 className="footer-heading">ABOUT US</h3>
              <p className="footer-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
              </p>
              <div className="footer-contact-info">
                <p><span>📍</span> 123 Lorem ipsum dolor sit amet, consectetur</p>
                <p><span>✉</span> contact@barber.com</p>
                <p><span>☎</span> Phone 01: +84 (1) 234 567 891</p>
                <p><span>⎙</span> +84 (1) 234 567 891</p>
              </div>
              <div className="footer-socials">
                <a href="#">f</a>
                <a href="#">✖</a>
                <a href="#">📷</a>
                <a href="#">P</a>
              </div>
            </div>

            {/* Col 2: Work Time */}
            <div className="footer-col hours-col">
              <h3 className="footer-heading">WORK TIME</h3>
              <ul className="hours-list">
                <li><span>MON</span> <span>09:00 - 19:00</span></li>
                <li><span>TUE</span> <span>09:00 - 19:00</span></li>
                <li><span>WED</span> <span>09:00 - 19:00</span></li>
                <li><span>THU</span> <span>09:00 - 19:00</span></li>
                <li><span>FRI</span> <span>09:00 - 19:00</span></li>
                <li><span>WEEKEND</span> <span>Closed</span></li>
              </ul>
            </div>

            {/* Col 3: Links */}
            <div className="footer-col links-col">
              <div className="links-group">
                <h3 className="footer-heading">TERMS & LEGAL</h3>
                <ul>
                  <li><a href="#">Terms of Usage</a></li>
                  <li><a href="#">Copyrights</a></li>
                  <li><a href="#">Sitemap</a></li>
                  <li><a href="#">Customer Login</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                  <li><a href="#">How to Contact</a></li>
                </ul>
              </div>
              <div className="links-group">
                <h3 className="footer-heading">COMPANY</h3>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Services</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll to Top */}
        <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>^</div>
      </footer>
    </div >
  );
}

export default App;
