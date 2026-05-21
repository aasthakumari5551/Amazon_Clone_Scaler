# Amazon Clone — Full-Stack Execution Plan
**Role:** Senior Full-Stack Engineer  
**Stack:** Next.js · Node.js + Express · PostgreSQL · Prisma · Zustand · shadcn/ui · Tailwind · JWT  
**Timeline:** 2 days (48 hours)  
**Scope:** Core Features + Auth + Order History

---

## Table of Contents

1. [Project Philosophy](#1-project-philosophy)
2. [Full Repository Structure](#2-full-repository-structure)
3. [Phase 0 — Setup & Scaffolding (Hour 0–3)](#3-phase-0--setup--scaffolding-hour-03)
4. [Phase 1 — Database Design & Prisma Schema (Hour 3–6)](#4-phase-1--database-design--prisma-schema-hour-36)
5. [Phase 2 — Backend Core (Hour 6–16)](#5-phase-2--backend-core-hour-616)
6. [Phase 3 — Frontend Core (Hour 16–30)](#6-phase-3--frontend-core-hour-1630)
7. [Phase 4 — Auth Layer (Hour 30–36)](#7-phase-4--auth-layer-hour-3036)
8. [Phase 5 — Order History (Hour 36–40)](#8-phase-5--order-history-hour-3640)
9. [Phase 6 — Seed, Polish & QA (Hour 40–46)](#9-phase-6--seed-polish--qa-hour-4046)
10. [Phase 7 — README & Submission (Hour 46–48)](#10-phase-7--readme--submission-hour-4648)
11. [API Contract Reference](#11-api-contract-reference)
12. [Database Schema Overview](#12-database-schema-overview)
13. [Environment Variables Reference](#13-environment-variables-reference)

---

## 1. Project Philosophy

- **Monorepo** with two workspaces: `client/` and `server/`
- Backend is **pure REST** — no GraphQL complexity
- Frontend is **Next.js App Router** — file-based routing, server components where applicable
- Every backend domain follows **Controller → Service → Repository** layering — no business logic leaks into routes
- **DTOs** (Data Transfer Objects) live in `shared/` so both sides agree on shape
- Auth is **JWT in HttpOnly cookies** — no localStorage, no refresh tokens
- Zustand stores are **slice-based** — one file per domain
- shadcn/ui provides base components; custom wrappers live in `components/ui/`

---

## 2. Full Repository Structure

```
amazon-clone/
│
├── client/                          # Next.js frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx           # Navbar + Footer shell
│   │   │   ├── page.tsx             # Home / Product listing
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   ├── order-confirmation/
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx
│   │   │   └── orders/
│   │   │       └── page.tsx         # Order history
│   │   ├── layout.tsx               # Root layout (fonts, providers)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui base primitives (auto-generated)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavbarSearch.tsx
│   │   │   ├── NavbarCart.tsx
│   │   │   ├── NavbarUser.tsx
│   │   │   ├── CategoryBar.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductImageCarousel.tsx
│   │   │   ├── ProductDetailInfo.tsx
│   │   │   ├── ProductSpecifications.tsx
│   │   │   └── ProductBadge.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartEmptyState.tsx
│   │   ├── checkout/
│   │   │   ├── AddressForm.tsx
│   │   │   └── OrderReviewPanel.tsx
│   │   ├── orders/
│   │   │   ├── OrderCard.tsx
│   │   │   └── OrderItemRow.tsx
│   │   └── shared/
│   │       ├── StarRating.tsx
│   │       ├── PriceTag.tsx
│   │       ├── StockBadge.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBanner.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── store/                       # Zustand slices
│   │   ├── useCartStore.ts
│   │   ├── useAuthStore.ts
│   │   └── useProductStore.ts
│   │
│   ├── services/                    # API call layer (fetch wrappers)
│   │   ├── api.ts                   # Base fetch client (interceptors, base URL)
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   ├── cartService.ts
│   │   └── orderService.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useProducts.ts
│   │   ├── useProductDetail.ts
│   │   ├── useCart.ts
│   │   ├── useOrders.ts
│   │   └── useAuth.ts
│   │
│   ├── types/                       # Shared TypeScript types (mirroring DTOs)
│   │   ├── product.types.ts
│   │   ├── cart.types.ts
│   │   ├── order.types.ts
│   │   └── auth.types.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn(), formatCurrency(), etc.
│   │   ├── constants.ts             # API_BASE_URL, CATEGORIES list, etc.
│   │   └── validators.ts            # Zod schemas for forms
│   │
│   ├── middleware.ts                # Next.js edge middleware (auth guard)
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                # Prisma client singleton
│   │   │   ├── env.ts               # Validated env (zod)
│   │   │   └── corsOptions.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.router.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.repository.ts
│   │   │   │   └── auth.dto.ts
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── product.router.ts
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── product.repository.ts
│   │   │   │   └── product.dto.ts
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── cart.router.ts
│   │   │   │   ├── cart.controller.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── cart.repository.ts
│   │   │   │   └── cart.dto.ts
│   │   │   │
│   │   │   └── orders/
│   │   │       ├── order.router.ts
│   │   │       ├── order.controller.ts
│   │   │       ├── order.service.ts
│   │   │       ├── order.repository.ts
│   │   │       └── order.dto.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authenticate.ts      # JWT verification middleware
│   │   │   ├── errorHandler.ts      # Global error handler
│   │   │   ├── notFound.ts          # 404 catcher
│   │   │   └── validate.ts          # Zod request body validator
│   │   │
│   │   ├── utils/
│   │   │   ├── AppError.ts          # Custom error class
│   │   │   ├── asyncWrapper.ts      # try/catch wrapper for controllers
│   │   │   ├── jwt.ts               # Sign / verify helpers
│   │   │   └── password.ts          # bcrypt hash / compare helpers
│   │   │
│   │   └── app.ts                   # Express app assembly
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts                  # Seed script
│   │
│   ├── server.ts                    # Entry point (listen)
│   ├── tsconfig.json
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 3. Phase 0 — Setup & Scaffolding (Hour 0–3)

### 3.1 — Repository Initialization
- Create GitHub public repo: `amazon-clone`
- Init monorepo root with a `package.json` using `workspaces: ["client", "server"]`
- Add `.gitignore` covering `node_modules`, `.env`, `.next`, `dist`
- Add `.env.example` with all required keys (no values)

### 3.2 — Backend Scaffold
- Init `server/` as a TypeScript Express project
- Install core dependencies: `express`, `cors`, `cookie-parser`, `helmet`, `morgan`
- Install Prisma, `@prisma/client`, `zod`, `bcryptjs`, `jsonwebtoken`
- Install dev: `ts-node-dev`, `typescript`, `@types/*`
- Configure `tsconfig.json` — strict mode, path aliases (`@/` → `src/`)
- Wire up `app.ts`: middleware stack, route registration, error handler at the end
- Wire up `server.ts`: call `app.listen()`, log port

### 3.3 — Frontend Scaffold
- Init `client/` with `create-next-app` — TypeScript, App Router, Tailwind
- Install shadcn/ui: run `npx shadcn-ui@latest init`
- Add shadcn components immediately needed: `Button`, `Input`, `Badge`, `Card`, `Sheet`, `Dialog`, `Separator`, `Skeleton`, `Toast`
- Install Zustand, `react-hook-form`, `zod`, `@hookform/resolvers`
- Configure `tailwind.config.ts` — extend colors to match Amazon palette (orange `#FF9900`, dark navy `#131921`, light grey `#F3F3F3`)
- Set up `globals.css` with CSS variables matching shadcn + Amazon theme overrides

### 3.4 — Database Setup
- Start a local PostgreSQL instance (or use a free Neon/Supabase connection string)
- Initialize Prisma: `npx prisma init`
- Set `DATABASE_URL` in `server/.env`
- Confirm connection works with `npx prisma db pull` (empty DB is fine at this point)

---

## 4. Phase 1 — Database Design & Prisma Schema (Hour 3–6)

### 4.1 — Entity Design Decisions

Before writing any schema, reason through every entity:

**User**
- Stores email, hashed password, full name, created timestamp
- Has one Cart (one-to-one), many Orders

**Category**
- Simple lookup table: id, name, slug
- Products belong to one Category

**Product**
- Core listing data: name, description, price (Decimal), stock count, category relation
- Has many ProductImages (separate table, not array column)
- Has many CartItems, many OrderItems

**ProductImage**
- url, altText, sortOrder (for carousel ordering), productId FK

**Cart**
- One per user (created on first add-to-cart)
- Has many CartItems

**CartItem**
- productId FK, cartId FK, quantity
- Unique constraint on (cartId, productId) — no duplicates, just update quantity

**Order**
- userId FK, status enum (PENDING → CONFIRMED → SHIPPED → DELIVERED → CANCELLED)
- Snapshot fields: subtotal (Decimal), total (Decimal)
- Shipping address stored as embedded JSON or flat fields (flat is simpler for Prisma)
- Has many OrderItems

**OrderItem**
- Snapshot of product at time of order: productId FK, productName, productPrice (Decimal), quantity
- Critical: price is snapshotted, not referenced live — so historical orders don't change if product price changes

### 4.2 — Prisma Schema File (`schema.prisma`)

Models to define:
- `User` — id (uuid), email (unique), passwordHash, fullName, createdAt, cart relation, orders relation
- `Category` — id (uuid), name, slug (unique), products relation
- `Product` — id (uuid), name, description, price (Decimal), stock, categoryId FK, images relation, createdAt
- `ProductImage` — id, url, altText, sortOrder, productId FK
- `Cart` — id, userId (unique FK), items relation, createdAt, updatedAt
- `CartItem` — id, cartId FK, productId FK, quantity, @@unique([cartId, productId])
- `Order` — id (uuid), userId FK, status (enum), subtotal, total, shippingName, shippingAddress, shippingCity, shippingState, shippingPin, createdAt
- `OrderItem` — id, orderId FK, productId FK, productName, productPrice, quantity

### 4.3 — Migration
- Run `npx prisma migrate dev --name init`
- Verify all tables created correctly in psql or Prisma Studio
- Commit the migration file

### 4.4 — Seed Script (`prisma/seed.ts`)
Seed in this order:
1. 6–8 Categories (Electronics, Books, Clothing, Home & Kitchen, Sports, Beauty, Toys, Grocery)
2. 40–60 Products spread across categories — realistic names, prices, descriptions
3. 2–3 ProductImages per product (use placeholder image URLs from `picsum.photos` or `placehold.co` with product-specific seeds)
4. One default user (for testing without going through signup): `test@example.com` / `password123`

Register seed script in `package.json` under `prisma.seed`.

---

## 5. Phase 2 — Backend Core (Hour 6–16)

### 5.1 — Infrastructure Layer

**`utils/AppError.ts`**
- Class extending `Error` with `statusCode`, `isOperational` flag
- Used to throw predictable HTTP errors from services

**`utils/asyncWrapper.ts`**
- Higher-order function that wraps any async Express handler
- Catches rejected promises and forwards to `next(err)` — eliminates try/catch in every controller

**`utils/jwt.ts`**
- `signToken(payload)` → signed JWT string, expiry from env
- `verifyToken(token)` → decoded payload or throws

**`utils/password.ts`**
- `hashPassword(plain)` → bcrypt hash
- `comparePassword(plain, hash)` → boolean

**`config/db.ts`**
- Export a single shared `PrismaClient` instance
- Handle graceful shutdown on SIGINT

**`middlewares/authenticate.ts`**
- Read JWT from `Authorization: Bearer` header
- Verify, attach decoded user to `req.user`
- Throw 401 if missing or invalid

**`middlewares/validate.ts`**
- Accept a Zod schema, parse `req.body` against it
- Attach parsed result to `req.body` (type-safe)
- Forward `ZodError` to error handler as 400

**`middlewares/errorHandler.ts`**
- Catch all errors
- If `AppError` → send `statusCode` + `message`
- If `ZodError` → send 400 + field errors
- If Prisma unique constraint violation → send 409
- Everything else → send 500 with generic message (never leak stack in production)

---

### 5.2 — Auth Module

**`auth.dto.ts`**
- `RegisterDto`: email, password (min 6), fullName
- `LoginDto`: email, password
- Both exported as Zod schemas; TypeScript types inferred from them

**`auth.repository.ts`**
- `findUserByEmail(email)` → User | null
- `findUserById(id)` → User | null
- `createUser(data: RegisterDto & { passwordHash })` → User

**`auth.service.ts`**
- `register(dto)`: check email not taken → hash password → create user → return sanitized user (no hash)
- `login(dto)`: find user → compare password → generate JWT → return token + user
- Never return `passwordHash` from any method

**`auth.controller.ts`**
- `POST /register`: validate → service.register → 201 + user
- `POST /login`: validate → service.login → 200 + token + user
- `GET /me`: authenticate middleware → return `req.user` from token

**`auth.router.ts`**
- Wire routes to controller methods
- `/me` route uses `authenticate` middleware

---

### 5.3 — Products Module

**`product.dto.ts`**
- `ProductQueryDto`: optional `search` (string), optional `categoryId` (string), optional `page` (number), optional `limit` (number)

**`product.repository.ts`**
- `findAll(query: ProductQueryDto)` → paginated products with images and category included
  - Prisma `where` clause: `name contains search` (case-insensitive), `categoryId equals categoryId`
  - Include: `images` (ordered by sortOrder), `category`
  - Return: `{ data, total, page, limit }`
- `findById(id)` → product with all images and category, or null
- `findCategories()` → all categories

**`product.service.ts`**
- `getProducts(query)` → delegates to repository, validates pagination defaults (page=1, limit=20)
- `getProductById(id)` → delegates, throws 404 AppError if not found
- `getCategories()` → delegates

**`product.controller.ts`**
- `GET /products` → query parse → service.getProducts → 200 + paginated response
- `GET /products/:id` → service.getProductById → 200 + product
- `GET /categories` → service.getCategories → 200 + categories list

---

### 5.4 — Cart Module

**`cart.dto.ts`**
- `AddToCartDto`: productId (uuid), quantity (positive integer, default 1)
- `UpdateCartItemDto`: quantity (positive integer)

**`cart.repository.ts`**
- `getOrCreateCart(userId)` → find existing cart or create new one
- `getCartWithItems(userId)` → cart with all CartItems, each including product with first image
- `upsertCartItem(cartId, productId, quantity)` → if exists, set quantity; if not, create
- `updateCartItemQuantity(cartId, productId, quantity)` → update specific item
- `removeCartItem(cartId, productId)` → delete item
- `clearCart(cartId)` → delete all items (used after order placement)

**`cart.service.ts`**
- `getCart(userId)` → fetch cart, compute subtotal and total, return enriched cart
- `addItem(userId, dto)` → verify product exists + in stock → upsert item
- `updateItem(userId, productId, dto)` → verify quantity ≤ stock → update
- `removeItem(userId, productId)` → remove item
- Subtotal/total computed in service, not database — easier to maintain

**`cart.controller.ts`**
- `GET /cart` → service.getCart → 200
- `POST /cart/items` → validate → service.addItem → 200
- `PATCH /cart/items/:productId` → validate → service.updateItem → 200
- `DELETE /cart/items/:productId` → service.removeItem → 204

All cart routes protected by `authenticate` middleware at the router level.

---

### 5.5 — Orders Module

**`order.dto.ts`**
- `PlaceOrderDto`: shippingName, shippingAddress, shippingCity, shippingState, shippingPin (all strings, validated)

**`order.repository.ts`**
- `createOrder(userId, dto, cartItems)` → Prisma transaction:
  - Create Order record
  - Create OrderItems from cartItems (snapshot name and price)
  - Decrement stock on each Product
  - Clear cart
- `findOrdersByUser(userId)` → all orders with OrderItems, ordered by createdAt desc
- `findOrderById(orderId, userId)` → single order with items, verify ownership

**`order.service.ts`**
- `placeOrder(userId, dto)` →
  - Fetch cart; throw 400 if empty
  - Verify all items in stock (service-level, not just DB constraint)
  - Compute subtotal and total
  - Call repository.createOrder in a transaction
  - Return the created order with items
- `getOrderHistory(userId)` → delegates to repository
- `getOrderById(orderId, userId)` → delegates, throws 404 if not found or not owned

**`order.controller.ts`**
- `POST /orders` → validate → service.placeOrder → 201 + order
- `GET /orders` → service.getOrderHistory → 200 + orders list
- `GET /orders/:id` → service.getOrderById → 200 + order

All order routes protected by `authenticate` middleware.

---

### 5.6 — Route Registration (`app.ts`)

Mount routes with versioned prefix:
- `/api/v1/auth` → auth router
- `/api/v1/products` → product router
- `/api/v1/categories` → mounted inside product router
- `/api/v1/cart` → cart router
- `/api/v1/orders` → order router

Apply middleware stack in order:
1. `helmet()` — security headers
2. `cors(corsOptions)` — whitelist frontend origin, allow credentials
3. `express.json()` — body parser
4. `cookieParser()` — for reading cookies if needed
5. `morgan('dev')` — request logging
6. Route mounts
7. `notFound` handler — catches unmatched routes → 404
8. `errorHandler` — global error responder

---

## 6. Phase 3 — Frontend Core (Hour 16–30)

### 6.1 — Foundation

**`lib/constants.ts`**
- `API_BASE_URL` — from `process.env.NEXT_PUBLIC_API_URL`
- `CATEGORIES` — static list matching DB slugs (for nav bar)
- `ITEMS_PER_PAGE` — default pagination

**`lib/utils.ts`**
- `cn(...classes)` — clsx + tailwind-merge (already from shadcn init)
- `formatCurrency(amount)` — `₹` prefix, 2 decimal places
- `formatDate(iso)` — human-readable order dates
- `truncateText(text, maxLen)` — for product card descriptions

**`lib/validators.ts`**
- Zod schemas for all frontend forms: login, register, checkout address
- Exported and reused with `react-hook-form` `zodResolver`

**`services/api.ts`**
- Base fetch wrapper: prepend `API_BASE_URL`, set `credentials: 'include'`, set Content-Type JSON
- On 401 → clear auth store, redirect to `/login`
- Typed `get<T>`, `post<T>`, `patch<T>`, `del<T>` helpers

**`services/productService.ts`** — wraps product API calls
**`services/cartService.ts`** — wraps cart API calls
**`services/orderService.ts`** — wraps order API calls
**`services/authService.ts`** — wraps auth API calls

---

### 6.2 — Zustand Stores

**`store/useAuthStore.ts`**
- State: `user` (User | null), `token` (string | null), `isAuthenticated`
- Actions: `setAuth(user, token)`, `logout()`, `hydrateFromStorage()` (call on app init)
- Persist token in localStorage via Zustand persist middleware

**`store/useCartStore.ts`**
- State: `items` (CartItem[]), `subtotal`, `total`, `itemCount`
- Actions: `setCart(cart)`, `addItem`, `updateItem`, `removeItem`, `clearCart`
- `itemCount` derived from items array length
- Cart is fetched from server on mount if user is authenticated — store is a local mirror

**`store/useProductStore.ts`**
- State: `products`, `total`, `currentPage`, `filters` (`search`, `categoryId`)
- Actions: `setProducts`, `setFilters`, `resetFilters`

---

### 6.3 — Hooks

**`hooks/useProducts.ts`**
- Accepts `filters` object
- Calls `productService.getProducts(filters)` on mount and filter change
- Returns `{ products, total, isLoading, error, page, setPage }`

**`hooks/useProductDetail.ts`**
- Accepts `productId`
- Fetches single product on mount
- Returns `{ product, isLoading, error }`

**`hooks/useCart.ts`**
- On mount (if authenticated): fetches cart from server, hydrates store
- Exposes `addToCart(productId, qty)`, `updateQuantity(productId, qty)`, `removeFromCart(productId)`
- Each action calls API then updates store
- Returns `{ items, subtotal, total, itemCount, isLoading }`

**`hooks/useOrders.ts`**
- Fetches order history on mount
- Returns `{ orders, isLoading, error }`

**`hooks/useAuth.ts`**
- Wraps auth store; provides `login(dto)`, `register(dto)`, `logout()`
- On login/register success: calls `setAuth` and redirects to home

---

### 6.4 — Layout Components

**`Navbar.tsx`**
- Amazon-style dark top bar (`#131921` background)
- Left: Logo (text or SVG)
- Center: Search bar with category dropdown prefix + input + search button
- Right: Account menu (shows name if logged in), Orders link, Cart icon with item count badge
- Use `NavbarSearch`, `NavbarCart`, `NavbarUser` as sub-components

**`CategoryBar.tsx`**
- Horizontal scrollable strip of category links below navbar
- Maps `CATEGORIES` constant to links with `?categoryId=` query params

**`Footer.tsx`**
- 4-column grid of links (About, Help, Business, Let Us Help You)
- Dark background matching Amazon's footer

---

### 6.5 — Product Listing Page (`app/(main)/page.tsx`)

Page behavior:
- Read `search` and `categoryId` from URL search params
- Pass to `useProducts` hook
- Render `ProductGrid` with results
- Render `Skeleton` cards while loading (12 skeleton cards in grid)
- Render pagination controls at bottom

**`ProductGrid.tsx`**
- CSS grid: 2 cols on mobile, 3 on tablet, 4 on desktop
- Maps products to `ProductCard`

**`ProductCard.tsx`**
- White card with 1px border, hover shadow transition
- Top: fixed-height image container (object-cover), links to detail page
- Middle: truncated product name (2 lines), star rating placeholder, category badge
- Bottom: price formatted with `formatCurrency`, `Add to Cart` button
- `Add to Cart` calls `useCart.addToCart`, shows loading state, shows success toast

---

### 6.6 — Product Detail Page (`app/(main)/products/[id]/page.tsx`)

Layout: 2-column on desktop, stacked on mobile

Left column — **`ProductImageCarousel.tsx`**
- Large main image display
- Thumbnails row below — clicking switches main image
- Simple state management, no external carousel lib needed

Right column — **`ProductDetailInfo.tsx`**
- Product name (large heading)
- Star rating row (static for now)
- Price (large, orange/dark)
- `StockBadge` — "In Stock" (green) or "Out of Stock" (red) based on stock count
- Quantity selector (number input, min 1, max product stock)
- `Add to Cart` button (full width, yellow/orange Amazon style)
- `Buy Now` button (full width, outlined style) — adds to cart then navigates to `/cart`
- `ProductSpecifications.tsx` — simple key/value table from description (or separate spec field)

---

### 6.7 — Cart Page (`app/(main)/cart/page.tsx`)

Layout: 2-column (items list + summary panel)

Left — Cart Items:
- `CartItem.tsx` per item: product image, name, price, quantity stepper (+ / - buttons), remove link
- Quantity change calls `useCart.updateQuantity`; remove calls `useCart.removeFromCart`
- `CartEmptyState.tsx` — illustrated empty state with "Continue Shopping" CTA

Right — `CartSummary.tsx`:
- Subtotal line items
- Estimated total
- "Proceed to Checkout" button → navigates to `/checkout` (requires auth — `ProtectedRoute` handles redirect)

---

### 6.8 — Checkout Page (`app/(main)/checkout/page.tsx`)

Protected: redirect to login if not authenticated.

Layout: 2-column

Left — `AddressForm.tsx`:
- Full name, address line, city, state, PIN code
- `react-hook-form` + Zod validation
- Inline error messages per field

Right — `OrderReviewPanel.tsx`:
- List of cart items with quantities and prices
- Subtotal + total
- "Place Order" button — calls `orderService.placeOrder(addressData)` → on success navigate to `/order-confirmation/:orderId`

---

### 6.9 — Order Confirmation Page (`app/(main)/order-confirmation/[orderId]/page.tsx`)

- Fetch order by ID on mount
- Show: success checkmark icon, "Order Placed!" heading, Order ID prominently
- Summary of ordered items
- CTA: "Continue Shopping" → home, "View All Orders" → `/orders`

---

### 6.10 — Shared Components

**`ProtectedRoute.tsx`**
- Checks `useAuthStore.isAuthenticated`
- If not authenticated: redirects to `/login?redirect=<current-path>`

**`StarRating.tsx`**
- Renders 1–5 stars; accepts `rating` and `count` props
- Pure display, no interaction needed for now

**`PriceTag.tsx`**
- Formats price with currency symbol
- Optional `originalPrice` prop for strikethrough display

**`StockBadge.tsx`**
- Green "In Stock" / Red "Out of Stock" / Yellow "Low Stock (< 5)" based on stock number

**`LoadingSpinner.tsx`** — centered animated spinner
**`ErrorBanner.tsx`** — red alert box with error message

---

## 7. Phase 4 — Auth Layer (Hour 30–36)

### 7.1 — Backend Auth (already built in Phase 2.2 — verify completeness)
- Double-check JWT secret is loaded from env
- Confirm `authenticate` middleware correctly rejects malformed tokens
- Test register → login → /me flow with a REST client

### 7.2 — Login Page (`app/(auth)/login/page.tsx`)
- Centered card layout, Amazon logo at top
- Email + Password inputs
- "Sign In" button with loading state
- "New customer? Register here" link
- On submit: call `authService.login` → on success: `setAuth` → redirect home or to `redirect` query param
- Show error toast on wrong credentials

### 7.3 — Register Page (`app/(auth)/register/page.tsx`)
- Full Name, Email, Password, Confirm Password
- Zod validation: passwords must match, email valid, password min 6 chars
- On success: auto-login (call login service after register) → redirect home

### 7.4 — Middleware (`middleware.ts`)
- Next.js edge middleware
- Protect routes: `/checkout`, `/orders`, `/order-confirmation/:id`
- Check for auth token in cookie or Authorization header
- If missing → redirect to `/login?redirect=<requested-path>`

### 7.5 — Logout
- `NavbarUser` shows user's name + dropdown
- Dropdown: "Your Account", "Your Orders", "Sign Out"
- Sign Out: calls `authService.logout` (backend can be stateless — just a 200), clears auth store, clears cart store, redirects home

---

## 8. Phase 5 — Order History (Hour 36–40)

### 8.1 — Orders Page (`app/(main)/orders/page.tsx`)

Protected route.

- Fetch all orders via `useOrders` hook on mount
- Render list of `OrderCard` components, newest first
- Empty state if no orders yet

**`OrderCard.tsx`**
- Order ID (truncated with copy button)
- Order date, status badge (color-coded by status)
- Items count and total amount
- "View Details" link → expands inline or navigates to confirmation page

**`OrderItemRow.tsx`**
- Product name (snapshotted), quantity, unit price, line total
- No product link needed — product may no longer exist at that price

### 8.2 — Order Status Styling
- PENDING → yellow badge
- CONFIRMED → blue badge
- SHIPPED → purple badge
- DELIVERED → green badge
- CANCELLED → red badge

---

## 9. Phase 6 — Seed, Polish & QA (Hour 40–46)

### 9.1 — Final Seed Run
- Run `npx prisma migrate reset` (wipes + remigrates + re-seeds)
- Verify all 40–60 products appear across all 8 categories
- Spot-check 5 products in Prisma Studio: images load, prices correct, stock > 0

### 9.2 — UI Polish Checklist
- [ ] Amazon logo renders correctly in nav
- [ ] Search bar filters products on Enter and on button click
- [ ] Category bar filters products by category
- [ ] Product cards have hover shadow transition
- [ ] Image carousel on detail page cycles correctly
- [ ] Add to Cart shows toast on success
- [ ] Cart item count badge updates in navbar immediately
- [ ] Quantity stepper in cart respects stock limits
- [ ] Checkout form shows inline validation errors
- [ ] Order confirmation shows real order ID from API
- [ ] Orders page shows all past orders, newest first
- [ ] Unauthenticated user gets redirected from `/checkout` and `/orders` to login
- [ ] After login, user is redirected back to original destination

### 9.3 — Error State Testing
- [ ] Search with no results → "No products found" state
- [ ] Product not found URL → 404 page
- [ ] Add out-of-stock item → error toast
- [ ] Place order with empty cart → error toast
- [ ] Network error → `ErrorBanner` displays

### 9.4 — Responsive Check
- [ ] Navbar collapses gracefully on mobile (≤640px)
- [ ] Product grid is 2-column on mobile
- [ ] Cart page stacks to single column on mobile
- [ ] Checkout stacks to single column on mobile
- [ ] All buttons and inputs are comfortably touch-sized

### 9.5 — Performance Pass
- Add `loading.tsx` to App Router route segments for automatic Suspense boundaries
- Add `error.tsx` for route-level error boundaries
- Ensure product images use Next.js `<Image>` component with width/height for LCP

---

## 10. Phase 7 — README & Submission (Hour 46–48)

### 10.1 — README.md Structure

```
# Amazon Clone

## Live Demo
[deployed link]

## GitHub
[repo link]

## Tech Stack
- Frontend: Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Zustand
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL with Prisma ORM
- Auth: JWT (HttpOnly cookie / Bearer token)

## Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Backend
cd server
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

### Frontend
cd client
cp .env.example .env.local
# Fill in NEXT_PUBLIC_API_URL
npm install
npm run dev

## Database Schema
[Paste Prisma schema or ERD image]

## Assumptions
- Default guest browsing is allowed; cart and checkout require login
- Product prices are snapshotted at order time
- No payment gateway integrated (order is placed directly)
- Stock decrements synchronously on order placement

## Folder Structure
[Paste the directory tree from this plan]
```

### 10.2 — Final Submission Steps
1. Push all code to GitHub, confirm repo is public
2. Deploy backend to Render (free tier, Docker-less web service)
3. Set all environment variables in Render dashboard
4. Run `npx prisma migrate deploy` on Render (use build command)
5. Deploy frontend to Vercel — set `NEXT_PUBLIC_API_URL` to Render backend URL
6. Smoke-test the deployed app: register → browse → add to cart → checkout → view orders
7. Submit GitHub URL + Vercel URL

---

## 11. API Contract Reference

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/v1/auth/register` | No | Create account |
| POST | `/api/v1/auth/login` | No | Login, returns JWT |
| GET | `/api/v1/auth/me` | Yes | Get current user |
| GET | `/api/v1/products` | No | List products (search, categoryId, page, limit) |
| GET | `/api/v1/products/:id` | No | Single product detail |
| GET | `/api/v1/categories` | No | All categories |
| GET | `/api/v1/cart` | Yes | Get user's cart |
| POST | `/api/v1/cart/items` | Yes | Add item to cart |
| PATCH | `/api/v1/cart/items/:productId` | Yes | Update item quantity |
| DELETE | `/api/v1/cart/items/:productId` | Yes | Remove item from cart |
| POST | `/api/v1/orders` | Yes | Place order from cart |
| GET | `/api/v1/orders` | Yes | Get order history |
| GET | `/api/v1/orders/:id` | Yes | Get single order |

---

## 12. Database Schema Overview

```
User ──< Order ──< OrderItem
User ──── Cart ──< CartItem >── Product ──< ProductImage
Product >── Category
CartItem >── Product
```

**Key Design Decisions:**
- `Cart` is 1-to-1 with `User` — created lazily on first add-to-cart
- `CartItem` has a unique constraint on `(cartId, productId)` — prevents duplicates
- `OrderItem` stores `productName` and `productPrice` as snapshots — historical accuracy
- `Order.status` is a Prisma enum — validated at DB level
- All monetary values use `Decimal` type (not Float) — avoids floating point errors
- UUIDs used for all primary keys — no sequential ID exposure

---

## 13. Environment Variables Reference

### Server (`server/.env`)
```
DATABASE_URL=postgresql://user:password@localhost:5432/amazon_clone
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Client (`client/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

*Plan authored for 2-day delivery. Every phase has a time budget. Stick to the order — backend before frontend, schema before services, services before controllers, hooks before pages.*
