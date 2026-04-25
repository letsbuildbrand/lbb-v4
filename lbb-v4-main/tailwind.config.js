/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: '#020617', // Deep Slate
                },
                orange: {
                    DEFAULT: '#FF4500', // Electric Orange
                    500: '#FF4500',
                },
                teal: {
                    DEFAULT: '#00E0FF', // Cyber Teal
                    400: '#00E0FF',
                }
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                display: ['Oswald', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'scroll': 'scroll 20s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
