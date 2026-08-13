const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS styles before </style>
const extraCSS = `
  /* Brand Logo Emblem */
  .brand-emblem-img {
    height: 44px;
    max-width: 220px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
    transition: transform 0.3s ease;
  }
  .brand-logo:hover .brand-emblem-img {
    transform: scale(1.04);
  }

  /* Cinematic Hero Slider Overlay & Animation */
  .hero-slider-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .hero-slide-item {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.2s ease;
  }

  .hero-slide-item.active {
    opacity: 1;
    visibility: visible;
  }

  .hero-slide-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
    filter: brightness(var(--hero-img-brightness)) contrast(var(--hero-img-contrast));
    transform: scale(1.03);
    transition: transform 8s ease-out;
  }

  .hero-slide-item.active img {
    transform: scale(1.12);
  }

  .hero-slider-controls {
    position: absolute;
    right: 48px;
    bottom: 48px;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(0, 0, 0, 0.35);
    padding: 10px 20px;
    border-radius: var(--radius-full);
    border: 1px solid var(--gold-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    .hero-slider-controls {
      right: 20px;
      bottom: 24px;
      padding: 8px 14px;
      gap: 10px;
    }
  }

  .hero-slider-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(197, 160, 89, 0.15);
    border: 1px solid var(--gold-border);
    color: var(--gold-light);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }

  .hero-slider-btn:hover {
    background: var(--gold-primary);
    color: #FFFFFF;
    transform: scale(1.1);
  }

  .hero-slider-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-dot {
    width: 24px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .hero-dot.active {
    width: 44px;
    background: var(--gold-primary);
    box-shadow: 0 0 10px rgba(197, 160, 89, 0.6);
  }

  .hero-slide-counter {
    font-family: var(--font-heading);
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--gold-light);
    letter-spacing: 0.1em;
    min-width: 50px;
    text-align: center;
  }

  /* Land Portfolio & Layout Sites Styles */
  .land-portfolio-section {
    background-color: var(--bg-card);
    border-top: 1px solid var(--bg-card-border);
    border-bottom: 1px solid var(--bg-card-border);
  }

  .land-filter-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .land-tab-btn {
    padding: 10px 22px;
    border-radius: var(--radius-full);
    background: var(--bg-surface);
    border: 1px solid var(--bg-card-border);
    color: var(--text-muted);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition);
  }

  .land-tab-btn:hover, .land-tab-btn.active {
    background: rgba(197, 160, 89, 0.18);
    border-color: var(--gold-primary);
    color: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .land-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 36px;
  }

  @media (max-width: 992px) {
    .land-grid {
      grid-template-columns: 1fr;
    }
  }

  .land-card {
    background: var(--bg-surface);
    border: 1px solid var(--bg-card-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
  }

  .land-card:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--gold-border);
    transform: translateY(-4px);
  }

  .land-card-header {
    position: relative;
    height: 260px;
    overflow: hidden;
  }

  .land-card-header img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .land-card:hover .land-card-header img {
    transform: scale(1.06);
  }

  .land-card-badge {
    position: absolute;
    top: 18px;
    left: 18px;
    padding: 6px 14px;
    background: rgba(6, 30, 20, 0.85);
    border: 1px solid var(--gold-border);
    border-radius: var(--radius-full);
    color: var(--gold-light);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
  }

  .land-card-status {
    position: absolute;
    top: 18px;
    right: 18px;
    padding: 6px 12px;
    background: rgba(37, 211, 102, 0.2);
    border: 1px solid #25D366;
    border-radius: var(--radius-full);
    color: #25D366;
    font-size: 0.71875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
  }

  .land-card-body {
    padding: 32px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .land-card-title {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 8px;
  }

  .land-card-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
    color: var(--gold-primary);
    margin-bottom: 16px;
    font-weight: 600;
  }

  .land-card-desc {
    font-size: 0.9375rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .land-specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    padding: 16px;
    background: rgba(197, 160, 89, 0.06);
    border: 1px solid rgba(197, 160, 89, 0.15);
    border-radius: var(--radius-md);
    margin-bottom: 24px;
  }

  .land-spec-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    display: block;
    margin-bottom: 4px;
  }

  .land-spec-value {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-main);
  }

  .land-card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

html = html.replace('</style>', extraCSS + '\n</style>');

// 2. Update Header Brand Logo
const oldHeaderLogo = `<a href="#" class="brand-logo" aria-label="Viswa Groups Home">
      <img src="assets/favicon.png" alt="Viswa Groups Logo">
      <span class="brand-title">VISWA <span>GROUPS</span></span>
    </a>`;

const newHeaderLogo = `<a href="#" class="brand-logo" aria-label="Viswa Groups Home">
      <img src="assets/viswa_logo_full.png" alt="Viswa Groups Emblem Logo" class="brand-emblem-img">
    </a>`;

html = html.replace(oldHeaderLogo, newHeaderLogo);

// 3. Update Header Nav links
const oldNav = `<ul class="nav-menu">
        <li><a href="#legacy" class="nav-link">Legacy</a></li>
        <li><a href="#ventures" class="nav-link">Ventures</a></li>
        <li><a href="#leadership" class="nav-link">Leadership</a></li>
        <li><a href="#vision" class="nav-link">Vision</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>`;

const newNav = `<ul class="nav-menu">
        <li><a href="#legacy" class="nav-link">Legacy</a></li>
        <li><a href="#ventures" class="nav-link">Ventures</a></li>
        <li><a href="#land-portfolio" class="nav-link">Land Portfolio</a></li>
        <li><a href="#leadership" class="nav-link">Leadership</a></li>
        <li><a href="#vision" class="nav-link">Vision</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>`;

html = html.replace(oldNav, newNav);

// 4. Update Mobile Drawer Links
const oldDrawer = `<a href="#legacy" onclick="closeMobileNav()">Legacy</a>
  <a href="#ventures" onclick="closeMobileNav()">Ventures</a>
  <a href="#leadership" onclick="closeMobileNav()">Leadership</a>
  <a href="#vision" onclick="closeMobileNav()">Vision</a>
  <a href="#contact" onclick="closeMobileNav()">Contact</a>`;

const newDrawer = `<a href="#legacy" onclick="closeMobileNav()">Legacy</a>
  <a href="#ventures" onclick="closeMobileNav()">Ventures</a>
  <a href="#land-portfolio" onclick="closeMobileNav()">Land Portfolio</a>
  <a href="#leadership" onclick="closeMobileNav()">Leadership</a>
  <a href="#vision" onclick="closeMobileNav()">Vision</a>
  <a href="#contact" onclick="closeMobileNav()">Contact</a>`;

html = html.replace(oldDrawer, newDrawer);

// 5. Replace Hero Section with Cinematic Hero Slider
const oldHero = `<section class="hero">
  <div class="hero-bg">
    <img src="assets/hero_architecture.png" alt="Viswa Groups Architectural Landmark">
  </div>
  <div class="hero-overlay"></div>

  <div class="container hero-content">
    <h1 class="hero-title">Building Tomorrow.<br><span class="text-gold">Creating Enduring Value.</span></h1>
    <p class="hero-subtitle">Excellence across Real Estate, Development &amp; Luxury Hospitality</p>

    <div class="hero-actions">
      <a href="#ventures" class="btn btn-primary">
        Explore Our Ventures
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
      <a href="#contact" class="btn btn-secondary">Schedule Consultation</a>
    </div>

    <!-- Live Animated Metrics Counter Bar -->
    <div class="metrics-bar">
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="25">25</span>+</div>
        <div class="metric-label">Years of Legacy</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="10">10</span>M+</div>
        <div class="metric-label">Sq. Ft. Delivered</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="15">15</span>+</div>
        <div class="metric-label">Signature Ventures</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="99">99.4</span>%</div>
        <div class="metric-label">Client Trust Score</div>
      </div>
    </div>
  </div>
