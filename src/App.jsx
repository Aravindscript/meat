
import React, { useState, useEffect } from "react";
import "./style.css";

const BASE = import.meta.env.BASE_URL;

const products = [
  { id: 1, name: "Farm Fresh Eggs", category: "Eggs", price: 120, unit: "12 pcs", protein: "6g per egg", desc: "Farm-fresh eggs with natural goodness, rich protein and essential nutrients.", image: "images/egg.jpg" },
  { id: 2, name: "Fresh Chicken", category: "Chicken", price: 280, unit: "1 kg", protein: "27g / 100g", desc: "Freshly cleaned chicken, perfect for curries, grills and everyday cooking.", image: "images/chicken.jpg" },
  { id: 3, name: "Premium Mutton", category: "Mutton", price: 850, unit: "1 kg", protein: "25g / 100g", desc: "Tender premium mutton selected for rich flavor and satisfying meals.", image: "images/mutton.jpg" },
  { id: 4, name: "Premium Beef", category: "Beef", price: 520, unit: "1 kg", protein: "26g / 100g", desc: "Rich, hearty beef cuts suitable for steaks, roasts and slow cooking.", image: "images/beef.jpg" },
  { id: 5, name: "Fresh Fish", category: "Fish", price: 350, unit: "1 kg", protein: "22g / 100g", desc: "Fresh fish, carefully cleaned and ready for your favorite seafood recipes.", image: "images/fish.jpg" },
  { id: 6, name: "Juicy Prawns", category: "Seafood", price: 450, unit: "500 g", protein: "24g / 100g", desc: "Fresh prawns with a naturally sweet flavor, ideal for fry and curry.", image: "images/prawns.jpg" },
  { id: 7, name: "Fresh Duck", category: "Duck", price: 480, unit: "1 kg", protein: "19g / 100g", desc: "Flavorful duck meat for roasting, traditional recipes and special occasions.", image: "images/duck.jpg" },
  { id: 8, name: "Crab Selection", category: "Seafood", price: 400, unit: "1 kg", protein: "19g / 100g", desc: "Fresh crab selection with naturally delicious seafood flavor.", image: "images/crab.jpg" },
  { id: 9, name: "Whole Lobster", category: "Seafood", price: 950, unit: "1 kg", protein: "20g / 100g", desc: "Premium lobster for a special seafood feast.", image: "images/lobster.jpg" },
  { id: 10, name: "Fresh Squid", category: "Seafood", price: 320, unit: "1 kg", protein: "16g / 100g", desc: "Fresh squid, ideal for crispy fry, pepper masala and seafood dishes.", image: "images/squid.jpg" },
  { id: 11, name: "Whole Turkey", category: "Poultry", price: 650, unit: "1 kg", protein: "29g / 100g", desc: "Quality turkey with lean meat and a naturally rich flavor.", image: "images/turkey.jpg" },
  { id: 12, name: "Meat Sausages", category: "Ready to Cook", price: 260, unit: "500 g", protein: "14g / 100g", desc: "Easy-to-cook sausages perfect for breakfast, grills and quick meals.", image: "images/sausages.jpg" },
];

const categories = ["All", "Eggs", "Chicken", "Mutton", "Beef", "Fish", "Seafood", "Duck", "Poultry", "Ready to Cook"];

