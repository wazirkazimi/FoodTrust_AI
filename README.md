# FoodTrust AI

Full-stack MERN application for food transparency and FSSAI compliance verification.

## Project Structure
```
foodtrust-ai/
├── client/  (React + Vite frontend)
└── server/  (Express + MongoDB backend)
```

### Getting Started

1. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Configure environment variables**
   - Copy `server/.env` and fill in your values.
   - Create `client/.env` with `VITE_API_BASE_URL=http://localhost:5000/api`

3. **Run development servers**
   ```bash
   cd server && npm run dev        # backend on :5000
   cd ../client && npm run dev     # frontend on :3000
   ```

4. **Build for production**
   ```bash
   cd client && npm run build
   # serve build folder with your preferred static server
   ```

## Design & Vibe
- Color palette: purples, electric accents, light lavender background
- Typography: Inter font
- Glassmorphism, gradients, smooth animations with Framer Motion
- Mobile-first with a bottom navigation bar

Refer to the project prompt for full UI and API specifications.
