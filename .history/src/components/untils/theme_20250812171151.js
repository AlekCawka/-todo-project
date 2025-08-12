const THEME_KEY = 'theme';

export const getStoredTheme = () => {
    return localStorage.getItem(THEME_KEY) || 'light';
};

export const saveTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
};

export const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
};