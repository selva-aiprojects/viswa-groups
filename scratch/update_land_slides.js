const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Header Brand Logo: Emblem Mark + VISWA GROUPS Text
const oldHeaderLogo = `<a href="#" class="brand-logo" aria-label="Viswa Groups Home">
      <img src="assets/viswa_logo_full.png" alt="Viswa Groups Emblem Logo" class="brand-emblem-img">
    </a>`;

const newHeaderLogo = `<a href="#" class="brand-logo" aria-label="Viswa Groups Home">
      <img src="assets/viswa_mark.png" alt="Viswa Groups Emblem Logo" style="height: 38px; width: auto; object-fit: contain;">
      <span class="brand-title">VISWA <span>GROUPS</span></span>
    </a>`;

html = html.replace(oldHeaderLogo, newHeaderLogo);

// 2. Update Footer Brand Logo: Emblem Mark + VISWA GROUPS Text
const oldFooterLogo = `<a href="#" class="brand-logo" style="margin-bottom:18px;">
          <img src="assets/viswa_logo_full.png" alt="Viswa Groups Emblem Logo" style="height:48px; width:auto; object-fit:contain;">
        </a>`;

const newFooterLogo = `<a href="#" class="brand-logo" style="margin-bottom:18px;">
          <img src="assets/viswa_mark.png" alt="Viswa Groups Emblem Logo" style="height:38px; width:auto; object-fit:contain;">
          <span class="brand-title" style="font-size:1.15rem;">VISWA <span>GROUPS</span></span>
        </a>`;

html = html.replace(oldFooterLogo, newFooterLogo);

// 3. Update Hero Slider Background to 6 Slides (including 2 Land & Layout slides)
const oldHeroBg = `<div class="hero-slider-bg">
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
  </div>`;

const newHeroBg = `<div class="hero-slider-bg">
    <div class="hero-slide-item active" data-slide="0">
      <img src="assets/hero_architecture.png" alt="Viswa Groups Architectural Landmark">
    </div>
    <div class="hero-slide-item" data-slide="1">
      <img src="assets/hero_land_deals_1.png" alt="Viswa Master-Planned Plotted Layout Township">
    </div>
    <div class="hero-slide-item" data-slide="2">
      <img src="assets/hero_land_deals_2.png" alt="Viswa Strategic Highway Commercial Land Bank">
    </div>
    <div class="hero-slide-item" data-slide="3">
      <img src="assets/venture_realestate.png" alt="Viswa Integrated Gated Community">
    </div>
    <div class="hero-slide-item" data-slide="4">
      <img src="assets/venture_developers.png" alt="Viswa Commercial & High-Rise Infrastructure">
    </div>
    <div class="hero-slide-item" data-slide="5">
      <img src="assets/venture_hospitality.png" alt="Viswa Luxury Hospitality & Resort Estates">
    </div>
  </div>`;

html = html.replace(oldHeroBg, newHeroBg);

// 4. Update Hero Slider Controls to 6 Dots & 06 Counter
const oldHeroControls = `<div class="hero-slider-dots">
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
    </div>`;

const newHeroControls = `<div class="hero-slider-dots">
      <div class="hero-dot active" data-slide-target="0" onclick="goToHeroSlide(0)" title="Architecture"></div>
      <div class="hero-dot" data-slide-target="1" onclick="goToHeroSlide(1)" title="Plotted Layouts"></div>
      <div class="hero-dot" data-slide-target="2" onclick="goToHeroSlide(2)" title="Commercial Land Banks"></div>
      <div class="hero-dot" data-slide-target="3" onclick="goToHeroSlide(3)" title="Gated Communities"></div>
      <div class="hero-dot" data-slide-target="4" onclick="goToHeroSlide(4)" title="Commercial Towers"></div>
      <div class="hero-dot" data-slide-target="5" onclick="goToHeroSlide(5)" title="Luxury Hospitality"></div>
    </div>

    <button class="hero-slider-btn" id="heroSliderNext" onclick="heroSlideNext()" aria-label="Next Slide">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    
    <div class="hero-slide-counter">
      <span id="currentSlideNum">01</span> / <span>06</span>
    </div>`;

html = html.replace(oldHeroControls, newHeroControls);

// 5. Update Land Portfolio Cards with the new high-res Land site images
html = html.replace('<img src="assets/venture_realestate.png" alt="Viswa Grand Horizon Plotted Layout Township">', '<img src="assets/hero_land_deals_1.png" alt="Viswa Grand Horizon Plotted Layout Township">');
html = html.replace('<img src="assets/venture_developers.png" alt="Viswa Express Commercial Land Hub">', '<img src="assets/hero_land_deals_2.png" alt="Viswa Express Commercial Land Hub">');

// 6. Update heroSlideData JS array for 6 slides
const oldJsData = `const heroSlideData = [
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
  ];`;

const newJsData = `const heroSlideData = [
    {
      tag: 'Corporate Architecture & Landmarks',
      title: 'Building Tomorrow.<br><span class="text-gold">Creating Enduring Value.</span>',
      subtitle: 'Excellence across Real Estate, Commercial Landmarks & Luxury Hospitality'
    },
    {
      tag: 'Master-Planned Plotted Layouts',
      title: 'Flagship Plotted Townships.<br><span class="text-gold">Ready For Infrastructure.</span>',
      subtitle: '100% DTCP & RERA approved layout developments with 60ft blacktop avenues'
    },
    {
      tag: 'Strategic Enterprise Land Banks',
      title: 'High-Yield Land Acquisitions.<br><span class="text-gold">Highway Express Corridors.</span>',
      subtitle: 'Prime commercial and industrial land parcels engineered for enterprise expansion'
    },
    {
      tag: 'Integrated Gated Communities',
      title: 'Strategic Land Holdings.<br><span class="text-gold">Engineered For Generations.</span>',
      subtitle: 'Subterranean electrical utilities, water treatment, and green open sanctuaries'
    },
    {
      tag: 'Urban High-Rises & Developers',
      title: 'Iconic Engineering Marvels.<br><span class="text-gold">Uncompromising Precision.</span>',
      subtitle: 'Pioneering structural engineering, commercial towers, and smart communities'
    },
    {
      tag: 'Luxury Hospitality & Retreats',
      title: 'Curated Fine Living.<br><span class="text-gold">Warm Indian Hospitality.</span>',
      subtitle: 'Boutique wellness resorts, executive retreats, and signature dining'
    }
  ];`;

html = html.replace(oldJsData, newJsData);

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html with Emblem+Text logo and 6 Hero Slides including Land & Layout Deals!');
