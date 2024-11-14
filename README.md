# E-Commerce Website

## Description

This repository contains the code for a full-stack e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. The website allows users to browse products, add them to their cart, and make purchases. It also includes admin functionalities for managing products and orders.

## Features

- **User Authentication**: Sign up, log in, and manage user profiles.
- **Product Management**: Browse, search, and filter products.
- **Shopping Cart**: Add products to the cart, view the cart, and update quantities.
- **Checkout Process**: Complete the purchase process with order summary and payment integration.
- **Admin Dashboard**: Manage products, categories, and orders.
- **Responsive Design**: Mobile-friendly user interface.

## Technologies Used

- **Frontend**:
  - React: For building the user interface.
  - Redux: For state management.
  - React Router: For client-side routing.
  - Axios: For making HTTP requests.
  - Bootstrap/Material-UI: For responsive and styled components.

- **Backend**:
  - Node.js: For the server-side runtime environment.
  - Express: For building the RESTful API.
  - MongoDB: For the NoSQL database.
  - Mongoose: For object data modeling (ODM).

- **Authentication**:
  - JSON Web Tokens (JWT): For secure authentication.
  - Bcrypt: For password hashing.

- **Payment Integration**:
  - Braintree: For processing payments.

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/gaurav01singh/Ecommerce-website.git
    cd Ecommerce-Website
    ```

2. **Install dependencies**:

    ```sh
    # Install backend dependencies
    npm install

    # Install frontend dependencies
    cd client
    npm install
    ```

3. **Environment Variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT = 8080
MONGO_URL = 
JWT_SECRET = 
BRAINTREE_MERCHANT_ID =
BRAINTREE_PUBLIC_KEY = 
BRAINTREE_PRIVATE_KEY = 
    ```

4. **Run the application**:

    ```sh
    # Run backend
    npm run server

    # Run frontend
    cd client
    npm start
    ```

## Usage

- Navigate to `http://localhost:3000` to view the application.
- Use the admin panel to manage products and orders.

## Contributing

Feel free to fork this repository and contribute by submitting pull requests. Please ensure that your code adheres to the project's coding standards.