</section>`;

const newHero = `<!-- ===== HERO SECTION (CINEMATIC SLIDER) ===== -->
<section class="hero" id="heroSection">
  <div class="hero-slider-bg">
    <div class="hero-slide-item active" data-slide="0">
      <img src="assets/hero_architecture.png" alt="Viswa Groups Architectural Landmark">
    </div>
    <div class="hero-slide-item" data-slide="1">
      <img src="assets/venture_realestate.png" alt="Viswa Master-Planned Land Layout Township">
    </div>
    <div class="hero-slide-item" data-slide="2">
      <img src="assets/venture_developers.png" alt="Viswa Commercial & High-Rise Infrastructure">
    </div>
    <div class="hero-slide-item" data-slide="3">
      <img src="assets/venture_hospitality.png" alt="Viswa Luxury Hospitality & Resort Estates">
    </div>
  </div>

  <div class="hero-overlay"></div>

  <div class="container hero-content">
    <div class="hero-badge">
      <img src="assets/viswa_mark.png" alt="Viswa Emblem Mark" style="height: 22px; width: auto;">
      <span id="heroSlideTag">Corporate Architecture &amp; Landmarks</span>
    </div>

    <h1 class="hero-title" id="heroSlideTitle">Building Tomorrow.<br><span class="text-gold">Creating Enduring Value.</span></h1>
    <p class="hero-subtitle" id="heroSlideSubtitle">Excellence across Real Estate, Strategic Land Banks &amp; Luxury Hospitality</p>

    <div class="hero-actions">
      <a href="#land-portfolio" class="btn btn-primary">
        Explore Land Holdings
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
      <a href="#ventures" class="btn btn-secondary">Flagship Ventures</a>
    </div>

    <!-- Live Animated Metrics Counter Bar -->
    <div class="metrics-bar">
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="25">25</span>+</div>
        <div class="metric-label">Years of Legacy</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="10">10</span>M+</div>
        <div class="metric-label">Sq. Ft. Delivered</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="15">15</span>+</div>
        <div class="metric-label">Signature Ventures</div>
      </div>
      <div class="metric-item">
        <div class="metric-num"><span class="counter" data-target="99">99.4</span>%</div>
        <div class="metric-label">Client Trust Score</div>
      </div>
    </div>
  </div>

  <!-- Hero Slider Glassmorphic Controls -->
  <div class="hero-slider-controls">
    <button class="hero-slider-btn" id="heroSliderPrev" onclick="heroSlidePrev()" aria-label="Previous Slide">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    
    <div class="hero-slider-dots">
      <div class="hero-dot active" data-slide-target="0" onclick="goToHeroSlide(0)" title="Architecture"></div>
      <div class="hero-dot" data-slide-target="1" onclick="goToHeroSlide(1)" title="Land Portfolio"></div>
      <div class="hero-dot" data-slide-target="2" onclick="goToHeroSlide(2)" title="Commercial"></div>
      <div class="hero-dot" data-slide-target="3" onclick="goToHeroSlide(3)" title="Hospitality"></div>
    </div>

    <button class="hero-slider-btn" id="heroSliderNext" onclick="heroSlideNext()" aria-label="Next Slide">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    
    <div class="hero-slide-counter">
      <span id="currentSlideNum">01</span> / <span>04</span>
    </div>
  </div>
