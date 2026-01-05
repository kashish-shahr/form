# ✅ Deployment Checklist

## Pre-Deployment Steps

### 1. Test Locally First
```bash
# Terminal 1 - Start Backend
npm install
npm run server

# Terminal 2 - Start Frontend  
npm run dev
```

Visit `http://localhost:5173` and test:
- ✅ Create a form
- ✅ Set pre-fill values
- ✅ Copy pre-filled link
- ✅ Open link in new tab - verify fields are pre-filled
- ✅ Submit form

### 2. Commit Your Code
```bash
git add .
git commit -m "Ready for deployment with pre-fill feature"
git push origin main
```

## Deployment Options

### 🚀 Option A: Railway (Backend) + Vercel (Frontend) - RECOMMENDED

#### Backend on Railway:
1. Visit: https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Railway auto-detects Node.js
6. Click Deploy
7. Settings → Generate Domain
8. Copy URL: `https://your-app.railway.app`

#### Frontend on Vercel:
1. Visit: https://vercel.com
2. Sign up with GitHub
3. Add New Project → Import repo
4. Configure:
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
5. Environment Variables:
   - `VITE_API_URL` = `https://your-app.railway.app`
6. Deploy
7. Copy URL: `https://your-app.vercel.app`

#### Update CORS:
1. Railway → Variables
2. Add: `FRONTEND_URL` = `https://your-app.vercel.app`
3. Service restarts automatically

### 🚀 Option B: Render (Both) - EASIER

#### Backend:
1. Visit: https://render.com
2. Sign up
3. New → Web Service
4. Connect GitHub repo
5. Settings:
   - Name: `form-builder-backend`
   - Build: `npm install`
   - Start: `npm run server`
   - Plan: Free
6. Deploy
7. Copy URL: `https://your-app.onrender.com`

#### Frontend:
1. New → Static Site
2. Connect same repo
3. Settings:
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Environment Variable:
   - `VITE_API_URL` = `https://your-app.onrender.com`
5. Deploy

## Post-Deployment Testing

1. ✅ Open your deployed frontend URL
2. ✅ Create a new form
3. ✅ Set pre-fill values (e.g., Customer Type = "Premium")
4. ✅ Copy the pre-filled link
5. ✅ Open link in incognito/private window
6. ✅ Verify fields are pre-filled
7. ✅ Submit form
8. ✅ Verify success message

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Set `FRONTEND_URL` in backend env vars |
| 404 on forms | Check Vercel routing (vercel.json handles this) |
| API not working | Verify `VITE_API_URL` is correct |
| Forms not saving | Check backend logs in Railway/Render |

## Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com

---

**Ready?** Follow Option A or B above! 🚀

