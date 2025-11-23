# CashFlowX

Live site: https://cashflowx.dev

CashFlowX is a personal finance dashboard built with Next.js. It helps you track income and expenses, organize them into categories, and keep clear visibility over your cash flow.

## Features

- **Authentication with Clerk**
  - Email / password or social login
  - Protected dashboard and transactions pages

- **Transactions**
  - Create new transactions (amount, date, description, category)
  - View a list of recent transactions
  - Basic sorting and filtering (by date, etc.)

- **Categories**
  - Custom categories for income and expenses
  - Use categories when creating transactions

- **Dashboard**
  - Overview of your recent transactions
  - Quick access to the transactions page
  - Clean hero section with CTA (View Dashboard)

- **UI/UX**
  - Built with the Next.js App Router
  - Tailwind CSS + shadcn/ui components
  - Responsive layout and dark-friendly hero background

> _Future plans:_ bank/credit-card integration (e.g. Plaid) to automatically import transactions.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [neon/postgres](https://neon.com) Database

---

## Getting Started

### 1. Clone the repo

 - git clone https://github.com/HAM-2018/cashflowx.git
 - cd cashflowx

#### 2. Install dependencies

npm install

### 3. Configure environment variables

create a clerk account and neon.tech database

create a .env.local file in the project root and add the required environment variables

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL=postgresql://user:password@host:5432/cashflowx

### 4. Run the development server

npm run dev 