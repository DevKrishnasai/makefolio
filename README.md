# Makefolio: Portfolio Maker Application

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue) ![Firebase](https://img.shields.io/badge/Firebase-Integration-yellow)

makefolio is a portfolio maker application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Firebase. This application allows users to create and manage their portfolios efficiently and host them globally without any other deployments.

## 📚 Table of Contents

- [🚀 Features](#features)
- [🛠️ Technologies Used](#technologies-used)
- [⚙️ Setup Instructions](#setup-instructions)
- [📝 License](#license)

## 🚀 Features

- **User-friendly Interface**: Create and customize portfolios with an intuitive user interface.
- **Secure Authentication**: Implement secure user authentication.
- **API Endpoints**: Utilize Node.js and Express.js to fetch portfolio data through API endpoints.
- **Database Integration**: Store and manage portfolio data in MongoDB and images in firebase.

## 🛠️ Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Firebase

## ⚙️ Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Firebase project set up

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/DevKrishnasai/makefolio.git
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd makefolio
    ```
3.  **Now open two terminals and Navigate**:
    #### -Frontend
    ```bash
    cd client
    ```
    ```bash
    npm i --legacy-peer-deps
    ```
    ```bash
    npm start
    ```
    #### -Backend
    ```bash
    cd server
    ```
    ```bash
    npm i --legacy-peer-deps
    ```
    ```bash
    npm start
    ```
4.  **Environment Variables:**
    To run the application, you need to set up a `.env` file in the root folder `/server` with the following environment variables:
    **Create a `.env` file in the root folder `/server`:**

         PORT=3000
         MONGO_DB_URL=[Your MongoDB Connection URL]
         API_PATH=/api/version

    **Create a `.env` file in the root folder `/client`:**

         REACT_APP_API_BACKEND_URL=http://localhost:3001/api/v1
         REACT_APP_API_FIREBASE_API_KEY=efef
