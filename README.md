# Fincart E-commerce

A modern e-commerce platform built with React and Vite, featuring product listings with pagination and a shopping cart.

## Features

- Product listing with pagination
- Responsive design
- Cart functionality (coming soon)
- Modern UI with Bootstrap

## Tech Stack

- React 18
- Vite
- React Query
- React Router DOM
- Bootstrap
- Axios
- React Hot Toast

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Cart/
│   ├── Home/
│   ├── Layout/
│   ├── LoadingScreen/
│   └── RecentProducts/
├── Context/
│   └── CartContext.jsx
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## API

The project uses the Platzi Fake Store API (https://api.escuelajs.co) for product data.

## Deployment

To deploy this project:

1. Build the project:
   ```bash
   npm run build
   ```
2. The build output will be in the `dist` directory
3. Deploy the contents of `dist` to your hosting provider 