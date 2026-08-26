/* ============================================================
   PORTFOLIO — Enhanced Script with Premium Animations
   Features: Typing effect, counter animation, staggered reveal,
   tilt cards, scroll progress, magnetic buttons, parallax blobs
   ============================================================ */

const DATA_FILES = {
  profile: "data/profile.json",
  skills: "data/skills.json",
  projects: "data/projects.json",
  experience: "data/experience.json",
  education: "data/education.json",
  certificates: "data/certificates.json",
  achievements: "data/achievements.json",
  socials: "data/socials.json"
};

const state = {
  profile: {},
  projects: [],
  certificates: [],
  achievements: [],
  socials: []
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getJson(url, fallback) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Could not load ${url}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}

function hideLoader() {
  const loader = $("#pageLoader");
  if (loader) loader.classList.add("loaded");
}

function linkAttrs(url = "") {
  const isAnchor = url.startsWith("#");
  const isMail = url.startsWith("mailto:");
  return `${isAnchor || isMail ? "" : 'target="_blank" rel="noopener"'}`;
}

function imageWithFallback(src, alt, className = "") {
  const safeSrc = escapeHtml(src || "");
  const safeAlt = escapeHtml(alt || "Portfolio media placeholder");
  if (!safeSrc) {
    return `<div class="empty-state ${className}">Media placeholder</div>`;
  }
  return `<img class="${className}" src="${safeSrc}" alt="${safeAlt}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'empty-state',textContent:'Media placeholder'}))">`;
}

/* ── Render Functions ───────────────────────────────────────── */

function renderProfile(profile) {
  state.profile = profile;
  document.title = `${profile.name} | ${profile.role}`;
  $("#heroName").textContent = profile.name;
  $("#heroRole").textContent = profile.role;
  $("#heroTagline").textContent = profile.tagline;
  $("#heroLocation").textContent = profile.location;
  $("#longBio").textContent = profile.longBio;
  $("#careerFocus").textContent = profile.careerFocus;
  $("#contactBio").textContent = profile.careerFocus;
  $("#footerName").textContent = profile.name;
  $("#footerRole").textContent = profile.role;

  const profileImage = $("#profileImage");
  const fallback = $("#profileFallback");
  profileImage.src = profile.profileImage || "";
  profileImage.alt = `${profile.name} profile portrait`;
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";
    fallback.style.display = "grid";
  });

  $("#heroActions").innerHTML = (profile.callToAction || []).map((action) => {
    const style = action.style === "primary" ? "btn-primary" : action.style === "secondary" ? "btn-secondary" : "btn-ghost";
    return `<a class="btn ${style}" href="${escapeHtml(action.url)}" ${linkAttrs(action.url)}>${escapeHtml(action.label)}</a>`;
  }).join("");

  $("#focusCards").innerHTML = (profile.focusCards || []).map((card) => `
    <article class="focus-card">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.description)}</p>
    </article>
  `).join("");

  const resumeButton = $("#resumeButton");
  resumeButton.href = profile.resumeUrl || "#";
  resumeButton.textContent = profile.resumeUrl ? "View / Download Resume" : "Resume Coming Soon";
}

function renderSkills(skills) {
  $("#skillsGrid").innerHTML = skills.length ? skills.map((group) => `
    <article class="skill-card">
      <h3>${escapeHtml(group.category)}</h3>
      <div class="chip-row">
        ${(group.items || []).map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join("")}
      </div>
    </article>
  `).join("") : `<div class="empty-state">Add skills in data/skills.json.</div>`;
}

function projectCard(project, index) {
  return `
    <article class="project-card" data-category="${escapeHtml(project.category)}">
      <div class="project-media">
        ${imageWithFallback(project.mainImage, `${project.title} preview`)}
        <span class="project-status">${escapeHtml(project.status)}</span>
      </div>
      <div class="project-body">
        <p class="eyebrow">${escapeHtml(project.category)}${project.highlight ? " / Highlight" : ""}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.shortDescription)}</p>
        <div class="chip-row tech-stack-row">
          ${(project.techStack || []).slice(0, 4).map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
        </div>
        <div class="card-actions">
          <button class="btn btn-primary" type="button" data-project-index="${index}">View Details</button>
          ${project.githubLink ? `<a class="btn btn-ghost" href="${escapeHtml(project.githubLink)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(projects) {
  $("#projectGrid").innerHTML = projects.length
    ? projects.map((project) => projectCard(project, state.projects.indexOf(project))).join("")
    : `<div class="empty-state">Add projects in data/projects.json.</div>`;

  $$("[data-project-index]").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(state.projects[Number(button.dataset.projectIndex)]));
  });
}

