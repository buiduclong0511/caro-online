/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'login-bg': 'url(/public/images/login_bg.svg)',
            },
        },
    },
    plugins: [],
};
