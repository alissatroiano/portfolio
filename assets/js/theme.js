// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggles = Array.from(document.querySelectorAll('[data-theme-toggle]'));
    const themeTargets = Array.from(document.querySelectorAll('#mainNav, #projectsNav, #hero, #about, #skills, #contact'));
    const icon = themeToggles.length ? themeToggles[0].querySelector('i') : null;

    const setDarkMode = (enabled) => {
        themeTargets.forEach((el) => el.classList.toggle('dark-mode', enabled));
        if (!icon) return;
        if (enabled) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(currentTheme === 'dark');

    themeToggles.forEach((toggle) => {
        toggle.addEventListener('click', function() {
            const isDark = !themeTargets.some((el) => el.classList.contains('dark-mode'));
            setDarkMode(isDark);
        });
    });
});