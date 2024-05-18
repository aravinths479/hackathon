
# Rentify - Where Renting Meets Simplicity

## Overview

Rentify is a platform designed to simplify the rental process by connecting property owners with potential tenants. Owners can list their properties, manage them, and connect with interested buyers. Tenants can browse through available properties, filter based on their requirements, and express interest in properties directly through the platform.


### Links

- **Deployed Application**: [Rentify on Vercel](https://hackathon-presidio.vercel.app/)
- **GitHub Repository**: [Rentify GitHub](https://github.com/aravinths479/hackathon)



## Features

### Buyers

- View all listed properties.
- Filter properties based on various criteria (location, number of bedrooms, etc.).
- Click "I'm Interested" to get the seller's contact details and send an interest email.

### Sellers

- Post new properties with detailed information.
- Perform CRUD operations on their listed properties (Create, Read, Update, Delete).
- View a list of their posted properties.

## Tech Stack

### Frontend

- React.js

### Backend

- Node.js
- Express.js
- MongoDB

### Deployment

- Vercel (Frontend)
- Render (Backend)

### Additional Services

- AWS SES for mailing

## Installation Guide

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB server)
- AWS SES account for email service
- Vercel account for frontend deployment
- Render account for backend deployment

### Environment Variables

#### Frontend (.env file)

```
REACT_APP_DEV_API=http://localhost:4000
```

#### Backend (.env file)

```
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.awx1lkq.mongodb.net/crud
SECRET=your_secret_key
```

Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.

### Local Setup

#### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/aravinths479/hackathon
   cd hackathon/backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:

   ```
   PORT = 4000
   MONGO_URI =
   SECRET =
   ```
4. Start the backend server:

   ```bash
   npm start
   ```

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:

   ```
   REACT_APP_DEV_API=http://localhost:4000
   ```
4. Start the frontend development server:

   ```bash
   npm start
   ```

### Deployment

#### Frontend (Vercel)

1. Sign in to [Vercel](https://vercel.com/).
2. Create a new project and link it to your GitHub repository.
3. Set the environment variable for the production API endpoint:
   ```
   REACT_APP_DEV_API = 
   ```
4. Deploy the project.

#### Backend (Render)

1. Sign in to [Render](https://render.com/).
2. Create a new web service and link it to your GitHub repository.
3. Set the environment variables:
   ```
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.awx1lkq.mongodb.net/crud
   SECRET=your_secret_key
   ```
4. Deploy the service.

### Conclusion

Rentify aims to streamline the rental process, making it easier for both property owners and potential tenants to find suitable matches. This project utilizes the MERN stack to deliver a full-featured application with modern web development practices.