</section>`;

html = html.replace(oldHero, newHero);

// 6. Insert Land Portfolio Section after Ventures Section
const ventureSectionEnd = `    </div>
  </div>
</section>

<!-- ===== EXECUTIVE LEADERSHIP SECTION ===== -->`;

const newLandSection = `    </div>
  </div>
</section>

<!-- ===== MASTER-PLANNED LAND PORTFOLIO & LAYOUT SITES SECTION ===== -->
<section class="section-padding land-portfolio-section" id="land-portfolio">
  <div class="container">
    <div style="text-align: center; max-width: 760px; margin: 0 auto 48px;" class="animate-on-scroll">
      <span class="eyebrow">Plotted Layouts &amp; Land Banks</span>
      <h2 class="heading-lg">Master-Planned Land Portfolio</h2>
      <p class="subheading">High-yield, strategic land holdings and DTCP/RERA-approved plotted layout townships engineered with underground utilities, wide paved avenues, and sustainable green reserves.</p>
    </div>

    <!-- Category Filter Tabs -->
    <div class="land-filter-bar animate-on-scroll">
      <button class="land-tab-btn active" onclick="filterLand('all', this)">All Land Holdings</button>
      <button class="land-tab-btn" onclick="filterLand('gated', this)">Gated Townships</button>
      <button class="land-tab-btn" onclick="filterLand('commercial', this)">Commercial Land Banks</button>
      <button class="land-tab-btn" onclick="filterLand('eco', this)">Eco-Luxury Estates</button>
    </div>

    <!-- Land Portfolio Grid -->
    <div class="land-grid animate-on-scroll" id="landGrid">
      
      <!-- Land Project 1: Viswa Grand Horizon Gated Township -->
      <div class="land-card" data-category="gated">
        <div class="land-card-header">
          <img src="assets/venture_realestate.png" alt="Viswa Grand Horizon Plotted Layout Township">
          <span class="land-card-badge">DTCP &amp; RERA Approved</span>
          <span class="land-card-status">● Booking Open</span>
        </div>
        <div class="land-card-body">
          <h3 class="land-card-title">Viswa Grand Horizon Township</h3>
          <div class="land-card-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            Prime Growth Expressway Corridor
          </div>
          <p class="land-card-desc">120-acre flagship gated residential layout township featuring 60ft and 40ft blacktop avenues, underground electrical cabling, solar streetlighting, and a grand 20,000 sq. ft. community clubhouse.</p>
          
          <div class="land-specs-grid">
            <div class="land-spec-item">
              <span class="land-spec-label">Total Acreage</span>
              <span class="land-spec-value">120+ Acres</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Plot Range</span>
              <span class="land-spec-value">1,200 - 4,800 SF</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Infrastructure</span>
              <span class="land-spec-value">Subterranean</span>
            </div>
          </div>

          <div class="land-card-footer">
            <button class="btn btn-primary" style="flex-grow:1;" onclick="openLayoutModal('Viswa Grand Horizon Township')">
              Explore Masterplan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="btn btn-secondary" onclick="openModal('Site Visit - Viswa Grand Horizon')">Schedule Visit</button>
          </div>
        </div>
      </div>

      <!-- Land Project 2: Viswa Express Commercial Land Hub -->
      <div class="land-card" data-category="commercial">
        <div class="land-card-header">
          <img src="assets/venture_developers.png" alt="Viswa Express Commercial Land Hub">
          <span class="land-card-badge">Industrial &amp; Logistics</span>
          <span class="land-card-status">● Clear Title</span>
        </div>
        <div class="land-card-body">
          <h3 class="land-card-title">Viswa Logistics &amp; Enterprise Hub</h3>
          <div class="land-card-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            National Highway Industrial Frontage
          </div>
          <p class="land-card-desc">85-acre strategic commercial land bank tailored for enterprise logistics, warehousing, assembly plants, and corporate campuses with dedicated high-tension power substation access.</p>
          
          <div class="land-specs-grid">
            <div class="land-spec-item">
              <span class="land-spec-label">Land Parcel</span>
              <span class="land-spec-value">85 Acres</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Frontage</span>
              <span class="land-spec-value">100ft Arterial</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Power &amp; Water</span>
              <span class="land-spec-value">Dedicated Grid</span>
            </div>
          </div>

          <div class="land-card-footer">
            <button class="btn btn-primary" style="flex-grow:1;" onclick="openLayoutModal('Viswa Logistics Hub')">
              Explore Masterplan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="btn btn-secondary" onclick="openModal('Inquire Parcel - Viswa Logistics Hub')">Inquire Parcel</button>
          </div>
        </div>
      </div>

      <!-- Land Project 3: Viswa Whispering Pines Eco Villa Estates -->
      <div class="land-card" data-category="eco">
        <div class="land-card-header">
          <img src="assets/venture_hospitality.png" alt="Viswa Whispering Pines Eco Villa Layout">
          <span class="land-card-badge">Eco-Luxury Resort Zone</span>
          <span class="land-card-status">● Limited Plots</span>
        </div>
        <div class="land-card-body">
          <h3 class="land-card-title">Viswa Whispering Pines Estates</h3>
          <div class="land-card-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            Scenic Foothills Lakefront Reserve
          </div>
          <p class="land-card-desc">Exclusive 50-acre eco-luxury villa plot sanctuary featuring private natural lake access, organic orchards, jogging trails, and 70% preserved green canopy for serene retreat living.</p>
          
          <div class="land-specs-grid">
            <div class="land-spec-item">
              <span class="land-spec-label">Sanctuary</span>
              <span class="land-spec-value">50 Acres</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Villa Plots</span>
              <span class="land-spec-value">3,000 - 10,000 SF</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Green Cover</span>
              <span class="land-spec-value">70% Open Space</span>
            </div>
          </div>

          <div class="land-card-footer">
            <button class="btn btn-primary" style="flex-grow:1;" onclick="openLayoutModal('Viswa Whispering Pines Estates')">
              Explore Masterplan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="btn btn-secondary" onclick="openModal('Site Visit - Whispering Pines')">Schedule Visit</button>
          </div>
        </div>
      </div>

      <!-- Land Project 4: Viswa Prime CBD Commercial Land Parcel -->
      <div class="land-card" data-category="commercial">
        <div class="land-card-header">
          <img src="assets/hero_architecture.png" alt="Viswa Prime CBD Commercial Land Parcel">
          <span class="land-card-badge">Prime Metro Commercial</span>
          <span class="land-card-status">● Enterprise Ready</span>
        </div>
        <div class="land-card-body">
          <h3 class="land-card-title">Viswa Central Commercial Land</h3>
          <div class="land-card-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            Central Business District Core
          </div>
          <p class="land-card-desc">15 acres of high-density commercial zoned land with FAR 4.0 approval, dual main road frontage, and direct metro connectivity for flagship corporate towers or mixed-use retail centers.</p>
          
          <div class="land-specs-grid">
            <div class="land-spec-item">
              <span class="land-spec-label">Parcel Size</span>
              <span class="land-spec-value">15 Acres</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Zoning</span>
              <span class="land-spec-value">FAR 4.0 Approved</span>
            </div>
            <div class="land-spec-item">
              <span class="land-spec-label">Transit</span>
              <span class="land-spec-value">Metro Adjacent</span>
            </div>
          </div>

          <div class="land-card-footer">
            <button class="btn btn-primary" style="flex-grow:1;" onclick="openLayoutModal('Viswa Central Commercial Land')">
              Explore Masterplan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button class="btn btn-secondary" onclick="openModal('Request Dossier - Viswa Central')">Request Dossier</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ===== EXECUTIVE LEADERSHIP SECTION ===== -->`;

html = html.replace(ventureSectionEnd, newLandSection);

// 7. Update Footer Logo Emblem
const oldFooterLogo = `<a href="#" class="brand-logo" style="margin-bottom:18px;">
          <img src="assets/favicon.png" alt="Viswa Groups Logo" style="height:38px;">
          <span class="brand-title" style="font-size:1.15rem;">VISWA <span>GROUPS</span></span>
        </a>`;

const newFooterLogo = `<a href="#" class="brand-logo" style="margin-bottom:18px;">
          <img src="assets/viswa_logo_full.png" alt="Viswa Groups Emblem Logo" style="height:48px; width:auto; object-fit:contain;">
        </a>`;

html = html.replace(oldFooterLogo, newFooterLogo);

// 8. Add JS for Hero Slider & Land Filter & Layout Modal
const jsAdditions = `
  // ===== HERO CINEMATIC SLIDER SCRIPT =====
  const heroSlideData = [
    {
      tag: 'Corporate Architecture & Landmarks',
      title: 'Building Tomorrow.<br><span class="text-gold">Creating Enduring Value.</span>',
      subtitle: 'Excellence across Real Estate, Commercial Landmarks & Luxury Hospitality'
    },
    {
      tag: 'Master-Planned Land Portfolio',
      title: 'Strategic Land Banks.<br><span class="text-gold">Engineered For Generations.</span>',
      subtitle: 'DTCP & RERA approved plotted layout townships with subterranean infrastructure'
    },
    {
      tag: 'Urban High-Rises & Developers',
      title: 'Iconic Developments.<br><span class="text-gold">Uncompromising Precision.</span>',
      subtitle: 'Pioneering structural engineering, commercial towers, and smart communities'
    },
    {
      tag: 'Luxury Hospitality & Retreats',
      title: 'Curated Fine Living.<br><span class="text-gold">Warm Indian Hospitality.</span>',
      subtitle: 'Boutique wellness resorts, executive retreats, and signature dining'
    }
  ];

  let currentHeroSlideIndex = 0;
  let heroSlideInterval = null;

  function updateHeroSlide(index) {
    currentHeroSlideIndex = index;
    const slides = document.querySelectorAll('.hero-slide-item');
    const dots = document.querySelectorAll('.hero-dot');
    const counterEl = document.getElementById('currentSlideNum');
    const tagEl = document.getElementById('heroSlideTag');
    const titleEl = document.getElementById('heroSlideTitle');
    const subtitleEl = document.getElementById('heroSlideSubtitle');

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    if (counterEl) counterEl.textContent = String(index + 1).padStart(2, '0');

    if (tagEl && heroSlideData[index]) tagEl.textContent = heroSlideData[index].tag;
    if (titleEl && heroSlideData[index]) titleEl.innerHTML = heroSlideData[index].title;
    if (subtitleEl && heroSlideData[index]) subtitleEl.textContent = heroSlideData[index].subtitle;
  }

  function goToHeroSlide(index) {
    updateHeroSlide(index);
    resetHeroTimer();
  }

  function heroSlideNext() {
    const nextIndex = (currentHeroSlideIndex + 1) % heroSlideData.length;
    updateHeroSlide(nextIndex);
    resetHeroTimer();
  }

  function heroSlidePrev() {
    const prevIndex = (currentHeroSlideIndex - 1 + heroSlideData.length) % heroSlideData.length;
    updateHeroSlide(prevIndex);
    resetHeroTimer();
  }

  function startHeroTimer() {
    heroSlideInterval = setInterval(() => {
      heroSlideNext();
    }, 6000);
  }

  function resetHeroTimer() {
    if (heroSlideInterval) clearInterval(heroSlideInterval);
    startHeroTimer();
  }

  startHeroTimer();

  // Pause hero slider on mouse hover
  const heroSection = document.getElementById('heroSection');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => { if (heroSlideInterval) clearInterval(heroSlideInterval); });
    heroSection.addEventListener('mouseleave', () => { resetHeroTimer(); });
  }

  // Keyboard navigation for hero slider
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') heroSlidePrev();
    if (e.key === 'ArrowRight') heroSlideNext();
  });

  // ===== LAND PORTFOLIO FILTER SCRIPT =====
  function filterLand(category, btnEl) {
    const buttons = document.querySelectorAll('.land-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnEl.classList.add('active');

    const cards = document.querySelectorAll('.land-card');
    cards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Layout Masterplan Modal Action
  function openLayoutModal(projectName) {
    openModal('Masterplan Layout & Specs: ' + projectName);
  }
`;

html = html.replace('</script>', jsAdditions + '\n</script>');

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html with Emblem logo, Hero Slider, and Land Portfolio section!');
