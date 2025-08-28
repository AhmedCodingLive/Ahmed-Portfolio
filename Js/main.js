// =========================
// Helper: restart animation (per-element)
// =========================
function restartAnimation(el, delay = 500) {
  if (!el) return;
  el.classList.remove("show");
  void el.offsetWidth; // force reflow
  setTimeout(() => el.classList.add("show"), delay);
}

// =========================
// BODY REFRESH
// =========================
function bodyRefresh() {
  document.body.scrollIntoView({ behavior: "smooth" });

  const content = document.getElementById("content");
  if (content) restartAnimation(content, 2000);

  const container = document.querySelector(".container");
  if (container) container.classList.toggle("shadow");
}

// =========================
// CONTAINER SHADOW
// =========================
(function setupContainerObserver(){
  const containerEl = document.querySelector(".container");
  if (!containerEl) return;

  const containerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      containerEl.classList.toggle("shadow", entry.isIntersecting);
    });
  }, { threshold: 0.5 });

  containerObserver.observe(containerEl);
})();

// =========================
// Generic observer (for content, about, blog, media, contact, footer)
// Prevents flicker using hysteresis: enter >=35%, exit <=5%
// =========================
(function setupUnifiedSectionsObserver() {
  const selector = "#content, #about, #blog, .media-section, #contact, footer";
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  const unifiedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;

      // Hide tiny media sections only
      if (el.classList.contains("media-section") && el.offsetHeight < 50) {
        el.classList.add("hidden");
        el.dataset.hasPlayed = "false";
        return;
      } else {
        el.classList.remove("hidden");
      }

      const hasPlayed = el.dataset.hasPlayed === "true";

      if (entry.intersectionRatio >= 0.35 && !hasPlayed) {
        restartAnimation(el, 300); // smoother entry
        el.dataset.hasPlayed = "true";
      } else if (entry.intersectionRatio <= 0.05) {
        el.classList.remove("show");
        el.dataset.hasPlayed = "false";
      }
    });
  }, {
    threshold: [0, 0.05, 0.35, 1],
    rootMargin: "0px 0px -5% 0px" // small bias so footer/contact reliably trigger
  });

  nodes.forEach(n => unifiedObserver.observe(n));
})();

// =========================
// Go-to functions
// =========================
function goToAbout() {
  const about = document.getElementById("about");
  if (!about) return;
  restartAnimation(about, 500);
  about.scrollIntoView({ behavior: "smooth" });
}

function goToBlog() {
  const blog = document.getElementById("blog");
  if (!blog) return;
  restartAnimation(blog, 500);
  blog.scrollIntoView({ behavior: "smooth" });
}

// =========================
// DOM Ready: Typewriter, Navbar, About-text animation
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // fade-in body
  window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
  });

  // -------------------------
  // Typewriter effect
  // -------------------------
  (function typewriterInit(){
    const words = ['coder', 'YouTuber', 'designer', 'creator', 'developer'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const textChanger = document.querySelector('.text-changer');
    if (!textChanger) return;

    function typeWriter() {
      const currentWord = words[wordIndex];
      charIndex += isDeleting ? -1 : 1;
      textChanger.textContent = currentWord.substring(0, charIndex);

      let typeSpeed = isDeleting ? 80 : Math.random() * (200 - 100) + 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }
      setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();
  })();

  // -------------------------
  // Navbar scroll effect
  // -------------------------
  (function navbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    });
  })();

  // -------------------------
  // About-text staggered word animation
  // -------------------------
  (function aboutTextAnim(){
    const section = document.querySelector(".about-text");
    if (!section) return;
    const paras = section.querySelectorAll("p");
    if (!paras.length) return;

    const texts = [...paras].map(p => p.innerText);
    let lock = false;

    function runAnimation() {
      let delayOffset = 0;
      paras.forEach((p, idx) => {
        const words = texts[idx].split(" ").filter(Boolean);
        p.innerHTML = words
          .map((w, i) => `<span style="animation-delay:${(i * 0.1 + delayOffset).toFixed(2)}s">${w}</span>`)
          .join(" ");
        delayOffset += words.length * 0.1 + 0.5;
      });

      lock = true;
      setTimeout(() => (lock = false), delayOffset * 1000);
    }

    const aboutTextObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !lock) {
          runAnimation();
        }
      });
    }, { threshold: 0.5 });

    aboutTextObserver.observe(section);
  })();
});
