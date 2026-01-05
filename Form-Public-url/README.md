# Form Builder - Create Public Forms

A React application that allows you to create custom forms and generate public links for users to fill them out, similar to Google Forms.

## Features

- **Form Builder**: Create forms with customizable fields
- **Field Management**: Enable/disable fields (e.g., deselect age field)
- **Public Links**: Generate shareable public links for your forms
- **Multiple Field Types**: Support for text, email, number, textarea, and select fields
- **Form Responses**: Store form submissions on the server
- **Backend API**: Express.js server for data persistence

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

The application requires both frontend and backend to run:

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```
The backend will run on `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

> **Note**: Both servers need to be running for the app to work properly. The frontend communicates with the backend API to store forms and responses.

## How to Use

1. **Create a Form**:
   - Click "Create New Form" on the home page
   - Customize the form title and description
   - Toggle fields on/off using the checkboxes
   - Click "Create Public Form Link" to generate your form

2. **Share Your Form**:
   - Copy the generated public link
   - Share it with anyone who needs to fill out the form
   - The link is accessible to anyone with the URL

3. **Fill Out Forms**:
   - Open the public form link
   - Fill in the enabled fields
   - Submit the form

## Default Form Fields

The app comes with a pre-configured customer feedback form with:
- Name (text)
- Email (email)
- Message (textarea)
- Type of Customer (select: New, Returning, VIP)
- Age (number) - can be disabled

## Technology Stack

- **Frontend**: React 18, React Router DOM, Vite
- **Backend**: Express.js, Node.js
- **Storage**: JSON files (easily migratable to database)

## Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment

For production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## How It Works When Deployed

When deployed, the app works as follows:

1. **Forms are stored on the server** - Forms created by you are saved on the backend server
2. **Public links work globally** - Anyone with the link can access and fill out your form from any device
3. **Responses are saved centrally** - All form submissions are stored on the server
4. **Cross-device compatibility** - Works on any device, browser, or location

The backend API handles all data operations, making the app truly public and accessible.

