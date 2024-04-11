const toggleButton = document.getElementById('theme-toggle');

// Function to toggle the theme
const toggleTheme = () => {
    const isDarkMode = toggleButton.checked;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

// Event listener for theme toggle
toggleButton.addEventListener('change', toggleTheme);
const storedTheme = localStorage.getItem('theme');
const isDarkMode = storedTheme === 'dark';
toggleButton.checked = isDarkMode;