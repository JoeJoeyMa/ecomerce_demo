# ecommerce_demo

A comprehensive e-commerce solution built with Medusa.js, combining three integrated projects to create a complete online shopping experience.

## Project Structure

This demo consists of three main components:

1. **Medusa Backend Server** (`my-medusa-store/`)
   - Core commerce engine and API server
   - Handles business logic, inventory, orders, and payments
   - Built with Medusa.js, providing modular commerce primitives
   - Compatible with versions >= 1.8.0 of `@medusajs/medusa`

2. **Next.js Storefront** (`my-medusa-store-storefront/`)
   - Modern e-commerce frontend built with Next.js 14
   - Features:
     - Product catalog and details
     - Shopping cart and checkout
     - User accounts and order management
     - Search functionality (Algolia/MeiliSearch)
     - Payment integrations (Stripe/PayPal)
   - Leverages latest Next.js features including App Router, Server Components, and Server Actions

3. **Medusa Admin Dashboard** (Accessed via browser)
   - Web-based admin interface for managing your store
   - Control products, orders, inventory, and customers
   - Monitor sales and performance
   - Configure shipping, taxes, and discounts

## Demo Videos

### 1. Store mobile Demo
<video src="./video/1.mp4" controls title="Store Management Demo"></video>

Demonstrates the admin interface and store management capabilities.

### 2. Store desktop Demo
<video src="./video/2.mp4" controls title="Store Management Demo"></video>

Showcases the customer shopping journey from browsing to checkout.

### 3. Features Overview for Medusa.JS  GSAP  frontend
<video src="./video/3.mp4" controls title="Store Management Demo"></video>

A comprehensive overview of all key features and functionalities.

## Getting Started

1. Start the Medusa server:
```bash
cd my-medusa-store
yarn install
medusa develop
```

2. Launch the storefront:
```bash
cd my-medusa-store-storefront
yarn install
yarn dev
```

3. Access the admin dashboard at `http://localhost:9000/app`

## Documentation

- [Medusa Documentation](https://docs.medusajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project Setup Guide](https://docs.medusajs.com/create-medusa-app)

## Features

- **Complete E-commerce Solution**
  - Product management
  - Order processing
  - Customer accounts
  - Inventory tracking
  - Multi-region support

- **Modern Tech Stack**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Server Components
  - Server Actions

- **Payment Integrations**
  - Stripe
  - PayPal

- **Search Capabilities**
  - MeiliSearch
  - Algolia (optional)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
