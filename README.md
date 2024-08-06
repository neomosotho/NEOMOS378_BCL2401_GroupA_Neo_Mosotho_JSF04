# Vue 3 E-commerce Product Catalog

## Description

This Vue 3 application is an e-commerce product catalog that allows users to browse, filter, and sort products. It features a responsive design, dynamic filtering, and persistent state management for a smooth user experience.

## Features

- Product listing with dynamic grid layout
- Category-based filtering
- Price-based sorting (ascending and descending)
- Search functionality
- Persistent filter state across navigation
- Responsive design for various screen sizes
- Individual product detail pages
- Navigation bar for easy site navigation

## Technologies Used

- Vue 3
- Vue Router
- Pinia (for state management)
- Tailwind CSS (for styling)
- Vite (as build tool)

## Project Structure
src/
├── api/
│   └── index.js
├── components/
│   ├── FilterSort.vue
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   └── ProductGrid.vue
├── router/
│   └── index.js
├── stores/
│   └── softFilter.js
├── views/
│   ├── Home.vue
│   └── ProductDetails.vue
├── App.vue
└── main.js

## Setup and Installation

1. Clone the repository:
https://github.com/neomosotho/NEOMOS378_BCL2401_GroupA_Neo_Mosotho_JSF03.git

2. Install dependencies:
npm create vite@latest . -- --template vue
npm install


3. Run the development server:
npm run dev

## Usage

- Browse products on the home page
- Use the category dropdown to filter products by category
- Use the sort dropdown to sort products by price
- Enter text in the search bar to filter products by title
- Click on a product card to view detailed information

## Components

### FilterSort.vue

A component that provides UI for category selection, price sorting, and product search. It allows users to filter and sort the product catalog efficiently.

### Navbar.vue

The navigation bar component that provides links to different sections of the application, enhancing user navigation and overall user experience.

### ProductCard.vue

Represents an individual product in the grid, displaying key information such as product image, title, price, and rating. It also provides a link to the product details page.

### ProductGrid.vue

Displays the grid of product cards based on the current filters and sorting. It's responsible for laying out the ProductCard components in a responsive grid.

## views

### Home.vue

The main page component that integrates FilterSort, ProductGrid, and other components to create the product catalog page.

### ProductDetails.vue

Displays detailed information about a single product when a user clicks on a product card.

## State Management

The application uses Pinia for state management. The `softFilter.js` store maintains the state of filters and sorting preferences, allowing them to persist across navigation.

## API

The `api/index.js` file contains functions for fetching product data and categories. In a production environment, these would interact with a backend server.

## Styling

The application uses Tailwind CSS for styling, providing a responsive and modern design.

## Future Enhancements

- Implement user authentication
- Add a shopping cart functionality
- Integrate with a backend API
- Implement pagination or infinite scrolling for large product catalogs
- Add product reviews and ratings
- Enhance the Navbar with dropdown menus for categories
- Implement a favorites or wishlist feature

