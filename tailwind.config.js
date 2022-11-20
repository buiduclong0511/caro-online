/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            width: {
                sidebar: '300px',
            },
            backgroundColor: {
                'level-bg': '#f6ffed',
            },
            backgroundImage: {
                'login-bg': 'url(/public/images/login_bg.svg)',
                'room-bg': 'url(/public/images/caro-background.jpg)',
            },
            backgroundSize: {
                '50%': '25%',
            },
            colors: {
                'level-color': '#389e0d',
                'tab-active-color': '#1677FF',
            },
            borderColor: {
                'level-border': '#b7eb8f',
            },
        },
    },
    plugins: [],
};
