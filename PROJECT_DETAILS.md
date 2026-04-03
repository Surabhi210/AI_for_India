# Contributor Task Document — AI for India 

> **AI for India** is an open-source civic-tech web platform that empowers 1.4 billion Indian citizens with AI-powered tools for farming, health, education, and government services — available in 22 Indian languages.

---

## 1. Project Overview

### Description
**AI for India** is a frontend-first civic-tech website that provides AI-powered tools to every Indian citizen regardless of language, literacy, or location. The platform includes features like Kisan AI (farming assistant), Health Diagnosis, Shiksha Bot (education), Sarkari AI (government services), Paisa Smart (finance), and Bhasha AI (language translation).

Future versions aim to integrate real AI/ML backends to power these tools.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Fonts** | Google Fonts — Poppins, DM Sans |
| **Planned Backend** | Node.js / Python (Flask or FastAPI) |
| **Planned AI/ML** | NLP models, crop prediction, multilingual support |
| **Version Control** | Git + GitHub |

### Current Features
AI for India currently includes:
- Responsive navbar with language switcher (6 Indian languages)
- Hero section with live AI chat mockup
- Stats bar with animated count-up numbers
- 6 feature cards (Kisan AI, Health, Shiksha Bot, Sarkari AI, Paisa Smart, Bhasha AI)
- "How It Works" section with dark themed step cards and animations
- Testimonials section with verified badges
- CTA banner and footer
- Login/Signup modal with OTP and Aadhaar options
- Mobile-responsive hamburger menu
- Scroll fade-in animations and micro-interactions
- Toast notification system

### Target Users
Indian citizens from rural and semi-urban areas — especially farmers, students, homemakers, and first-time smartphone users — who need government and civic services in their own language.

---

## 2. Architecture / Key Modules

### File Structure

```
AI_for_India/
├── index.html          # Main HTML — all sections and components
├── style.css           # All CSS — design system, animations, responsive
├── image.png           # Project logo (India map + Ashoka Chakra)
├── README.md           # Project overview
└── CONTRIBUTOR_GUIDE.md  # This file
```

### Section Map (inside index.html)

| Section | HTML Comment | Purpose |
|---------|-------------|---------|
| **Announcement Banner** | `<!-- ANNOUNCEMENT BANNER -->` | Fixed top alert strip |
| **Navbar** | `<!-- NAVBAR -->` | Fixed nav with logo, links, language toggle, login |
| **Mobile Drawer** | `<!-- MOBILE DRAWER -->` | Hamburger menu for mobile |
| **Hero** | `<!-- HERO -->` | Landing section with chat mockup |
| **Stats Bar** | `<!-- STATS BAR -->` | Animated numbers — users, languages, states |
| **Features** | `<!-- FEATURES -->` | 6 feature cards grid |
| **How It Works** | `<!-- HOW IT WORKS -->` | 3-step dark section with icons |
| **Testimonials** | `<!-- TESTIMONIALS -->` | 3 user review cards |
| **CTA Banner** | `<!-- CTA BANNER -->` | Call-to-action section |
| **Footer** | `<!-- FOOTER -->` | Links, brand, copyright |
| **Login Modal** | `<!-- LOGIN MODAL -->` | Login/Signup overlay |
| **Toast** | `<!-- TOAST -->` | Notification popup |

### CSS Design System (style.css)

| Variable | Value | Usage |
|----------|-------|-------|
| `--navy` | `#0A1F44` | Primary background, text |
| `--saffron` | `#FF6B00` | Accent, CTAs, highlights |
| `--white` | `#FFFFFF` | Backgrounds, text on dark |
| `--india-green` | `#138808` | India flag accent |
| `--grey-light` | `#F4F6FA` | Light section backgrounds |

---

## 3. New Feature Ideas

### Feature 1: Real Language Switcher

**Problem it solves:** The current language toggle only shows a dropdown — it doesn't actually change the page text to Hindi, Tamil, Telugu, etc. Real users need to read in their own language.

