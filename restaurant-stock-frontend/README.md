# RestaurantStockFrontend

This project is an Angular application designed for managing restaurant stock. It includes features such as CRUD operations on products, a dynamic data table, and user-friendly interfaces using Angular Material.

## Getting Started

### Prerequisites

Ensure that you have the following installed on your machine:

- Node.js and npm
- Angular CLI

### Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd restaurant-stock-frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project Structure

- `src/app/app.component.html`: Main template for the application.
- `src/app/product-table/product-table.component.html`: Template for the product table component.
- `src/app/product.service.ts`: Service to handle HTTP requests for product data.
- `src/app/product-dialog/product-dialog.component.html`: Template for the product dialog component used for adding or editing products.
- `src/app/app.module.ts`: Main module where all components and services are declared.

## Features

- **Dynamic Data Table**: Displays products with sorting and filtering capabilities.
- **CRUD Operations**: Allows users to add, edit, and delete products from the UI.
- **Angular Material**: Utilizes Angular Material components for a modern and responsive UI.
- **Responsive Design**: Adjusts layout based on screen size for better user experience.