function money(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// LOADING INTRO
function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const start = Date.now();

    const interval = setInterval(() => {
      const value = Math.min(100, Math.floor(((Date.now() - start) / duration) * 100));
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(onFinish, 400);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader-grain" />

      <div className="loader-brand">
        <span className="loader-small">PREMIUM FRESH MEAT</span>
        <h1>BITE <span>&</span> TASTE</h1>
        <div className="loader-line" />
        <p>QUALITY YOU CAN TASTE</p>
      </div>

      <div className="floating-meat">
        <img
          src={`${BASE}images/loader-meat.png`}
          alt="Floating premium meat"
        />
      </div>

      <div className="loader-bottom">
        <span>FRESHNESS • QUALITY • FLAVOR</span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  );
}

// NAVBAR
function Navbar({ page, setPage, cartCount, setCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Home", "Shop", "About", "Contact", "Order"];

  return (
    <header className="navbar">
      <button className="logo" onClick={() => setPage("Home")}>
        <span className="logo-symbol">B</span>
        <span className="logo-text">
          <strong>BITE <i>&</i> TASTE</strong>
          <small>PREMIUM MEAT STORE</small>
        </span>
      </button>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <button
            key={link}
            className={page === link ? "nav-link active" : "nav-link"}
            onClick={() => {
              setPage(link);
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {link === "Order" ? "ORDER NOW" : link.toUpperCase()}
          </button>
        ))}
      </nav>

      <button className="cart-button" onClick={() => setCartOpen(true)}>
        <span>🛒</span>
        <span>CART</span>
        <span className="cart-badge">{cartCount}</span>
      </button>
    </header>
  );
}

// PRODUCT FLIP CARD
function ProductCard({ product, addToCart, openProduct }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`product-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="card-inner">
        {/* FRONT */}
        <div className="card-front">
          <div className="product-img">
            <img
              src={`${BASE}${product.image}`}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x500/171717/e43b31?text=Bite+%26+Taste";
              }}
            />
            <span className="product-label">{product.category}</span>
            <span className="flip-indicator">↻ FLIP CARD</span>
          </div>

          <div className="card-info">
            <h3>{product.name}</h3>
            <p className="product-short">{product.desc}</p>

            <div className="product-bottom">
              <div>
                <strong>{money(product.price)}</strong>
                <small>{product.unit}</small>
              </div>
              <button
                className="add-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="card-back">
          <div className="back-image">
            <img
              src={`${BASE}${product.image}`}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x500/171717/e43b31?text=Fresh+Meat";
              }}
            />
          </div>

          <div className="back-content">
            <span className="back-label">BITE & TASTE QUALITY</span>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>

            <div className="nutrition">
              <span>PROTEIN</span>
              <strong>{product.protein}</strong>
            </div>

            <div className="back-price">{money(product.price)} / {product.unit}</div>

            <button
              className="back-add"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              ADD TO CART +
            </button>

            <button
              className="details-btn"
              onClick={(e) => {
                e.stopPropagation();
                openProduct(product);
              }}
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// SHOP
function Shop({ addToCart, openProduct }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="shop-section page-section" id="shop">
      <div className="section-header">
        <span className="eyebrow">THE FRESH COLLECTION</span>
        <h2>OUR <span>PRODUCTS</span></h2>
        <p>Discover fresh cuts, rich flavor and premium quality.</p>
      </div>

      <div className="shop-controls">
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "category-btn selected" : "category-btn"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          className="search-input"
          placeholder="Search fresh products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            openProduct={openProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-search">
          No products found. Try another search.
        </div>
      )}
    </section>
  );
}

// ABOUT
function About() {
  return (
    <section className="about-page page-section">
      <div className="section-header">
        <span className="eyebrow">OUR STORY</span>
        <h2>GOOD MEAT.<br /><span>GOOD MOOD.</span></h2>
      </div>

      <div className="about-layout">
        <div className="about-photo">
          <img
            src={`${BASE}images/chicken.png`}
            alt="Fresh meat quality"
          />
          <div className="photo-stamp">
            <strong>100%</strong>
            <span>FRESH QUALITY</span>
          </div>
        </div>

        <div className="about-copy">
          <span className="red-text">WELCOME TO BITE & TASTE</span>
          <h3>Freshness is our promise.<br />Flavor is our passion.</h3>

          <p>
            We believe great food begins with great ingredients. At Bite & Taste,
            we bring together fresh meat, carefully selected cuts and quality
            products to make every meal special.
          </p>

          <p>
            From everyday cooking to weekend feasts, we make choosing fresh,
            flavorful meat simple. Quality, care and freshness are at the heart
            of everything we do.
          </p>

          <div className="about-points">
            <span>✦ Carefully selected products</span>
            <span>✦ Fresh cuts every day</span>
            <span>✦ Quality you can trust</span>
          </div>
        </div>
      </div>

      <div className="about-stats">
        <div><strong>100%</strong><span>FRESH QUALITY</span></div>
        <div><strong>12+</strong><span>PRODUCT VARIETIES</span></div>
        <div><strong>DAILY</strong><span>FRESH SELECTION</span></div>
        <div><strong>BEST</strong><span>QUALITY & TASTE</span></div>
      </div>
    </section>
  );
}

// CONTACT
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="contact-page page-section">
      <div className="section-header">
        <span className="eyebrow">GET IN TOUCH</span>
        <h2>LET'S <span>TALK</span></h2>
        <p>Questions, feedback or a special order? We'd love to hear from you.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h3>CONTACT <span>US</span></h3>
          <p>We are here to help you with fresh products and your orders.</p>

          <div className="contact-item">
            <span className="contact-icon">☎</span>
            <div><small>PHONE</small><strong>+91 00000 00000</strong></div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">✉</span>
            <div><small>EMAIL</small><strong>hello@biteandtaste.com</strong></div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">⌖</span>
            <div><small>LOCATION</small><strong>Your Store Location</strong></div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">◷</span>
            <div><small>OPENING HOURS</small><strong>Mon – Sun · 8 AM – 9 PM</strong></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}>
          <h3>SEND US A <span>MESSAGE</span></h3>

          {submitted ? (
            <div className="success-message">
              <span>✓</span>
              <h3>Thank you!</h3>
              <p>Your message form has been submitted.</p>
            </div>
          ) : (
            <>
              <input placeholder="Your Name" required />
              <input placeholder="Email Address" type="email" required />
              <input placeholder="Phone Number" type="tel" />
              <textarea placeholder="Your message..." rows="5" required />
              <button className="red-button" type="submit">SEND MESSAGE →</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

// ORDER PAGE
function OrderPage({ cart, changeQuantity, removeItem, total, setPage })  {
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateField = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    setOrderPlaced(true);
  };

  const orderText = `Hello Bite & Taste! I would like to place an order:\n\n${cart.map(item => `${item.name} x ${item.quantity} = ${money(item.price * item.quantity)}`).join("\n")}\n\nTotal: ${money(total)}\n\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}`;

  return (
    <section className="order-page page-section">
      <div className="section-header">
        <span className="eyebrow">FRESH TO YOUR TABLE</span>
        <h2>YOUR <span>ORDER</span></h2>
      </div>

      {orderPlaced ? (
        <div className="order-success">
          <span>✓</span>
          <h2>ORDER READY TO SEND</h2>
          <p>Your order details are ready. Click below to send your order via WhatsApp.</p>
          <a
            className="red-button"
            href={`https://wa.me/?text=${encodeURIComponent(orderText)}`}
            target="_blank"
            rel="noreferrer"
          >
            SEND ORDER ON WHATSAPP
          </a>
          <button className="outline-button" onClick={() => setPage("Home")}>BACK TO HOME</button>
        </div>
      ) : (
        <div className="order-layout">
          <div className="order-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <button className="red-button" onClick={() => setPage("Shop")}>EXPLORE SHOP</button>
              </div>
            ) : (
              cart.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={`${BASE}${item.image}`} alt={item.name} />
                  <div className="order-item-info">
                    <h3>{item.name}</h3>
                    <strong>{money(item.price)}</strong>
                    <div className="quantity-controls">
                      <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                      <button className="remove-item" onClick={() => removeItem(item.id)}>REMOVE</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <form className="checkout-form" onSubmit={submitOrder}>
              <h3>DELIVERY DETAILS</h3>
              <input name="name" placeholder="Full Name" value={customer.name} onChange={updateField} required />
              <input name="phone" placeholder="Phone Number" type="tel" value={customer.phone} onChange={updateField} required />
              <textarea name="address" placeholder="Delivery Address" rows="4" value={customer.address} onChange={updateField} required />

              <div className="checkout-total">
                <span>Total Amount</span>
                <strong>{money(total)}</strong>
              </div>
              <button className="red-button full-button" type="submit">CONFIRM ORDER →</button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

// PRODUCT POPUP
function ProductModal({ product, onClose, addToCart }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <img src={`${BASE}${product.image}`} alt={product.name} />

        <div className="modal-content">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          <p>{product.desc}</p>

          <div className="modal-nutrition">
            <span>PROTEIN <strong>{product.protein}</strong></span>
            <span>PACK <strong>{product.unit}</strong></span>
          </div>

          <strong className="modal-price">{money(product.price)}</strong>

          <button className="red-button full-button" onClick={() => {
            addToCart(product);
            onClose();
          }}>
            ADD TO CART +
          </button>
        </div>
      </div>
    </div>
  );
}

