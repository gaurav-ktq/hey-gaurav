// ================================
// EMAILJS CONFIGURATION
// ================================
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "sBfEffiFlAQ4uts8s",
  SERVICE_ID: "service_ba718gd",
  TEMPLATE_ID: "template_8c8flnt"
};

// Initialize EmailJS
if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY
  });
}

// ================================
// PAGE READY
// ================================
document.body.style.overflow = "auto";
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ================================
// CUSTOM CURSOR
// ================================
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

(function animateCursor() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll("a, button, .service-card, .cert-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    follower.style.width = "60px";
    follower.style.height = "60px";
    follower.style.borderColor = "rgba(0,238,255,0.7)";
  });
  el.addEventListener("mouseleave", () => {
    follower.style.width = "36px";
    follower.style.height = "36px";
    follower.style.borderColor = "rgba(0,238,255,0.4)";
  });
});

// ================================
// NAVBAR SCROLL
// ================================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  // Active nav link highlight
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  links.forEach(l => {
    l.style.color = l.getAttribute("href") === "#" + current ? "var(--accent)" : "";
  });
});

// ================================
// MOBILE MENU
// ================================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = menuBtn.querySelectorAll("span");
  const isOpen = mobileMenu.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px,5px)" : "";
  spans[1].style.opacity = isOpen ? "0" : "1";
  spans[2].style.transform = isOpen ? "rotate(-45deg) translate(5px,-5px)" : "";
});

document.querySelectorAll(".mobile-menu a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = "1"; });
  });
});

// ================================
// TYPED TEXT ANIMATION
// ================================
const phrases = ["Web Experiences", "Cyber Security", "Data Analytics", "Project Manager"];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIdx === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
setTimeout(type, 1200);

// ================================
// REVEAL ON SCROLL (IntersectionObserver)
// ================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll("[data-reveal], [data-reveal-right]").forEach(el => {
  revealObserver.observe(el);
});

// ================================
// COUNTER ANIMATION
// ================================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat-num").forEach(el => {
        const target = parseInt(el.dataset.count);
        let count = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = count;
        }, 50);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector(".hero-stats");
if (heroStats) counterObserver.observe(heroStats);

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ================================
// HERO IMAGE PARALLAX (mouse)
// ================================
const floatingImg = document.querySelector(".floating-image");
let imgX = 0, imgY = 0;
document.addEventListener("mousemove", e => {
  imgX = (e.clientX - window.innerWidth / 2) / 50;
  imgY = (e.clientY - window.innerHeight / 2) / 50;
});
(function animateImg() {
  if (floatingImg) floatingImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
  requestAnimationFrame(animateImg);
})();

// ================================
// PROJECT CARD 3D TILT
// ================================
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * 8;
    const rotY = ((x - rect.width / 2) / rect.width) * -8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  });
});

// ================================
// TOAST NOTIFICATIONS
// ================================
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "✓" : "✗";
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;

  container.appendChild(toast);

  // Trigger reflow for transition
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ================================
// CONTACT FORM SUBMIT
// ================================
let isSubmitting = false;
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    // Validate empty fields
    if (!nameVal || !emailVal || !messageVal) {
      showToast("Please fill in all required fields.", "failure");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      showToast("Please enter a valid email address.", "failure");
      return;
    }

    // Prevent double submission
    isSubmitting = true;
    const btn = this.querySelector("button");
    const orig = btn.innerHTML;

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      contactForm
    ).then(() => {
      // Success state
      btn.innerHTML = 'Message Sent ✓';
      btn.style.background = "#00cc88";
      btn.style.color = "#ffffff";
      
      showToast("Message Sent Successfully", "success");
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
        isSubmitting = false;
      }, 3000);
    }).catch((error) => {
      // Failure state
      console.error("EmailJS Error:", error);
      btn.innerHTML = 'Failed to Send';
      btn.style.background = "#ff3366";
      btn.style.color = "#ffffff";

      showToast("Failed to send message.", "failure");

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
        isSubmitting = false;
      }, 3000);
    });
  });
}

// ================================
// SERVICE CARD GLOW ON HOVER
// ================================
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--gx", x + "px");
    card.style.setProperty("--gy", y + "px");
  });
});

// ================================
// CERTIFICATIONS — SHOW CREDENTIAL
// ================================
const certificateLinks = {
  cert1: "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_N8L3ZMkSpyAXkjHCH_1780803674675_completion_certificate.pdf",
  cert2: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_N8L3ZMkSpyAXkjHCH_1780808937991_completion_certificate.pdf",
  cert3: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_N8L3ZMkSpyAXkjHCH_1780812416820_completion_certificate.pdf",
  cert4: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzIyIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODE3Njc5OF84NTIxNzk4MTc0NDQ3MDUyMTMxNS5wbmciLCJ1c2VybmFtZSI6IkdBVVJBViBLVU1BUiJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4211%2FPower-BI-for-Beginners%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1599112101830762482&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVT45MLKnK9HcpC06yrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAOzxb8VBAAAA",
  cert5: "https://drive.google.com/file/d/1TSN-6BDNI9pC0KkuvPNM1AYQnd1OTXSI/view?usp=sharing",
  cert6: "https://drive.google.com/file/d/1lWz_DF--XE2H0AZWXiFsu5VEGFHZi1RF/view?usp=sharing",
  cert7: "https://drive.google.com/file/d/1FDPbNnmmXSmXKLfLxSUpsfkr201sXWMu/view?usp=sharing",
  cert8: "https://www.netacad.com/certificates?issuanceId=9e36d3ff-149e-4290-8f65-3f1995343a0b",
  cert9: "https://drive.google.com/file/d/13VBqkC_aO-z746uDvy2C5-UvgxnZaq1Q/view?usp=sharing"
};

Object.entries(certificateLinks).forEach(([id, url]) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.open(url, "_blank");
  });
});

// ================================
// END
// ================================