# ClickCart - MERN E-commerce Web Application

ClickCart is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js), **Tailwind CSS**, **Cloudinary**, **Multer**, **Axios**, **React-Toastify**, **JWT**, **Bcrypt**, **Razorpay**, **Stripe**, and **Validator**. The application features a simple and intuitive user interface, an integrated payment system, and an admin panel for managing products and orders.

## Features:
- **User Features:**
  - Product listing with details and images.
  - Add products to the shopping cart.
  - Checkout with payment integration via **Stripe** and **Razorpay**.
  - User authentication using **JWT** and **Bcrypt** for password hashing.
  - View past orders and order status.

- **Admin Features:**
  - Add new products, update products, and delete products.
  - View the list of all orders.
  - Update order status (e.g., Pending, Shipped, Delivered).
  - Manage payment statuses.

## Tech Stack:
- **Frontend:**
  - React
  - Tailwind CSS
  - React Router
  - React Toastify for notifications
  - Axios for API requests

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT (JSON Web Token) for user authentication
  - Bcrypt for password hashing
  - Multer for file uploads (images)
  - Cloudinary for image storage

- **Payment Integration:**
  - Razorpay
  - Stripe

- **Validation:**
  - Validator package for user input validation

## Prerequisites:
- Node.js and npm
- MongoDB (Cloud or Local Database)
- Stripe and Razorpay accounts for payment integration
- Cloudinary account for storing images

## Setup & Installation:

### **1️⃣ Clone the Repository**
```bash
# Clone the repository
git clone https://github.com/Shahid8389/clickcart.git

# Navigate to the project directory
cd ClickCart
```

### 2️⃣ Backend Setup
1. Navigate to the `backend` folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Set Up Backend Environment Variables:
```bash
MONGODB_URI = "your_mongodb_uri"

CLOUDINARY_NAME = "your_cloudinary_cloud_name"
CLOUDINARY_API_KEY = "your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY = "your_cloudinary_secret_key"

JWT_SECRET="your_jwt_secret_string"

ADMIN_EMAIL="clickcart@gmail.com"
ADMIN_PASSWORD="clickcart"

STRIPE_SECRET_KEY="your_stripe_secret_key"

RAZORPAY_API_KEY="your_razorpay_api_key"
RAZORPAY_SECRET_KEY="your_razorpay_secret_key"
```
4. Start the backend server with Node.js:
```bash
# Make sure your Node.js version is 18.11.0 or higher.
node --watch server.js
```

Or, you can also use **Nodemon** for Automatic Server Restarts.

### 3️⃣ Frontend Setup
1. Navigate to the `frontend` folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Set Up Frontend Environment Variables:
```bash
VITE_BACKEND_URL = "http://localhost:4000"
VITE_RAZORPAY_API_KEY="your_razorpay_api_key"
```
4. Start the React frontend:
```bash
npm run dev
```
5. Open your browser and visit:
```bash
http://localhost:5173
```

### 4️⃣ Admin Panel Setup
1. Navigate to the `admin` folder:
```bash
cd admin
```
2. Install dependencies:
```bash
npm install
```
3. Set Up Frontend Environment Variables:
```bash
VITE_BACKEND_URL = "http://localhost:4000"
```
4. Start the React admin panel:
```bash
npm run dev
```
5. Open your browser and visit:
```bash
http://localhost:5174
```

---

### 📝 Contributing
Contributions are welcome! Follow these steps:

1. Fork or Clone the repository

2. Create a new branch:
```bash
git checkout -b feature-branch
```
3. Make your changes and commit:
```bash
git commit -m "Describe your changes"
```
3. Push to your branch:
```bash
git push origin feature-branch
```
4. Open a Pull Request