# 🚀 START HERE - Deploy Your Form Builder

## Quick Start (5 minutes to deploy!)

### Step 1: Test Locally (2 minutes)

Open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd /Users/kashishshah/Desktop/learn/Form-Public-url
npm install
npm run server
```
You should see: `Server running on http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd /Users/kashishshah/Desktop/learn/Form-Public-url
npm run dev
```
You should see: `Local: http://localhost:5173`

**Test it:**
1. Open http://localhost:5173
2. Click "Create New Form"
3. Set "Type of Customer" pre-fill to "Premium"
4. Click "Create Public Form Link"
5. Copy the "Link with Pre-filled Values"
6. Open it in a new tab
7. ✅ Fields should be pre-filled!

### Step 2: Deploy to Production (3 minutes)

Choose ONE option:

#### 🎯 EASIEST: Render (Both Frontend + Backend)

**Backend:**
1. Go to https://render.com → Sign up
2. Click "New" → "Web Service"
3. Connect GitHub → Select your repo
4. Settings:
   - Name: `form-builder-backend`
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Plan: **Free**
5. Click "Create Web Service"
6. Wait 2 minutes → Copy URL (e.g., `https://xxx.onrender.com`)

**Frontend:**
1. In Render, click "New" → "Static Site"
2. Connect same GitHub repo
3. Settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Environment Variables:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from above
5. Click "Create Static Site"
6. Wait 2 minutes → Copy URL

**Done!** 🎉 Open your frontend URL and test!

---

#### 🚀 ALTERNATIVE: Railway + Vercel

See `DEPLOY_CHECKLIST.md` for detailed steps.

---

## Need Help?

- Check `DEPLOY_CHECKLIST.md` for detailed steps
- Check backend logs in Render/Railway dashboard
- Make sure environment variables are set correctly

## What You'll Get

✅ Public form links that work globally
✅ Pre-filled forms via URL parameters  
✅ Forms stored on server (not just browser)
✅ Ready for email integration later

---

**Ready?** Start with Step 1 above! 🚀

