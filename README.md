# Car Wash Booking Service

A comprehensive car wash booking service that allows users to book services online, manage their bookings through a secure dashboard, and process payments using AmarPay. The service is built using modern technologies such as React, TypeScript, Redux, NextUI, Tailwind CSS, Node.js, Express, MongoDB, and Cloudinary for image hosting.

## Live URL

You can access the live version of the application [here](https://car-wash-pearl.vercel.app).

## Table of Contents

- [Introduction](#introduction)
- [Project Description](#project-description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation Guidelines](#installation-guidelines)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to the Car Wash Booking Service! This platform allows users to easily book car wash services online, manage their appointments, and make secure payments. Whether you are a user looking to keep your car clean or an admin managing the services, this platform provides a seamless experience.

## Project Description

This project is a full-fledged car wash booking service with the following key functionalities:

- **User Authentication**: Secure login and registration for users and admins.
- **Service Booking**: Users can book service slots for their vehicles.
- **Payment Integration**: Integration with AmarPay for secure online payments.
- **Admin Dashboard**: Admins can manage bookings, view user data, and update services.
- **Image Hosting**: Cloudinary is used for efficient image hosting.
- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices.
- **Visit The Website**: You can access the live version of the application [here](https://car-wash-pearl.vercel.app/).

## Features

- **User Roles**: Supports both user and admin roles.
- **Secure Dashboard**: Users can manage their bookings and view their service history.
- **Booking System**: Users can select a service slot and confirm their booking.
- **Payment Processing**: Payments are handled securely through AmarPay.
- **Admin Management**: Admins have a dedicated dashboard to manage all operations.
- **Service Management**: Admins have a dedicated dashboard to manage all service and slots operations.
- **User Management**: User have a dedicated dashboard to manage all operations.
- **Image Hosting**: Images are uploaded and served via Cloudinary.

## Technology Stack

- **Frontend**:
  - React
  - TypeScript
  - Redux
  - NextUI
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB)
  - TypeScript
  - Modular Pattern
- **Payment Integration**: AmarPay
- **Image Hosting**: Cloudinary
- **Deployment**: Vercel

## Installation Guidelines

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Md-Rijwan-Jannat/Car-Wash-Booking-System-Frontend.git
   cd Car-Wash-Booking-System-Frontend
   Public

   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:

   ```env
   VITE_WORKSPACE=development
   VITE_BASE_URL=http://localhost:5000/api
   VITE_LIVE_URL=https://car-wash-booking-service.vercel.app/api
   VITE_CLOUDINARY_UPLOAD_PRESET=car-wash
   VITE_CLOUDINARY_NAME=dihqveqyc
   VITE_AMARPAY_API_KEY=your_amarpay_api_key
   VITE_JWT_SECRET=your_jwt_secret
   ```

4. **Run the Development Server**:

   ```bash
   yarn dev
   ```

5. **Build the Project**:

   ```bash
   yarn build
   ```

6. **Run the Backend Server**:
   ```bash
   yarn start:dev
   ```

## Usage

- **User Dashboard**: Access your bookings, make new bookings, and manage your account.
- **Admin Dashboard**: Manage all user bookings, update services, and monitor system operations.

## Contributing

We welcome contributions! Please read our [contributing guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Maintainer**: [Md Rijwan Jannat](rijwanjannat36@gmail.com)

For more information, visit our backend gitHub [website](https://github.com/Md-Rijwan-Jannat/Car-Wash-Booking-System-Backend--API).
FrontEnd live link [website](https://car-wash-pearl.vercel.app/).
BackEnd live link [website](https://car-wash-booking-service.vercel.app/)/api.

## Acknowledgements

- Special thanks to [Md Rijwan Jannat](https://github.com/Md-Rijwan-Jannat) for their contributions.
- This project is powered by [React](https://reactjs.org), [Node.js](https://nodejs.org), and [AmarPay](https://amarpay.com).

## FAQ

- **How do I book a service?**
  - Navigate to the booking section, select your desired service and time slot, and proceed to payment.
- **How can I manage my bookings?**
  - Log in to your user dashboard to view and manage your bookings.
- **Is payment secure?**
  - Yes, all payments are processed securely through AmarPay.