- **Difficulty Level:** Intermediate
- **Estimated Effort:** 10–15 hours
- **Files Affected:**
  - `index.html` — add `data-i18n` attributes to all text elements
  - `lang/en.json`, `lang/hi.json`, `lang/ta.json` — create translation JSON files
  - New `lang.js` — language switching logic

---

### Feature 2: Working AI Chat Widget

**Problem it solves:** The hero section shows a static chat mockup. A real AI chatbot (even a simple FAQ bot) would demonstrate the platform's value and engage users.

- **Difficulty Level:** Intermediate to Advanced
- **Estimated Effort:** 12–20 hours
- **Files Affected:**
  - `index.html` — upgrade `.phone-mockup` into a functional chat widget
  - New `chat.js` — message handling logic
  - New `backend/chat_api.py` — simple Flask API with predefined responses or OpenAI integration

---

### Feature 3: Dark / Light Mode Toggle

**Problem it solves:** Some sections are dark, some are light — a user-controlled toggle would improve accessibility and user preference support.

- **Difficulty Level:** Beginner to Intermediate
- **Estimated Effort:** 4–6 hours
- **Files Affected:**
  - `style.css` — add CSS variables for light/dark themes
  - `index.html` — add toggle button in navbar
  - Inline `<script>` — toggle class on `<body>` and persist in `localStorage`

---

### Feature 4: Kisan AI Crop Recommendation Form

**Problem it solves:** The Kisan AI card exists but has no real functionality. A simple form where farmers input their state, soil type, and season to get crop suggestions would be a meaningful first AI feature.

- **Difficulty Level:** Intermediate
- **Estimated Effort:** 10–14 hours
- **Files Affected:**
  - `index.html` — add crop recommendation form/modal
  - New `kisan.js` — frontend logic
  - New `backend/kisan_api.py` — Python backend with a simple decision tree or ML model

---

### Feature 5: Accessibility Improvements (WCAG AA)

**Problem it solves:** The platform targets rural Indian users who may use screen readers or have visual impairments. Current site lacks ARIA labels, skip-nav links, and keyboard navigation support.

- **Difficulty Level:** Beginner
- **Estimated Effort:** 6–8 hours
- **Files Affected:**
  - `index.html` — add `aria-label`, `role`, `alt`, `tabindex` attributes
  - `style.css` — add `:focus-visible` styles, increase contrast where needed

---

### Feature 6: Progress / Onboarding Tour

**Problem it solves:** First-time visitors (especially low digital literacy users) don't know where to start. A guided 3-step tour pointing to key features would improve onboarding.

- **Difficulty Level:** Beginner to Intermediate
- **Estimated Effort:** 5–8 hours
- **Files Affected:**
  - `index.html` — add tour overlay elements
  - New `tour.js` — step-by-step highlight logic using `getBoundingClientRect()`
  - `style.css` — spotlight/overlay styling

---

## 4. Feature Implementation Pipeline

### Pipeline for Feature 1: Real Language Switcher

1. **Create translation JSON files**
   - Create `/lang/` folder
   - Add `en.json`, `hi.json`, `ta.json`, `te.json`, `bn.json`, `mr.json`
   - Each file maps keys to translated strings: `{ "hero_title": "Artificial Intelligence..." }`

2. **Tag HTML elements**
   - Add `data-i18n="hero_title"` to all translatable text elements in `index.html`

3. **Write language switcher JS**
   - Create `lang.js`
   - On language select: fetch the JSON, loop through `[data-i18n]` elements, replace `textContent`
   - Save selected language to `localStorage`

4. **Update `switchLang()` function**
   - In the existing `switchLang()` script, call the new `applyLanguage(code)` function

5. **Test all 6 languages**
   - Verify all sections switch correctly
   - Check font rendering for non-Latin scripts (Tamil, Telugu, Bengali)

---

### Pipeline for Feature 3: Dark / Light Mode Toggle