function renderExperience(items) {
  $("#experienceTimeline").innerHTML = items.length ? items.map((item) => `
    <article class="timeline-item">
      <p class="eyebrow">${escapeHtml(item.company)}</p>
      <h3>${escapeHtml(item.role)}</h3>
      <div class="meta"><span>${escapeHtml(item.duration)}</span><span>${escapeHtml(item.location)}</span></div>
      <ul>
        ${(item.details || []).map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
      </ul>
    </article>
  `).join("") : `<div class="empty-state">Add internships or work experience in data/experience.json.</div>`;
}

function renderEducation(items) {
  $("#educationGrid").innerHTML = items.length ? items.map((item) => `
    <article class="education-card">
      <p class="eyebrow">${escapeHtml(item.duration)}</p>
      <h3>${escapeHtml(item.institution)}</h3>
      <p>${escapeHtml(item.degree)}</p>
      <strong>${escapeHtml(item.status)}</strong>
    </article>
  `).join("") : `<div class="empty-state">Add education items in data/education.json.</div>`;
}

function renderCertificates(items) {
  state.certificates = items;
  $("#certificateGrid").innerHTML = items.length ? items.map((cert) => {
    const imageUrl = cert.imageUrl || "";
    const preview = imageUrl
      ? imageWithFallback(imageUrl, `${cert.title} certificate preview`)
      : `<span>PNG</span>`;
    return `
      <article class="certificate-card">
        <div class="certificate-preview">${preview}</div>
        <div class="certificate-body">
          <p class="eyebrow">${escapeHtml(cert.issuer)} / ${escapeHtml(cert.date)}</p>
          <h3>${escapeHtml(cert.title)}</h3>
          <p>${escapeHtml(cert.description)}</p>
          <div class="card-actions">
            ${imageUrl ? `<button class="btn btn-primary" type="button" data-certificate-index="${state.certificates.indexOf(cert)}">View Certificate</button>` : ""}
            ${cert.credentialUrl ? `<a class="btn btn-secondary" href="${escapeHtml(cert.credentialUrl)}" target="_blank" rel="noopener">Credential</a>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Add PNG certificates in data/certificates.json.</div>`;

  $$("[data-certificate-index]").forEach((button) => {
    button.addEventListener("click", () => openCertificateModal(state.certificates[Number(button.dataset.certificateIndex)]));
  });
}

function renderAchievements(items) {
  state.achievements = items;
  $("#achievementGrid").innerHTML = items.length ? items.map((item) => {
    const imageUrl = item.imageUrl || "";
    const preview = imageUrl
      ? imageWithFallback(imageUrl, `${item.title} achievement preview`)
      : `<span>IMG</span>`;

    return `
      <article class="achievement-card ${item.highlight ? "highlight" : ""}">
        <div class="achievement-preview">${preview}</div>
        <div class="achievement-body">
          <p class="eyebrow">${escapeHtml(item.title)}${item.date ? ` / ${escapeHtml(item.date)}` : ""}</p>
          <h3>${escapeHtml(item.subtitle)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="card-actions">
            ${imageUrl ? `<button class="btn btn-primary" type="button" data-achievement-index="${state.achievements.indexOf(item)}">View Achievement</button>` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Add achievements in data/achievements.json.</div>`;

  $$("[data-achievement-index]").forEach((button) => {
    button.addEventListener("click", () => openAchievementModal(state.achievements[Number(button.dataset.achievementIndex)]));
  });
}

function renderSocials(socials) {
  state.socials = socials;
  const links = socials.map((social) => {
    if (!social.url) {
      return `<span class="social-link" aria-disabled="true">${escapeHtml(social.platform)}: ${escapeHtml(social.label)}</span>`;
    }
    return `<a class="social-link" href="${escapeHtml(social.url)}" ${linkAttrs(social.url)}>${escapeHtml(social.platform)}: ${escapeHtml(social.label)}</a>`;
  }).join("");
  $("#contactLinks").innerHTML = links;
  $("#footerLinks").innerHTML = socials
    .filter((social) => social.url)
    .map((social) => `<a href="${escapeHtml(social.url)}" ${linkAttrs(social.url)}>${escapeHtml(social.platform)}</a>`)
    .join("");
}

/* ── Modal Functions ────────────────────────────────────────── */

function openProjectModal(project) {
  const modal = $("#projectModal");
  const gallery = (project.mediaGallery || []).map((item) => {
    const media = item.type === "video"
      ? `<video src="${escapeHtml(item.url)}" controls preload="metadata"></video>`
      : imageWithFallback(item.url, item.alt || item.title);
    return `<div class="gallery-item">${media}<span>${escapeHtml(item.title || "Project media")}</span></div>`;
  }).join("");

  $("#modalContent").innerHTML = `
    <div class="modal-inner">
      <div class="modal-hero">${imageWithFallback(project.mainImage, `${project.title} preview`)}</div>
      <p class="eyebrow">${escapeHtml(project.category)} / ${escapeHtml(project.status)}</p>
      <h2>${escapeHtml(project.title)}</h2>
      <p>${escapeHtml(project.detailedDescription)}</p>
      <div class="chip-row">
        ${(project.techStack || []).map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
      </div>
      <h3>Key Features</h3>
      <ul class="modal-list">
        ${(project.features || []).map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
      </ul>
      <div class="modal-actions">
        ${project.liveDemoLink ? `<a class="btn btn-primary" href="${escapeHtml(project.liveDemoLink)}" target="_blank" rel="noopener">Live Demo</a>` : ""}
        ${project.githubLink ? `<a class="btn btn-secondary" href="${escapeHtml(project.githubLink)}" target="_blank" rel="noopener">GitHub</a>` : ""}
      </div>
      <div class="gallery-grid">${gallery || '<div class="empty-state">Add project screenshots or videos in projects.json.</div>'}</div>
    </div>
  `;
  modal.showModal();
}

function openCertificateModal(cert) {
  const modal = $("#projectModal");
  const imageUrl = cert.imageUrl || "";

  $("#modalContent").innerHTML = `
    <div class="modal-inner certificate-modal-inner">
      <p class="eyebrow">${escapeHtml(cert.issuer)} / ${escapeHtml(cert.date)}</p>
      <h2>${escapeHtml(cert.title)}</h2>
      <p>${escapeHtml(cert.description)}</p>
      <div class="certificate-full-preview">
        ${imageWithFallback(imageUrl, `${cert.title} full certificate preview`)}
      </div>
      ${cert.credentialUrl ? `<div class="modal-actions"><a class="btn btn-secondary" href="${escapeHtml(cert.credentialUrl)}" target="_blank" rel="noopener">Open Credential</a></div>` : ""}
    </div>
  `;
  modal.showModal();
}

function openAchievementModal(item) {
  const modal = $("#projectModal");
  const imageUrl = item.imageUrl || "";

  $("#modalContent").innerHTML = `
    <div class="modal-inner certificate-modal-inner">
      <p class="eyebrow">${escapeHtml(item.title)}${item.date ? ` / ${escapeHtml(item.date)}` : ""}</p>
      <h2>${escapeHtml(item.subtitle)}</h2>
      <p>${escapeHtml(item.description)}</p>
      <div class="certificate-full-preview">
        ${imageWithFallback(imageUrl, `${item.title} full achievement preview`)}
      </div>
    </div>
  `;
  modal.showModal();
}

/* ── Core Setup Functions ───────────────────────────────────── */

function setupNavigation() {
  const header = $("#siteHeader");
  const nav = $("#mainNav");
  const toggle = $("#navToggle");
  const links = $$(".nav a");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const setHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  $$("main section[id]").forEach((section) => sectionObserver.observe(section));
}

function setupContactForm() {
  $("#contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${formData.get("name")}`);
    const body = encodeURIComponent(`${formData.get("message")}\n\nFrom: ${formData.get("name")} <${formData.get("email")}>`);
    window.location.href = `mailto:${state.profile.email}?subject=${subject}&body=${body}`;
  });
}

function setupModal() {
  const modal = $("#projectModal");
  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM ANIMATION FEATURES
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. Typing Effect ───────────────────────────────────────── */

function setupTypingEffect() {
  const heroName = $("#heroName");
  if (!heroName) return;

  const fullText = heroName.textContent;
  heroName.textContent = "";
  heroName.classList.add("typing");

  let i = 0;
  function type() {
    if (i < fullText.length) {
      heroName.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 85);
    } else {
      setTimeout(() => heroName.classList.remove("typing"), 1200);
    }
  }

  // Start typing after loader fades
  setTimeout(type, 500);
}

/* ── 2. Counter Animation ──────────────────────────────────── */

function setupCounterAnimation() {
  const metricGrid = $(".metric-grid");
  if (!metricGrid) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        const strongs = $$("strong", metricGrid);
        strongs.forEach((el) => {
          const target = parseInt(el.textContent, 10);
          if (!isNaN(target) && target > 0) {
            const duration = 1500;
            const startTime = performance.now();

            function step(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic for smooth deceleration
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
          }
          // Non-numeric values (like "AI/ML") are left as-is
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricGrid);
}

/* ── 3. Enhanced Staggered Reveal ──────────────────────────── */

function setupReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stagger children with incremental delay
        const children = entry.target.querySelectorAll(
          ".skill-card, .focus-card, .education-card, .timeline-item"
        );
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.08}s`;
        });
      }
    });
  }, { threshold: 0.08 });

  $$(".reveal").forEach((element) => revealObserver.observe(element));
}

/* ── 4. Tilt Effect on Cards ────────────────────────────────── */

function setupTiltEffect() {
  // Only on devices with hover capability
  if (!window.matchMedia("(hover: hover)").matches) return;

  const cards = $$(".profile-card, .project-card, .certificate-card, .achievement-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ── 5. Scroll Progress Bar ─────────────────────────────────── */

function setupScrollProgress() {
  const bar = $("#scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = percent + "%";
  }, { passive: true });
}

/* ── 6. Magnetic Buttons ────────────────────────────────────── */

function setupMagneticButtons() {
  // Only on devices with hover capability
  if (!window.matchMedia("(hover: hover)").matches) return;

  $$(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ── 7. Parallax Blobs ──────────────────────────────────────── */

function setupParallax() {
  const blobs = $$(".blob");
  if (!blobs.length) return;

  const speeds = [0.02, 0.035, 0.025];

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    blobs.forEach((blob, i) => {
      blob.style.transform = `translateY(${scrollY * (speeds[i] || 0.02)}px)`;
    });
  }, { passive: true });
}

/* ── 8. Custom Cursor Tracker ───────────────────────────────── */

function setupCursorTracker() {
  // Only on devices with hover + fine pointer
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;
  let isVisible = false;

  // Show cursor on first move
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    if (!isVisible) {
      isVisible = true;
      document.body.classList.add('cursor-visible');
    }
  });

  // Hide cursor when mouse leaves viewport
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    document.body.classList.remove('cursor-visible');
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    document.body.classList.add('cursor-visible');
  });

  // Click effect
  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup', () => dot.classList.remove('clicking'));

  // Smooth outline with lerp
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Scale up cursor on interactive elements
  function addHoverListeners() {
    const interactives = document.querySelectorAll(
      'a, button, .btn, .project-card, .certificate-card, .achievement-card, ' +
      '.social-link, .nav a, input, textarea, .skill-card, .focus-card, .chip'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        outline.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        outline.classList.remove('hover');
      });
    });
  }

  // Run initially and re-run after dynamic content loads
  addHoverListeners();

  // Observe DOM changes to re-attach on dynamic content
  const observer = new MutationObserver(() => {
    addHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ── 9. Smooth Scroll with Easing ──────────────────────────── */

function setupSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ── Setup All Animations ───────────────────────────────────── */

function setupAnimations() {
  setupTypingEffect();
  setupCounterAnimation();
  setupScrollProgress();
  setupParallax();
  // Tilt and magnetic need cards to be rendered first
  setupTiltEffect();
  setupMagneticButtons();
  setupCursorTracker();
  setupSmoothScroll();
}

/* ── Init ────────────────────────────────────────────────────── */

async function init() {
  try {
    const [profile, skills, projects, experience, education, certificates, achievements, socials] = await Promise.all([
      getJson(DATA_FILES.profile, {}),
      getJson(DATA_FILES.skills, []),
      getJson(DATA_FILES.projects, []),
      getJson(DATA_FILES.experience, []),
      getJson(DATA_FILES.education, []),
      getJson(DATA_FILES.certificates, []),
      getJson(DATA_FILES.achievements, []),
      getJson(DATA_FILES.socials, [])
    ]);

    state.projects = projects;
    renderProfile(profile);
    renderSkills(skills);
    renderProjects(projects);
    renderExperience(experience);
    renderEducation(education);
    renderCertificates(certificates);
    renderAchievements(achievements);
    renderSocials(socials);

    setupNavigation();
    setupReveal();
    setupContactForm();
    setupModal();
    setupAnimations();
  } catch (error) {
    console.warn("Portfolio could not finish loading:", error);
  } finally {
    setTimeout(hideLoader, 300);
  }
}

window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 2000);
init();
