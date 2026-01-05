# 🚀 Quick Deployment Guide

Follow these steps to deploy your Form Builder app RIGHT NOW!

## Step 1: Prepare Your Code

Make sure all changes are committed to git:

```bash
git add .
git commit -m "Ready for deployment"
git push
```

## Step 2: Deploy Backend to Railway (FREE)

1. **Go to [railway.app](https://railway.app)** and sign up/login (use GitHub)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository: `Form-Public-url`
4. Railway will auto-detect it's a Node.js project
5. Click **"Deploy"** - it will start building automatically
6. Once deployed, click on your service → **"Settings"** → **"Generate Domain"**
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)

**Important:** Railway automatically sets the `PORT` environment variable, so you don't need to add it.

## Step 3: Deploy Frontend to Vercel (FREE)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login (use GitHub)
2. Click **"Add New Project"** → Import your GitHub repository
3. Select repository: `Form-Public-url`
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Add: `VITE_API_URL` = `https://your-railway-url.railway.app` (use your Railway URL from Step 2)
6. Click **"Deploy"**
7. Wait for deployment to complete
8. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

## Step 4: Update Backend CORS

1. Go back to **Railway** → Your project → **Variables**
2. Add environment variable:
   - **Name:** `FRONTEND_URL`
   - **Value:** Your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Railway will automatically restart with the new variable

## Step 5: Test Your Deployment! 🎉

1. Open your Vercel URL in a browser
2. Click "Create New Form"
3. Set up a form with pre-fill values
4. Test the pre-filled link!

## Troubleshooting

- **CORS errors?** Make sure `FRONTEND_URL` is set in Railway
- **API not working?** Check Railway logs (Railway dashboard → Deployments → View Logs)
- **Forms not saving?** Verify `VITE_API_URL` is correct in Vercel

## Alternative: Deploy Both to Render (Easier, Single Platform)

If Railway/Vercel seems complicated, use Render for both:

### Backend on Render:
1. Go to [render.com](https://render.com) → Sign up
2. **New** → **Web Service**
3. Connect GitHub repo
4. Settings:
   - **Name:** `form-builder-backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
   - **Plan:** Free
5. Deploy!

### Frontend on Render:
1. **New** → **Static Site**
2. Connect same GitHub repo
3. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable: `VITE_API_URL` = your backend Render URL
5. Deploy!

---

**Need help?** Check the logs in your deployment platform's dashboard!

