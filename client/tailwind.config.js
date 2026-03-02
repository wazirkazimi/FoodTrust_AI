module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        violet: '#6D28D9',
        accent: '#8B5CF6',
        background: '#F5F3FF',
        card: '#FFFFFF',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      }
    }
  },
  plugins: []
};