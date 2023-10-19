# Shipment Management Application

Welcome to the Shipment Management Application! This web-based tool allows you to view, edit, and manage shipment details with ease. Built using React, Redux, Chakra UI, and React Router, this application streamlines the management of shipments.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Components](#components)
    - [ShipmentDetails](#shipmentdetails)
    - [FormInput](#forminput)
    - [ShipmentTable](#shipmenttable)
    - [ShipmentItem](#shipmentitem)
    - [ErrorAlert](#erroralert)
5. [Redux State Management](#redux-state-management)
6. [Routing](#routing)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

The Shipment Management Application is a user-friendly web tool designed for the efficient management of shipment data. Whether you need to update shipment details, view an overview of your shipments, or remove outdated entries, this application has you covered.

## Features

- **Shipment Details**: View and edit detailed information about a single shipment. Easily manage data changes and see loading/error states for shipment details.

- **Reusable Form Inputs**: The `FormInput` component provides a flexible solution for rendering form input fields. It supports both text inputs and select inputs, complete with validation and error messaging.

- **Shipment Table**: A user-friendly table displays your shipments with columns for order number, date, customer, tracking number, status, and consignee. You can quickly assess your shipments' details and status.

- **Shipment Item**: Each row in the shipment table represents a single shipment. You can use the options provided to edit or delete a shipment as needed.

- **Error Alert**: The `ErrorAlert` component is available to handle and display error messages within the application.

## Getting Started

To start using the Shipment Management Application, follow these steps:

1. **Installation**: Install the necessary dependencies by running `npm install` or `yarn install`.

2. **Launch the Application**: Start the development server using `npm start` or `yarn start`.

3. **Access the Application**: Open your web browser and access the application.

4. **Manage Shipments**: View the list of shipments in the table on the root route (`/`). Click on a shipment to view and edit its details in the `ShipmentDetails` component.

5. **Make Changes**: You can make edits, save changes, or remove shipments as needed.

Please ensure that you have the correct import statements and configurations in your code, especially for React Router and Redux. Fix any import or usage issues before running the application.

## Components

The Shipment Management Application is built around the following components:

### ShipmentDetails

- **Description**: Displays detailed information about a single shipment.
- **Functionality**:
  - Allows users to edit and save changes to shipment details.
  - Handles loading and error states for shipment data.
- **Usage**: Accessed through the route `/details/:orderNo`.

### FormInput

- **Description**: A reusable component for rendering form input fields.
- **Functionality**:
  - Supports both text inputs and select inputs.
  - Handles validation and error messages.
- **Usage**: Used within the `ShipmentDetails` component.

### ShipmentTable

- **Description**: Displays a table of shipments.
- **Functionality**:
  - Shows columns for order number, date, customer, tracking number, status, and consignee.
  - Handles loading and error states for shipment data.
- **Usage**: Accessed through the route `/`.

### ShipmentItem

- **Description**: Represents a single row in the shipment table.
- **Functionality**:
  - Provides options to edit and delete a shipment.
- **Usage**: Used within the `ShipmentTable` component.

### ErrorAlert

- **Description**: Handles and displays error messages within the application.
- **Functionality**:
  - Displays error messages with a user-friendly alert design.
- **Usage**: Used to notify users of errors or issues within the application.

## Redux State Management

- The application uses Redux for state management.
- Redux actions and reducers are defined in the `store` directory.
- The primary state includes `shipments`, `selectedShipment`, `dataStatus`, and `error`.
- Async data fetching is managed using `createAsyncThunk` for fetching shipment data.

## Routing

- React Router is used for defining routes and navigation in the application.
- Two main routes are defined:
  1. `/`: Displays the `ShipmentTable` component.
  2. `/details/:orderNo`: Displays the `ShipmentDetails` component for a specific shipment.
- React Router is configured using `createBrowserRouter`.

## Contributing

We welcome contributions from the open-source community. If you'd like to contribute to this project, please refer to our [Contributing Guidelines](CONTRIBUTING.md) for detailed instructions on how to get started.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as permitted by the license terms.

Thank you for using the Shipment Management Application!
