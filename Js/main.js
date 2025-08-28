// =============================
// Helper: restart animation
// =============================
function restartAnimation(el, delay = 500) {
  el.classList.remove("show");
  void el.offsetWidth; // force reflow
  setTimeout(() => el.classList.add("show"), delay);
}

// =============================
// BODY REFRESH FUNCTION
// =============================
function bodyRefresh() {
  // scroll to body
  document.body.scrollIntoView({ behavior: "smooth" });

  const content = document.getElementById("content");
  if (content) restartAnimation(content, 2000);

  const container = document.querySelector(".container");
  if (container) container.classList.toggle("shadow");
}

// =============================
// CONTAINER OBSERVER (shadow toggle)
// =============================
const container = document.querySelector(".container");
if (container) {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      container.classList.toggle("shadow", entry.isIntersecting);
    });
  }, { threshold: 0.5 }).observe(container);
}

// =============================
// CONTENT OBSERVER
// =============================
const content = document.getElementById("content");
if (content) {
  let hasPlayed = false; // prevents flicker

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.intersectionRatio > 0.6 && !hasPlayed) {
        // play animation ONCE when entering
        restartAnimation(content);
        hasPlayed = true;
      } else if (e.intersectionRatio < 0.1) {
        // reset when almost gone → allow re-trigger later
        content.classList.remove("show");
        hasPlayed = false;
      }
    });
  }, { threshold: [0, 0.1, 0.6, 1] }).observe(content);
}

// =============================
// ABOUT SECTION
// =============================
const about = document.getElementById("about");
if (about) {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.intersectionRatio > 0.6) {
        restartAnimation(about);
      } else if (e.intersectionRatio < 0.1) {
        about.classList.remove("show");
      }
    });
  }, { threshold: [0, 0.1, 0.6, 1] }).observe(about);
}

function goToAbout() {
  if (!about) return;
  restartAnimation(about, 500);
  about.scrollIntoView({ behavior: "smooth" });
}

// =============================
// BLOG SECTION
// =============================
const blog = document.getElementById("blog");
if (blog) {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.intersectionRatio > 0.6) {
        restartAnimation(blog);
      } else if (e.intersectionRatio < 0.1) {
        blog.classList.remove("show");
      }
    });
  }, { threshold: [0, 0.1, 0.6, 1] }).observe(blog);
}

function goToBlog() {
  blog?.scrollIntoView({ behavior: "smooth" });
}

// =============================
// MEDIA SECTIONS (hide if too small)
// =============================
const mediaSections = document.querySelectorAll(".media-section");
if (mediaSections.length > 0) {
  const mediaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.offsetHeight < 50) {
        entry.target.classList.add("hidden");
        return;
      }
      entry.target.classList.remove("hidden");

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.3 });

  mediaSections.forEach(sec => mediaObserver.observe(sec));
}

// =============================
// DOMContentLoaded Scripts
// =============================
document.addEventListener("DOMContentLoaded", () => {
  // Fade-in body after load
  window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
  });

  // Typewriter effect
  const words = ["coder", "YouTuber", "designer", "creator", "developer"];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  const textChanger = document.querySelector(".text-changer");

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

  // Navbar shadow on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    }
  });

  // About-text word-by-word animation
  const section = document.querySelector(".about-text");
  if (section) {
    const paras = section.querySelectorAll("p");
    const texts = [...paras].map(p => p.innerText);
    let lock = false;

    function runAnimation() {
      let delayOffset = 0;
      paras.forEach((p, idx) => {
        const words = texts[idx].split(" ");
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
  }
});