1. **Define theme CSS variables**
   - In `style.css`, add a `[data-theme="light"]` selector block
   - Override `--navy`, `--grey-light`, `--border` etc. with lighter values

2. **Add toggle button to navbar**
   - Place a 🌙 / ☀️ icon button in `.nav-right` in `index.html`

3. **Write toggle logic**
   - On click: toggle `data-theme="light"` on `<html>`
   - Save preference to `localStorage`
   - On page load: read from `localStorage` and apply

4. **Test dark sections**
   - How It Works, Testimonials, Hero — ensure they adapt correctly
   - Check all text contrast ratios

---

### Pipeline for Feature 5: Accessibility

1. **Audit current HTML**
   - Run [WAVE](https://wave.webaim.org/) or axe DevTools on the page
   - List all missing ARIA attributes and contrast failures

2. **Add ARIA labels**
   - `<nav aria-label="Main navigation">`
   - `<button aria-label="Toggle language">` on lang toggle
   - `<img alt="AI for India logo">` on logo
   - `role="dialog"` and `aria-modal="true"` on modal

3. **Add skip navigation**
   - Add `<a href="#features" class="skip-nav">Skip to content</a>` at top of `<body>`
   - Style it as visually hidden but focusable

4. **Fix keyboard navigation**
   - Ensure modal closes on `Escape` key
   - Ensure all interactive elements are reachable via `Tab`
   - Add `:focus-visible` outline styles in CSS

5. **Test with screen reader**
   - Use NVDA (Windows) or VoiceOver (Mac) to navigate the page

---

## 5. Good First Issues

### Issue 1: Fix Image Alt Text on Logo

**Description:**
The `<img src="image.png">` logo in the navbar and footer is missing an `alt` attribute. This fails accessibility standards and shows broken text if the image doesn't load.

**File:** `index.html`

**Fix:**
```html
<!-- Navbar -->
<img src="image.png" alt="AI for India logo">

<!-- Footer -->
<img src="image.png" alt="AI for India logo">
```

**Why beginner-friendly:** One-line fix, introduces HTML accessibility concepts.

---

### Issue 2: Add Keyboard Close to Login Modal

**Description:**
The login modal can be closed by clicking outside it, but pressing `Escape` does nothing. Add keyboard support.

**File:** `index.html` (inside the `<script>` block)

**Fix:**
```javascript
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
```

**Why beginner-friendly:** 3 lines of JS, clear outcome, introduces keyboard accessibility.

---

### Issue 3: Add Active State to Nav Links

**Description:**
None of the navbar links show an active/current state. Add a `.active` class to highlight the current section as the user scrolls.

**Files:** `index.html` (script), `style.css`

**Steps:**
1. Add `.active` style to `.nav-links a` in CSS
2. Use `IntersectionObserver` in JS to detect which section is visible
3. Add/remove `.active` class on the matching nav link

**Why beginner-friendly:** Good introduction to `IntersectionObserver`, visible result.

---

### Issue 4: Animate Stats Bar Numbers on Mobile

**Description:**
The count-up animation on stats (1 Cr+, 22, 28, 99.2%) works on desktop but may not trigger correctly on mobile because of scroll threshold differences. Test and fix.

**File:** `index.html` (the `statObs` IntersectionObserver in script)

**Fix:** Lower the threshold from `0.5` to `0.2` for mobile:
```javascript
}, {threshold: window.innerWidth < 768 ? 0.2 : 0.5});
```

**Why beginner-friendly:** Small change, teaches responsive JS logic.

---

### Issue 5: Add "Back to Top" Button

**Description:**
The page is long. Add a floating "↑" button that appears after scrolling 400px and smoothly scrolls back to the top when clicked.

**Files:** `index.html`, `style.css`

**Steps:**
1. Add `<button id="backToTop">↑</button>` before `</body>`
2. Style it as fixed bottom-right, saffron background, hidden by default
3. In JS: show on scroll > 400px, hide otherwise, scroll to top on click

**Why beginner-friendly:** Self-contained, introduces `window.scrollY` and `scrollTo()`.

---

### Issue 6: Add Hover Tooltips to Feature Cards

**Description:**
The 6 feature cards (Kisan AI, Health Diagnosis, etc.) have no tooltip on hover. Add a small tooltip showing a one-line benefit when hovering the card icon.

**Files:** `index.html`, `style.css`

**Steps:**
1. Add `data-tooltip="e.g., Free for all farmers"` to each `.card-icon`
2. In CSS, use `[data-tooltip]::after` to show the tooltip text on hover
3. Add fade-in transition

**Why beginner-friendly:** Pure CSS solution, introduces CSS `attr()` and `::after` pseudo-elements.

---

## 6. Contributor Notes

### Prerequisites

Make sure you have:
- A code editor (VS Code recommended)
- Git installed
- A modern browser (Chrome / Firefox)
- Live Server extension for VS Code (for local preview)
- Node.js (only needed if working on planned backend features)

---

### Setup Steps

1. **Fork and Clone**
   ```bash
   git clone https://github.com/Surabhi210/AI_for_India.git
   cd AI_for_India
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Run locally**
   - Install the **Live Server** extension in VS Code
   - Right-click `index.html` → **Open with Live Server**
   - Visit `http://127.0.0.1:5500`

4. **No build step needed** — it's pure HTML/CSS/JS. Edit and save to see changes instantly.

---

### Important Libraries & Tools

| Tool | Purpose | Link |
|------|---------|------|
| Google Fonts | Poppins + DM Sans typography | https://fonts.google.com |
| Live Server (VS Code) | Local dev server with hot reload | VS Code Extensions |
| WAVE | Accessibility audit tool | https://wave.webaim.org |
| Can I Use | Browser compatibility checks | https://caniuse.com |

---

### Tips for Contributors

1. **Read the CSS variables first** — all colors and spacing use `--navy`, `--saffron` etc. Never hardcode colors.

2. **Match the dark sections** — How It Works and Testimonials use `#060f24` background. New dark sections should match this.

3. **Follow the 8-point grid** — spacing values should be multiples of 8px (8, 16, 24, 32, 40, 48...).

4. **Test on mobile** — always resize to 375px width before submitting. Use Chrome DevTools → Toggle Device Toolbar.

5. **Don't break existing animations** — the `.fade-in` + `.animate-ready` + `.visible` class system is fragile. Test scroll animations after your changes.

6. **Commit message format:**
   ```
   feat: add keyboard close to modal
   fix: correct alt text on logo images
   style: improve hover state on nav links
   docs: update contributor guide
   ```

---

### Development Workflow

```bash
# 1. Create a feature branch
git checkout -b fix/modal-keyboard-close

# 2. Make your changes in index.html or style.css

# 3. Test in browser (Live Server)

# 4. Commit with clear message
git add .
git commit -m "fix: close modal on Escape key press"

# 5. Push to your fork
git push origin fix/modal-keyboard-close

# 6. Open a Pull Request on GitHub
#    - Describe what you changed and why
#    - Add a screenshot if it's a visual change
#    - Link the related issue number
```

---

### Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Logo image not showing | Make sure `image.png` is in the same folder as `index.html` |
| Fonts not loading | Check internet connection — Google Fonts requires network access |
| Animations not triggering | Hard refresh with `Ctrl+Shift+R` to clear cache |
| Mobile menu not working | Check browser console for JS errors |
| Old favicon showing | Add `?v=2` to favicon href: `<link rel="icon" href="image.png?v=2">` |

---

### Need Help?

- Open a [GitHub Issue](https://github.com/Surabhi210/AI_for_India/issues) with your question
- Tag it with `question` or `help wanted`
- Include your browser, OS, and a screenshot if it's a visual bug

---

**Happy Contributing! 🚀**

Every small improvement — a fixed typo, a better animation, or an accessibility fix — helps make AI more accessible for every Indian citizen.

*Jai Hind*