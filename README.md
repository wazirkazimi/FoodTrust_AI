# 🌿 FoodTrust AI

**India's most advanced food transparency & compliance platform.**  
Scan packaged food, decode ingredients with AI, and make smarter health decisions — instantly.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)

---

## ✨ What is FoodTrust AI?

FoodTrust AI lets users scan food product labels using their camera or by uploading an image. The app uses OCR and AI to:

- ✅ Verify **FSSAI compliance** status
- 📊 Generate **multi-system health grades** (Custom Score, Nutri-Score, Nutri-Grade, Japanese Grade)
- 🧪 Break down **nutritional content** with visual charts
- 📝 Log your food history and track health trends
- 🔍 Search a product database with real-time filtering

> **Demo Mode:** The entire frontend works without a backend. No API keys needed to explore all features.

---

## 🚀 Quick Start

### Frontend Only (Demo Mode — Recommended for First Run)

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** — fully functional with mock data, no backend required.

---

### Full Stack (Frontend + Backend)

**1. Start the Backend**

```bash
cd server
npm install
# Copy and fill in your .env file (see Environment Variables below)
npm run dev
```

Backend runs on **http://localhost:5000**

**2. Start the Frontend**

```bash
cd client
npm install
npm run dev
```

---

## � Project Structure

```
FoodTrust-AI/
├── client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── pages/             # All page components
│   │   │   ├── Landing.jsx    # Hero landing page
│   │   │   ├── Auth.jsx       # Login & Register
│   │   │   ├── Home.jsx       # Dashboard
│   │   │   ├── Scan.jsx       # Image/barcode scanner
│   │   │   ├── Results.jsx    # AI analysis results
│   │   │   ├── Search.jsx     # Product search
│   │   │   ├── FoodLog.jsx    # Scan history
│   │   │   └── Profile.jsx    # User profile & settings
│   │   ├── components/        # Shared UI components
│   │   ├── context/           # React context (auth, state)
│   │   └── utils/             # Helper functions & mock data
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                    # Node.js + Express Backend
    ├── controllers/           # Business logic
    ├── middleware/            # Auth & validation middleware
    ├── models/                # MongoDB schemas (User, Scan, Report)
    ├── routes/                # API routes (auth, scan, search, user, report)
    ├── services/              # External integrations (Vision API, FSSAI)
    └── server.js              # Entry point
```

---

## 🎨 Features

| Feature | Description |
|---|---|
| 🏠 **Landing Page** | Full hero with glassmorphism, animated food emojis, feature cards |
| 🔐 **Authentication** | Register/Login with JWT — falls back to demo mode automatically |
| 📋 **Dashboard** | Personalized greeting, food categories, healthy picks, recent scans |
| 📷 **Scan Page** | Image upload with OCR animation + barcode scanner UI |
| 📊 **Results Page** | FSSAI status, 4 health grades, nutrition charts, PDF report modal |
| 🔍 **Search** | Real-time filtering, category chips, vegetarian toggle |
| 📅 **Food Log** | Timeline with delete, filter by health grade |
| 👤 **Profile** | 4 health modes, vegetarian preference, personal stats |

---

## 📊 Grading Systems

FoodTrust AI scores every product across **4 grading systems** for a complete picture:

| System | Range | Source |
|--------|-------|--------|
| **FoodTrust Score** | 0–10 | Proprietary AI algorithm |
| **Nutri-Score** | A–E | European Union standard |
| **Nutri-Grade** | A–D | Singapore Health Promotion Board |
| **Japanese Grade** | Excellent / Good / Fair / Poor | Japan nutrition guidelines |

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
# Required
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/foodtrust
JWT_SECRET=your_super_secret_key_here
PORT=5000

