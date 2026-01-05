# 🔧 Render Deployment Fix

## Issues Found:
1. ✅ Routing not working (404 on form URLs)
2. ⚠️ Need to verify API URL is set correctly

## Fixes Applied:

### 1. Added `_redirects` file for Render static site routing
- Created `public/_redirects` file
- Updated `vite.config.js` to copy it during build

### 2. Next Steps to Fix Your Deployment:

#### For Static Site (Frontend):
1. Go to Render Dashboard → Your Static Site
2. **Settings** → Check:
   - **Root Directory:** `Form-Public-url` (if files are in subdirectory) OR leave empty if at root
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. **Environment Variables:**
   - `VITE_API_URL` = Your backend URL (e.g., `https://your-backend.onrender.com`)
4. **Manual Deploy** → Clear build cache → Deploy

#### For Web Service (Backend):
1. Go to Render Dashboard → Your Web Service  
2. **Settings** → Check:
   - **Root Directory:** `Form-Public-url` (if files are in subdirectory) OR leave empty
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
3. **Environment Variables:**
   - `FRONTEND_URL` = Your frontend static site URL
   - `PORT` = (auto-set by Render)
4. **Manual Deploy** → Clear build cache → Deploy

## After Pushing These Changes:

1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Fix routing for Render deployment"
   git push
   ```

2. **Redeploy in Render:**
   - Both services will auto-deploy, OR
   - Click "Manual Deploy" → "Clear build cache" → "Deploy"

3. **Test:**
   - Visit your frontend URL
   - Create a form
   - Test the form link

## Verify API Connection:

Open browser console (F12) and check:
- If you see CORS errors → Backend `FRONTEND_URL` not set
- If you see 404 on API calls → `VITE_API_URL` incorrect
- If forms load but don't save → Backend not running

---

**The `_redirects` file will fix the 404 routing issues!** 🎯

