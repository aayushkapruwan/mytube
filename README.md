# MyTube Backend

A robust backend API for a video-sharing platform built with Node.js, Express, and MongoDB. This project provides comprehensive functionality for user management, video uploads, subscriptions, likes, comments, playlists, and more.

## Features

- **User Authentication & Authorization**: Secure JWT-based authentication with bcrypt password hashing
- **Video Management**: Upload, stream, and manage videos with Cloudinary integration
- **User Interactions**: Like, comment, and subscribe functionality
- **Playlists**: Create and manage user playlists
- **Dashboard**: Analytics and user dashboard features
- **File Uploads**: Multer middleware for handling file uploads
- **CORS Support**: Configurable CORS for frontend integration
- **Health Checks**: API health monitoring endpoints

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Password Hashing**: bcrypt
- **Development**: Nodemon for hot reloading, Prettier for code formatting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aayushkapruwan/bawa-backend.git
   cd mytube
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:3000
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:8000` (or the port specified in your `.env`).

## Usage

### API Endpoints

The API is organized into the following main routes:

- **User Routes** (`/api/v1/user`):
  - `POST /register` - Register a new user
  - `POST /login` - User login
  - `POST /logout` - User logout
  - `POST /refresh-token` - Refresh access token
  - `GET /current-user` - Get current user details
  - `PATCH /update-account` - Update user account
  - `PATCH /update-avatar` - Update user avatar
  - `PATCH /update-cover-image` - Update cover image
  - `GET /c/:username` - Get user channel profile
  - `GET /watch-history` - Get user watch history

- **Video Routes** (`/api/v1/video`):
  - `POST /upload` - Upload a new video
  - `GET /` - Get all videos
  - `GET /:videoId` - Get video by ID
  - `PATCH /:videoId` - Update video details
  - `DELETE /:videoId` - Delete video

- **Subscription Routes** (`/api/v1/subscriber`):
  - `POST /c/:channelId` - Toggle subscription to a channel
  - `GET /u/:subscriberId` - Get subscribed channels
  - `GET /c/:channelId` - Get channel subscribers

Additional routes exist for comments, likes, playlists, tweets, and dashboard functionality.

### Health Check

- `GET /api/v1/healthcheck` - Check API health status

## Project Structure

```
src/
├── app.js                 # Express app configuration
├── index.js               # Server entry point
├── constants.js           # Application constants
├── controllers/           # Route controllers
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   ├── dashboard.controller.js
│   └── healthcheck.controller.js
├── db/
│   └── index.js           # Database connection
├── middlewares/           # Custom middlewares
│   ├── auth.middleware.js
│   └── multer.middleware.js
├── models/                # Mongoose models
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── subscription.model.js
│   └── tweet.model.js
├── routes/                # API routes
│   ├── user.router.js
│   ├── subscriber.router.js
│   └── video.route.js
└── utils/                 # Utility functions
    ├── apierror.js
    ├── apiresponse.js
    ├── asynchandler.js
    └── cloudinary.js
```

## Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Aayush Kapruwan**

- GitHub: [@aayushkapruwan](https://github.com/aayushkapruwan)
- Repository: [bawa-backend](https://github.com/aayushkapruwan/bawa-backend)