// CART DRAWER
function CartDrawer({ cart, setCartOpen, changeQuantity, removeItem, total, setPage }) {
  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>YOUR CART <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <button className="red-button" onClick={() => {
              setCartOpen(false);
              setPage("Shop");
            }}>SHOP NOW</button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <div className="drawer-item" key={item.id}>
                  <img src={`${BASE}${item.image}`} alt={item.name} />
                  <div className="drawer-item-info">
                    <h3>{item.name}</h3>
                    <strong>{money(item.price)}</strong>
                    <div className="quantity-controls">
                      <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                      <button className="remove-item" onClick={() => removeItem(item.id)}>REMOVE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="checkout-total"><span>Total</span><strong>{money(total)}</strong></div>
              <button className="red-button full-button" onClick={() => {
                setCartOpen(false);
                setPage("Order");
              }}>PROCEED TO ORDER →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// HOME PAGE FEATURED COLLECTION
function FreshCollection({ setPage, addToCart, openProduct }) {
  // Keep only these four products on the landing page.
  const featuredProducts = products.slice(0, 4);

  return (
    <section
      className="fresh-collection"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(5,5,5,.96) 0%, rgba(5,5,5,.86) 38%, rgba(5,5,5,.55) 100%), url("${BASE}images/fresh-collection-bg.jpg")`
      }}
    >
      <div className="fresh-collection-overlay" />
      <div className="fresh-collection-inner">
        <div className="fresh-collection-heading">
          <span className="eyebrow">THE FRESH COLLECTION</span>
          <h2>FRESH PICKS.<br /><span>BETTER MEALS.</span></h2>
          <p>Explore our handpicked favorites, selected for freshness, quality and flavor.</p>
          <button className="red-button" onClick={() => setPage("Shop")}>
            VIEW ALL PRODUCTS →
          </button>
        </div>

        <div className="fresh-collection-cards">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              openProduct={openProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// MEAT NUTRITION AND COOKING INFORMATION
function MeatBenefits() {
  return (
    <section className="meat-benefits">
      <div className="benefits-image">
        <img src={`${BASE}images/beef.jpg`} alt="Fresh premium beef steak" />
        <span className="benefits-image-tag">FRESH • QUALITY • PROTEIN</span>
      </div>

      <div className="benefits-content">
        <span className="eyebrow">KNOW YOUR MEAT</span>
        <h2>GOOD FOOD.<br /><span>GREAT NUTRITION.</span></h2>
        <p className="benefits-intro">
          Make every meal count with quality meat and simple cooking ideas.
          Here are a few quick facts about fresh beef.
        </p>

        <div className="benefit-list">
          <article className="benefit-item">
            <span className="benefit-number">01</span>
            <div>
              <h3>HIGH-QUALITY PROTEIN</h3>
              <p>Beef provides protein that helps support muscle growth and repair.</p>
            </div>
          </article>
          <article className="benefit-item">
            <span className="benefit-number">02</span>
            <div>
              <h3>IRON & VITAMIN B12</h3>
              <p>It contains nutrients that support healthy red blood cells and energy metabolism.</p>
            </div>
          </article>
          <article className="benefit-item">
            <span className="benefit-number">03</span>
            <div>
              <h3>HOW TO COOK</h3>
              <p>Season with salt, pepper and herbs. Sear in a hot pan, then cook to your preferred safe doneness.</p>
            </div>
          </article>
        </div>
        <span className="benefits-note">Nutrition varies by cut and serving size.</span>
      </div>
    </section>
  );
}

// HOME
function Home({ setPage, addToCart, openProduct }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO BITE & TASTE</span>
          <h1>
            FRESH CUTS.
            <br />
            <span>BOLD FLAVORS.</span>
          </h1>
          <p>
            Premium fresh meat for every table.
            <br />
            Quality cuts, delicious flavor, every day.
          </p>
          <div className="hero-actions">
            <button className="red-button" onClick={() => setPage("Shop")}>SHOP OUR COLLECTION →</button>
            <button className="text-button" onClick={() => setPage("About")}>OUR STORY ↗</button>
          </div>
        </div>
        <div className="hero-bottom">
          <span>FRESHNESS</span><i>✦</i><span>QUALITY</span><i>✦</i><span>FLAVOR</span>
        </div>
      </section>

      <section className="home-about">
        <div className="home-about-text">
          <span className="eyebrow">OUR MEAT MARKET</span>
          <h2>WE GO ALL OUT<br />FOR <span>QUALITY.</span></h2>
          <p>
            We believe great meals begin with quality ingredients.
            Carefully selected fresh meat, great cuts and rich flavor —
            that's the Bite & Taste promise.
          </p>
          <button className="red-button" onClick={() => setPage("About")}>DISCOVER OUR STORY →</button>
          <div className="stats-row">
            <div><strong>100%</strong><small>QUALITY</small></div>
            <div><strong>12+</strong><small>PRODUCTS</small></div>
            <div><strong>FRESH</strong><small>EVERY DAY</small></div>
          </div>
        </div>

        <div className="home-about-image">
          <img src={`${BASE}images/mutton.png`} alt="Premium meat selection" />
          <div className="image-small">
            <img src={`${BASE}images/chicken.png`} alt="Fresh chicken" />
          </div>
        </div>
      </section>

      <FreshCollection setPage={setPage} addToCart={addToCart} openProduct={openProduct} />

      <section className="video-section">
        <div className="video-container">
          <video controls autoPlay muted loop playsInline>
            <source src={`${BASE}videos/meat-video.mp4`} type="video/mp4" />
            Your browser does not support video.
          </video>
        </div>

        <div className="video-content">
          <span className="eyebrow">FRESH FROM OUR SELECTION</span>
          <h2>QUALITY YOU CAN <span>TASTE.</span></h2>
          <p>
            Great food deserves great ingredients. Explore our fresh selection,
            find your favorites and bring bold flavor to your table.
          </p>
          <button className="red-button" onClick={() => setPage("Shop")}>SHOP FRESH MEAT →</button>
        </div>
      </section>

      <MeatBenefits />

      <section className="home-cta">
        <span className="eyebrow">YOUR NEXT MEAL STARTS HERE</span>
        <h2>FRESH MEAT.<br /><span>FRESH POSSIBILITIES.</span></h2>
        <button className="red-button" onClick={() => setPage("Order")}>ORDER NOW →</button>
      </section>
    </>
  );
}

// FOOTER
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo">
          <span className="logo-symbol">B</span>
          <h2>BITE <span>&</span> TASTE</h2>
          <p>QUALITY MEAT. BOLD FLAVOR.</p>
        </div>

        <div className="footer-column">
          <h4>EXPLORE</h4>
          {["Home", "Shop", "About"].map((p) => (
            <button key={p} onClick={() => {setPage(p); window.scrollTo(0,0);}}>{p}</button>
          ))}
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          {["Contact", "Order"].map((p) => (
            <button key={p} onClick={() => {setPage(p); window.scrollTo(0,0);}}>{p === "Order" ? "Order Now" : p}</button>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <h4>GET IN TOUCH</h4>
          <p>Fresh products. Great service.</p>
          <p>hello@biteandtaste.com</p>
          <p>+91 8072223638</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 BITE & TASTE. ALL RIGHTS RESERVED.</span>
        <span>MADE WITH PASSION FOR GOOD FOOD.</span>
      </div>
    </footer>
  );
}

// MAIN APP
export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const openProduct = (product) => setSelectedProduct(product);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="app">
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
      />

      {page === "Home" && <Home setPage={setPage} addToCart={addToCart} openProduct={openProduct} />}
      {page === "Shop" && <Shop addToCart={addToCart} openProduct={openProduct} />}
      {page === "About" && <About />}
      {page === "Contact" && <Contact />}
      {page === "Order" && (
        <OrderPage
          cart={cart}
          changeQuantity={changeQuantity}
          removeItem={removeItem}
          total={total}
          setPage={setPage}
        />
      )}

      <Footer setPage={setPage} />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          setCartOpen={setCartOpen}
          changeQuantity={changeQuantity}
          removeItem={removeItem}
          total={total}
          setPage={setPage}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

