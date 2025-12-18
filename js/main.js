const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  const icon = themeToggle.querySelector("i");
  if (body.classList.contains("light")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}

const langButtons = document.querySelectorAll(".lang-switch span");
const translations = {};

async function loadLanguage(lang) {
  try {
    if (!translations[lang]) {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load language: ${lang}`);
      translations[lang] = await response.json();
    }

    const data = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        if (el.tagName === "TITLE") {
          el.innerHTML = data[key];
        } else {
          el.textContent = data[key];
        }
      }
    });

    langButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

    localStorage.setItem("lang", lang);
  } catch (error) {
    console.error("Language loading error:", error);
  }
}

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    loadLanguage(btn.dataset.lang);
  });
});

const savedLang = localStorage.getItem("lang") || "en";
loadLanguage(savedLang);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".section, .card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
