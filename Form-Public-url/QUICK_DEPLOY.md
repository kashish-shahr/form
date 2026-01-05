# Quick Deployment Guide

Follow these steps to deploy your Form Builder app:

## Option 1: Deploy to Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will auto-detect the project
5. Add environment variable:
   - `PORT` (Railway sets this automatically)
6. Click "Deploy"
7. Once deployed, copy your Railway URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project" → Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app.railway.app`)
5. Click "Deploy"
6. Once deployed, update your frontend code's API URL if needed

### Step 3: Update Backend CORS (Important!)

After getting your Vercel frontend URL, update the backend CORS:

1. In Railway, go to your project → Variables
2. Add: `FRONTEND_URL` = your Vercel URL
3. Update `server/index.js` to use this variable for CORS origin

Or manually edit `server/index.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}))
```

## Option 2: Deploy Both to Render (Easier, Single Platform)

### Backend Deployment

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `form-builder-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: Free
5. Add Environment Variable:
   - `PORT` (Render sets this automatically)
6. Click "Create Web Service"
7. Copy your Render URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment

1. In Render, click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `form-builder-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = your backend Render URL
5. Click "Create Static Site"

## Option 3: Deploy Everything to Vercel (Serverless Functions)

This requires converting the Express server to Vercel serverless functions. See DEPLOYMENT.md for details.

## Testing After Deployment

1. **Create a form**:
   - Go to your deployed frontend URL
   - Click "Create New Form"
   - Configure fields and click "Create Public Form Link"

2. **Test pre-filled forms**:
   - Use the "Pre-fill Options" section
   - Set "Type of Customer" to "Premium"
   - Copy the parameterized link
   - Open it in a new tab/incognito window
   - Verify fields are pre-filled

3. **Test form submission**:
   - Fill out the form
   - Submit it
   - Verify success message appears

## Troubleshooting

- **CORS errors**: Make sure backend CORS includes your frontend URL
- **404 on forms**: Check that frontend routing is configured (vercel.json handles this)
- **API not working**: Verify `VITE_API_URL` environment variable is set correctly
- **Forms not saving**: Check backend logs in Railway/Render dashboard

## Quick Local Test

Before deploying, test locally:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

Visit `http://localhost:5173` and test the pre-fill feature!

