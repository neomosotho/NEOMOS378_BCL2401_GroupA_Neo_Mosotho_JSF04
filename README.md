### Vue 3 E-commerce Product Catalog
# Description
This Vue 3 application is an e-commerce product catalog that allows users to browse, filter, sort products, manage a wishlist, and compare products. It also features a shopping cart, user authentication, and a responsive design for a smooth and engaging user experience.

# Features
Product listing with dynamic grid layout
Category-based filtering
Price-based sorting (ascending and descending)
Search functionality
Persistent filter state across navigation
Responsive design for various screen sizes
Individual product detail pages
Comparison list with side-by-side product comparison
Wishlist functionality with local storage synchronization
Shopping cart with persistent state
User authentication (login/logout functionality)
Dark and light mode theme toggle

# Technologies Used

Pinia (for state management)
Tailwind CSS (for styling)
Vite (as build tool)
Font Awesome (for icons)

# Project Structure

src/
├── api/
│   └── index.js
├── components/
│   ├── FilterSort.vue
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   ├── ProductGrid.vue
│   └── ThemeToggle.vue
├── router/
│   └── index.js
├── stores/
│   ├── cartStore.js
│   ├── comparisonStore.js
│   ├── softFilter.js
│   └── wishlistStore.js
├── views/
│   ├── Comparison.vue
│   ├── Home.vue
│   ├── Login.vue
│   ├── ProductDetails.vue
│   └── Wishlist.vue
├── App.vue
└── main.js

## Setup and Installation
# Clone the repository:
git clone https://github.com/neomosotho/NEOMOS378_BCL2401_GroupA_Neo_Mosotho_JSF04.git

# Install dependencies:
npm create vite@latest . -- --template vue
npm install

# Run the development server:
npm run dev

# Usage
Browse products on the home page.
Use the category dropdown to filter products by category.
Use the sort dropdown to sort products by price.
Enter text in the search bar to filter products by title.
Click on a product card to view detailed information.
Add products to the comparison list for side-by-side comparison.
Add products to the wishlist to save for later.
Add products to the shopping cart for purchase.
Log in to access the wishlist, comparison list, and shopping cart.
Toggle between dark and light modes for a personalized experience.
Components
FilterSort.vue
A component that provides UI for category selection, price sorting, and product search. It allows users to filter and sort the product catalog efficiently.

# Navbar.vue
The navigation bar component provides links to different sections of the application, including wishlist, comparison list, and shopping cart. It also includes login/logout functionality and a theme toggle switch.

# ProductCard.vue
Represents an individual product in the grid, displaying key information such as product image, title, price, and rating. It also provides a link to the product details page.

# ProductGrid.vue
Displays the grid of product cards based on the current filters and sorting. It's responsible for laying out the ProductCard components in a responsive grid.

# ThemeToggle.vue
A component that allows users to switch between dark and light modes, applying the selected theme across the entire application.

## Views
# Home.vue
The main page component that integrates FilterSort, ProductGrid, and other components to create the product catalog page.

# ProductDetails.vue
Displays detailed information about a single product when a user clicks on a product card.

# Comparison.vue
Enables users to compare selected products side-by-side, showing specifications like price, category, description, and ratings.

# Wishlist.vue
Displays products that the user has added to their wishlist, allowing them to manage and review their favorite items.

# Login.vue
Handles user authentication, enabling users to log in and access personalized features such as the wishlist, comparison list, and shopping cart.

# State Management
The application uses Pinia for state management. Various stores manage the state for filters, sorting preferences, the shopping cart, comparison list, and wishlist, allowing them to persist across navigation and sessions.

# API
The api/index.js file contains functions for fetching product data and categories. In a production environment, these would interact with a backend server.

# Styling
The application uses Tailwind CSS for styling, providing a responsive and modern design.

## Future Enhancements
Implement user profile management
Integrate with a backend API for persistent data storage
Implement pagination or infinite scrolling for large product catalogs
Add product reviews and ratings
Enhance the Navbar with dropdown menus for categories
Improve accessibility with ARIA attributes and keyboard navigation
Implement a checkout and payment process

## Challenges

## Presentation:
https://youtu.be/UK2o0YmcRWY
