// Theme toggle functionality
(function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    function toggleTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    }
    
    function updateThemeIcon() {
        const theme = document.documentElement.getAttribute('data-theme');
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            icon.className = theme === 'light' ? 'fas fa-moon theme-icon' : 'fas fa-sun theme-icon';
        });
    }
    
    window.toggleTheme = toggleTheme;
    
    document.addEventListener('DOMContentLoaded', () => {
        updateThemeIcon();
    });
})();
