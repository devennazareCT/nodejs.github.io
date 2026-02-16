function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginName, setLoginName] = React.useState('');
  const [loginIdentity, setLoginIdentity] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Static password check
    if (loginPassword === 'password123') {
      setIsLoggedIn(true);
      
      // Initialize CleverTap after successful login
      if (window.clevertap) {
        clevertap.privacy.push({optOut: false});
        clevertap.privacy.push({useIP: false});
        clevertap.init('TEST-654-Z9R-646Z', 'eu1');
        
        // Push user profile with actual input values
        clevertap.onUserLogin.push({
          'Site': {
            'Name': loginName,
            'Identity': loginIdentity,
            'Email': loginEmail
          }
        });
        
        // Track login event
        clevertap.event.push('User Logged In', {
          'Email': loginEmail,
          'Name': loginName,
          'Identity': loginIdentity,
          'Login Time': new Date().toISOString()
        });
        
        // Log CleverTap ID
        setTimeout(() => {
          console.log('CleverTap ID:', clevertap.getCleverTapID());
        }, 1000);
      }
    } else {
      alert('Invalid password! Use: password123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginEmail('');
    setLoginName('');
    setLoginIdentity('');
    setLoginPassword('');
    
    if (window.clevertap) {
      clevertap.event.push('User Logged Out');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && window.clevertap) {
      clevertap.event.push('Newsletter Signup', {
        'Email': email,
        'Source': 'Landing Page'
      });
      alert('Thanks for subscribing!');
      setEmail('');
    }
  };

  const trackButtonClick = (buttonName) => {
    if (window.clevertap) {
      clevertap.event.push('Button Clicked', {
        'Button Name': buttonName
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue</p>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="text"
              placeholder="Identity"
              value={loginIdentity}
              onChange={(e) => setLoginIdentity(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-button">Sign In</button>
          </form>
          <div className="login-hint">
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="logo">YourBrand</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li className="user-info">
              <span>👤 {loginName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container">
          <h1 className="hero-title">Build Something Amazing</h1>
          <p className="hero-subtitle">Transform your ideas into reality with our innovative solutions</p>
          <button className="btn-primary" onClick={() => trackButtonClick('Get Started')}>
            Get Started
          </button>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>Lightning-fast load times and optimal performance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Perfect experience on any device, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
            We're passionate about creating exceptional digital experiences. 
            Our team combines creativity with technical expertise to deliver 
            solutions that drive results.
          </p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Stay Connected</h2>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <button type="submit" className="btn-secondary">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
