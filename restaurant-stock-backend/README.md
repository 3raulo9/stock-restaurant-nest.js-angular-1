
# Restaurant Stock Management

This project is a simple application to manage a restaurant's stock using Nest.js. The backend uses a mock JSON file as its database.

## Table of Contents

- [Restaurant Stock Management](#restaurant-stock-management)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [JSON Structure](#json-structure)
    - [Get All Products](#get-all-products)
    - [Get a Single Product by ID](#get-a-single-product-by-id)
    - [Update a Product](#update-a-product)
    - [Soft-Delete a Product](#soft-delete-a-product)
    - [Restore a Soft-Deleted Product](#restore-a-soft-deleted-product)
  - [Error Handling](#error-handling)
    - [Product Not Found](#product-not-found)
    - [Product Already Deleted](#product-already-deleted)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd restaurant-stock-management
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

Start the Nest.js application:

```bash
npm run start
```

The application will be running at <http://localhost:3000>.

### JSON Structure

The backend of this application uses a mock JSON file as a database. This structure was chosen for simplicity and ease of implementation during development, especially when working without a real database. The JSON structure is designed as follows:

```json
[
  {
    "id": 1,
    "name": "Product A",
    "quantity": 100,
    "serialNumber": "ABC123",
    "createdAt": "2024-07-01T12:00:00Z",
    "updatedAt": "2024-07-01T12:00:00Z",
    "isDeleted": false
  },
  {
    "id": 2,
    "name": "Product B",
    "quantity": 50,
    "serialNumber": "XYZ789",
    "createdAt": "2024-07-01T12:00:00Z",
    "updatedAt": "2024-07-01T12:00:00Z",
    "isDeleted": false
  }
]


## Endpoints

### Create a Product

- URL: /products
- Method: POST
- Body:

  ```json
  {
    "name": "Tempura",
    "quantity": 50,
    "serialNumber": "TPR50"
  }
  ```

- Response:

  ```json
  {
    "id": 1,
    "name": "Tempura",
    "quantity": 50,
    "serialNumber": "TPR50",
    "createdAt": "2024-07-30T00:00:00.000Z",
    "updatedAt": "2024-07-30T00:00:00.000Z",
    "isDeleted": false
  }
  ```

### Get All Products

- URL: /products
- Method: GET
- Response:

  ```json
  [
    {
      "id": 1,
      "name": "Tempura",
      "quantity": 50,
      "serialNumber": "TPR50",
      "createdAt": "2024-07-30T00:00:00.000Z",
      "updatedAt": "2024-07-30T00:00:00.000Z",
      "isDeleted": false
    }
  ]
  ```

### Get a Single Product by ID

- URL: /products/{id}
- Method: GET
- Response:

  ```json
  {
    "id": 1,
    "name": "Tempura",
    "quantity": 50,
    "serialNumber": "TPR50",
    "createdAt": "2024-07-30T00:00:00.000Z",
    "updatedAt": "2024-07-30T00:00:00.000Z",
    "isDeleted": false
  }
  ```

### Update a Product

- URL: /products/{id}
- Method: PUT
- Body:

  ```json
  {
    "name": "Updated Tempura",
    "quantity": 100,
    "serialNumber": "UTPR100"
  }
  ```

- Response:

  ```json
  {
    "id": 1,
    "name": "Updated Tempura",
    "quantity": 100,
    "serialNumber": "UTPR100",
    "createdAt": "2024-07-30T00:00:00.000Z",
    "updatedAt": "2024-07-30T00:00:00.000Z",
    "isDeleted": false
  }
  ```

### Soft-Delete a Product

- URL: /products/{id}
- Method: DELETE
- Response:

  ```json
  {
    "message": "Product with ID {id} has been deleted"
  }
  ```

### Restore a Soft-Deleted Product

- URL: /products/{id}/restore
- Method: PUT
- Response:

  ```json
  {
    "id": 1,
    "name": "Tempura",
    "quantity": 50,
    "serialNumber": "TPR50",
    "createdAt": "2024-07-30T00:00:00.000Z",
    "updatedAt": "2024-07-30T00:00:00.000Z",
    "isDeleted": false
  }
  ```

## Error Handling

### Product Not Found

- Response:

  ```json
  {
    "statusCode": 404,
    "message": "Product with ID {id} not found",
    "error": "Not Found"
  }
  ```

### Product Already Deleted

- Response:

  ```json
  {
    "statusCode": 400,
    "message": "The product is already deleted",
    "error": "Bad Request"
  }
  ```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
