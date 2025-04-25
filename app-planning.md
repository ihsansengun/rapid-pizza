
# 🧠 Fast Pizza App Planning 

---

## 📋 Project Overview

- **Client:** Fast Pizza Co.
- **Goal:** Build a pizza ordering frontend in React.
- **Backend API:** Already implemented by client.
- **Note:** No user accounts or payment processing - orders are paid on delivery.

---

## 🛠️ Planning Process

### 1. Requirements Gathering

- Users can order multiple pizzas.
- Orders include name, phone, address (and optionally GPS).
- Priority orders add +20% fee.
- Menu is fetched from API.
- Orders submitted via POST; assigned unique ID.
- Users can mark orders as priority later.

### 2. Feature Categories

- **User** - Name input, session handling
- **Menu** - Display and fetch pizza list
- **Cart** - Add/update/remove pizzas
- **Order** - Place & track orders by ID

### 3. Pages

| Route         | Purpose                |
|---------------|------------------------|
| `/`           | Home (name input)      |
| `/menu`       | Pizza menu             |
| `/cart`       | View/update cart       |
| `/order/new`  | Place a new order      |
| `/order/:id`  | Track existing order   |

### 4. State Management Types

| Category | Type             | Reason                       |
|----------|------------------|------------------------------|
| User     | Global UI state  | Lives in app only            |
| Menu     | Global Remote    | Fetched from API             |
| Cart     | Global UI state  | Stored locally               |
| Order    | Global Remote    | Sent & fetched via API       |

---

## 🧰 Tech Stack Decisions

| Area         | Choice             | Notes                                 |
|--------------|--------------------|---------------------------------------|
| Routing      | React Router       | SPA standard                          |
| Styling      | Tailwind CSS       | Utility-first, modern CSS framework   |
| Remote State | React Router v6.4+ | Uses loaders (render-as-you-fetch)    |
| UI State     | Redux + Toolkit    | Practicing Redux in real-world setup  |

---

