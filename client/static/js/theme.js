function applyTheme(theme) {
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(`${theme}-theme`);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //esperar 100 ms porque el navbar se inserta dinamicamente
  setTimeout(setupThemeToggle, 100);
});
