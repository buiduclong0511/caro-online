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
            },
            colors: {
                'level-color': '#389e0d',
            },
            borderColor: {
                'level-border': '#b7eb8f',
            },
        },
    },
    plugins: [],
};
