const text = ["Aditya", "a Developer", "a Cyber Security Enthusiast"];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
const typed = document.getElementById("typed");

function type() {
  currentText = text[index];
  if (isDeleting) {
    typed.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % text.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typed.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else {
      setTimeout(type, 100);
    }
  }
}
document.addEventListener("DOMContentLoaded", type);

const sections = document.querySelectorAll(".animate");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
});
sections.forEach(section => observer.observe(section));

const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleButton.textContent =
    document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.6s ease-out";
    setTimeout(() => loadingScreen.style.display = "none", 600);
  }
});

const counterElements = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      const update = () => {
        const current = +el.innerText;
        const increment = Math.ceil(target / 100);
        if (current < target) {
          el.innerText = current + increment;
          setTimeout(update, 20);
        } else {
          el.innerText = target;
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = `${scrollPercent}%`;
});
