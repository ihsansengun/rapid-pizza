# React Food Ordering Application

## Overview

This is a modern food ordering application built with React and Redux. Users can browse a menu, add items to their cart, place orders, and modify existing orders.

## Features

- **Menu Browsing**: View all available food items with details
- **Shopping Cart**: Add and remove items, adjust quantities
- **Order Creation**: Submit orders with delivery information
- **Order Management**: View and update existing orders
- **Client-side Form Validation**: Ensures correct information is submitted

## Tech Stack

- **React 19.0.0**: UI component library
- **React Router 6.30.0**: For navigation and routing
- **Redux (Redux Toolkit 2.7.0)**: State management
- **TailwindCSS 4.1.4**: Styling
- **Vite 6.3.1**: Build tool and development server
- **ESLint 9.22.0**: Code linting

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm package manager

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173

#
## Application Flow

1. Users browse the menu and add items to cart
2. Cart displays selected items with the ability to modify quantities
3. Users can proceed to checkout by creating an order
4. After submitting an order, users can view and update their order details

## API Integration

The application connects to a backend API for:
- Fetching menu items
- Creating new orders
- Retrieving order details
- Updating existing orders

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