# Optional (app works in mock mode without these)
GOOGLE_VISION_API_KEY=your_google_vision_key
FSSAI_API_KEY=your_fssai_key
```

| Variable | Required | Purpose |
|---|---|---|
| `MONGO_URI` | ✅ Yes | MongoDB Atlas database connection |
| `JWT_SECRET` | ✅ Yes | Signing authentication tokens |
| `PORT` | Optional | Server port (default: 5000) |
| `GOOGLE_VISION_API_KEY` | Optional | OCR for label scanning (mock fallback) |
| `FSSAI_API_KEY` | Optional | FSSAI verification (mock fallback) |

---

## 🛠️ Tech Stack

### Frontend
| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 12 | Animations |
| Chart.js + react-chartjs-2 | 4/5 | Nutrition charts |
| React Router DOM | 7 | Client-side routing |
| Lucide React | Latest | Icons |
| React Hot Toast | 2 | Notifications |
| React Dropzone | 15 | File upload |

### Backend
| Library | Version | Purpose |
|---|---|---|
| Express | 5 | HTTP server & routing |
| Mongoose | 9 | MongoDB ODM |
| JWT | 9 | Authentication tokens |
| bcryptjs | 3 | Password hashing |
| Multer | 2 | File uploads |
| express-rate-limit | 8 | API rate limiting |
| Axios | 1 | HTTP client for external APIs |
| dotenv | 17 | Environment variable loading |

---

## 🌐 What to Do Next & How to Publish

### Immediate Next Steps

- [ ] **Set up MongoDB Atlas** — Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and add `MONGO_URI` to your `.env`
- [ ] **Get a Google Vision API key** — Enable [Cloud Vision API](https://cloud.google.com/vision) for real OCR scanning
- [ ] **Test the full stack** — Run both client and server together and verify auth + scan flows
- [ ] **Add a real FSSAI database** — Replace mock data with real product data or the FSSAI API

### Publishing the Frontend (Free Options)

| Platform | Best For | How |
|---|---|---|
| **Vercel** ⭐ Recommended | React/Vite apps | `npm i -g vercel` → `vercel` in `/client` |
| **Netlify** | Static & SPA | Drag & drop `/client/dist` after `npm run build` |
| **GitHub Pages** | Simple hosting | Use `gh-pages` package |

**Deploy to Vercel (fastest — 2 minutes):**
```bash
cd client
npm run build       # Creates the dist/ folder
npx vercel          # Follow prompts — site is live instantly
```

### Publishing the Backend (Free Options)

| Platform | Free Tier | Notes |
|---|---|---|
| **Render** ⭐ Recommended | 750 hrs/month | Auto-deploy from GitHub, easy env vars |
| **Railway** | $5 free credit | Very fast setup |
| **Cyclic** | Free | Node.js focused |
| **Fly.io** | Free tier | More control |

**Deploy to Render:**
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select the `server/` folder as root
4. Add your environment variables in the dashboard
5. Deploy — you get a `https://your-app.onrender.com` URL

### After Deploying Both

Update the frontend API base URL to point to your live backend:

```js
// client/src/utils/api.js (or wherever your axios baseURL is set)
const API_BASE = "https://your-backend.onrender.com/api";
```

Then rebuild and redeploy the frontend.


🔜 Your Next Steps (Priority Order)
1. Set Up a Database (Free)
Go to mongodb.com/cloud/atlas, create a free cluster, and copy the connection string into 

server/.env
 as MONGO_URI.

2. Publish the Frontend — Vercel (2 minutes)
bash
cd client
npm run build
npx vercel
Follow the prompts — your site goes live at https://your-app.vercel.app instantly.

3. Publish the Backend — Render (Free)
Push your code to GitHub
Go to render.com → New Web Service
Connect your repo, set the root to server/
Add your 

.env
 variables in the dashboard
Hit Deploy → you get a live https://xxx.onrender.com URL
4. Connect Them
Update the API base URL in your frontend to point to your Render backend URL, then rebuild and redeploy.

Tip: The whole frontend works without a backend right now (Demo Mode), so you can deploy just the frontend to Vercel today and share it immediately!

---

## 👤 Author

**Wazir Kazimi**  
Built with ❤️ for India's food safety ecosystem.

---

## 📄 License

MIT — free to use, modify, and distribute.
