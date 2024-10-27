<h1 align="center">
  <a href="https://github.com/JoeJoeyMa/ecomerce_demo"><img src="https://github.com/user-attachments/assets/38ba3a7b-e07b-4117-8187-7b171eae3769" alt="Ecommerce Demo" width="80" height="80"></a>
  <br>
  <br>
  Ecommerce Demo
  <br>
</h1>

<p align="center">A comprehensive e-commerce solution built with <a href="https://medusajs.com/" target="_blank">Medusa.js</a>, combining three integrated projects</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>



<p align="center">
  <video src="https://github.com/JoeJoeyMa/ecomerce_demo/raw/main/video/1.mp4" 
         controls="controls" 
         muted="muted" 
         playsinline="playsinline"
         width="100%"
         style="max-width: 720px;">
  </video>
</p>
<p align="center">
  <video src="https://github.com/JoeJoeyMa/ecomerce_demo/raw/main/video/2.mp4" 
         controls="controls" 
         muted="muted" 
         playsinline="playsinline"
         width="100%"
         style="max-width: 720px;">
  </video>
</p>
<p align="center">
  <video src="https://github.com/JoeJoeyMa/ecomerce_demo/raw/main/video/3.mp4" 
         controls="controls" 
         muted="muted" 
         playsinline="playsinline"
         width="100%"
         style="max-width: 720px;">
  </video>
</p>

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


Demonstrates the admin interface and store management capabilities.

### 2. Store desktop Demo


Showcases the customer shopping journey from browsing to checkout.

### 3. Features Overview for Medusa.JS GSAP frontend


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
