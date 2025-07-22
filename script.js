document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-theme");
  const icon = document.getElementById("theme-symbol");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (theme, save = false) => {
    document.documentElement.setAttribute("data-theme", theme);
    // update checkbox position
    toggle.checked = theme === "dark";
    // update icon
    icon.textContent = theme === "dark" ? "☾" : "☀︎";
    if (save) {
      localStorage.setItem("theme", theme);
    }
  };

  // Get theme preference from localStorage or system
  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return prefersDark.matches ? "dark" : "light";
  };

  // Apply on first load
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Manual toggle = override
  toggle.addEventListener("change", () => {
    applyTheme(toggle.checked ? "dark" : "light", true);
  });

  // Live system change (if no manual override)
  prefersDark.addEventListener("change", (e) => {
    const override = localStorage.getItem("theme");
    if (!override) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
});
