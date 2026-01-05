# Deployment Guide

This guide explains how to deploy the Form Builder application so it works properly in production.

## Architecture

The application consists of two parts:
1. **Frontend**: React app (built with Vite)
2. **Backend**: Express.js API server

## How It Works When Deployed

### Current Setup (with Backend)

✅ **Forms are stored on the server** - accessible from any device/browser
✅ **Public links work globally** - anyone with the link can access the form
✅ **Form responses are saved centrally** - all submissions are stored on the server
✅ **Cross-device compatibility** - works on any device, anywhere

### Backend API Endpoints

- `POST /api/forms` - Create or update a form
- `GET /api/forms/:formId` - Get a form by ID
- `GET /api/forms` - Get all forms
- `POST /api/forms/:formId/responses` - Submit a form response
- `GET /api/forms/:formId/responses` - Get form responses

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

In one terminal:
```bash
npm run server
# or for auto-reload:
npm run dev:server
```

The server will run on `http://localhost:3001`

### 3. Start the Frontend

In another terminal:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Set Environment Variable (Optional)

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3001
```

## Production Deployment

### Option 1: Deploy to Vercel/Netlify (Frontend) + Railway/Render (Backend)

#### Frontend Deployment (Vercel)

1. Build the frontend:
```bash
npm run build
```

2. Deploy to Vercel:
   - Connect your GitHub repo to Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend-url.com`

#### Backend Deployment (Railway/Render)

1. **Railway**:
   - Create a new project
   - Connect your GitHub repo
   - Set start command: `npm run server`
   - Set PORT environment variable (Railway provides this automatically)

2. **Render**:
   - Create a new Web Service
   - Connect your GitHub repo
   - Build command: (leave empty)
   - Start command: `npm run server`
   - Set PORT environment variable

3. Update frontend environment variable with your backend URL

### Option 2: Deploy Both to Same Server

1. Build the frontend:
```bash
npm run build
```

2. Serve static files from Express:
   - Update `server/index.js` to serve the `dist` folder
   - Set up reverse proxy (nginx) if needed

3. Deploy to services like:
   - Heroku
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk
   - Google Cloud Run

### Option 3: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "server"]
```

Build and run:
```bash
docker build -t form-builder .
docker run -p 3001:3001 form-builder
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend-api-url.com
```

### Backend
```
PORT=3001
```

## Database Migration (Future)

Currently, the app uses JSON files for storage. For production, consider migrating to:

- **PostgreSQL** - Recommended for production
- **MongoDB** - Good for flexible schemas
- **SQLite** - Simple, file-based database

To migrate, update `server/index.js` to use a database library instead of file operations.

## Important Notes

1. **CORS**: The backend has CORS enabled. In production, restrict it to your frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}))
```

2. **Data Persistence**: The `server/data` directory stores forms and responses. Make sure this directory persists in your deployment (use volumes in Docker, or a database).

3. **Security**: For production, add:
   - Rate limiting
   - Input validation
   - Authentication (if needed)
   - HTTPS/SSL certificates

4. **Scaling**: For high traffic, consider:
   - Using a proper database (PostgreSQL, MongoDB)
   - Adding caching (Redis)
   - Load balancing

## Testing Deployment

1. Create a form in the builder
2. Copy the public link
3. Open the link in an incognito/private window (simulates different user)
4. Fill out and submit the form
5. Verify the response is saved

## Troubleshooting

- **CORS errors**: Make sure backend CORS is configured correctly
- **Forms not saving**: Check backend is running and accessible
- **404 on public links**: Ensure frontend routing is configured for SPA (all routes serve index.html)

