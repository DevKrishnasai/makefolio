# Makfolio: Portfolio Maker Application

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue) ![Firebase](https://img.shields.io/badge/Firebase-Integration-yellow)

Makfolio is a portfolio maker application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Firebase. This application allows users to create and manage their portfolios efficiently and host them globally without any other deployments.

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

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/DevKrishnasai/makfolio.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd makfolio
   ```
3. **Now open two terminals and Navigate**:
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
4. **Environment Variables:**
      To run the application, you need to set up a `.env` file in the root folder `/server` with the following environment variables:
      **Create a `.env` file in the root folder `/server`:**
   
         MONGO_DB_URL = [Your MongoDB Connection URL]
         API_PATH = /api/version
   
# MIT License

Copyright (c) 2024 Krishna Sai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## License Text

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

   
   
