# Notroom - National Signing Service Platform

A modern, multi-tenant signing service platform built with Next.js 14, designed to connect title companies and lenders with a nationwide network of elite notary signing agents.

## 🚀 Features

- **Multi-Tenant Architecture**: Three distinct portals via subdomain routing
  - `app.notroom.com` - Vendor/Notary Portal
  - `client.notroom.com` - Title Company Portal  
  - `admin.notroom.com` - Internal Admin Dashboard

- **Smart Routing Engine**: Automated vendor assignment based on:
  - State eligibility (RON vs in-person)
  - Elite score and performance metrics
  - Geographic proximity
  - Specialization matching

- **Real-Time Operations**:
  - 3-minute confirmation SLA
  - Live order status tracking
  - Automated escalation system
  - Scanback management

- **Performance Tracking**:
  - First-pass funding rate KPI
  - Vendor scoring system (Bronze/Silver/Gold/Elite)
  - Client satisfaction metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS + shadcn/ui
- **Caching**: Redis (ioredis)
- **Package Manager**: pnpm

## 📁 Project Structure

```
notroom-next/
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   └── init-db.sql            # Database initialization
├── src/
│   ├── app/
│   │   ├── _app/              # Vendor portal routes
│   │   ├── _client/           # Client portal routes
│   │   ├── _admin/            # Admin portal routes
│   │   ├── api/               # API routes
│   │   └── auth/              # Authentication pages
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── nav/               # Navigation components
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       ├── prisma.ts          # Prisma client
│       ├── redis.ts           # Redis client
│       └── tenant.ts          # Multi-tenant utilities
├── docker-compose.yml         # Local development services
└── middleware.ts              # Subdomain routing
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker Desktop (for local database)

### 1. Clone and Install

```bash
git clone https://github.com/pinohu/notroom-next.git
cd notroom-next
pnpm install
```

### 2. Start Local Services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379

### 3. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Initialize Database

```bash
pnpm prisma generate
pnpm prisma db push
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `AUTH_SECRET` | NextAuth.js secret key |
| `AUTH_URL` | Base URL for auth |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

See `.env.example` for all available options.

## 🏗️ Database Schema

Key models:
- **User** - Base user accounts
- **Vendor** - Notary signing agents
- **TitleClient** - Title company accounts
- **SigningOrder** - Signing assignments
- **StateEligibilityRule** - RON/in-person routing rules

Run `pnpm prisma studio` to explore the database.

## 📡 API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `GET /api/health` - Health check (DB + Redis)

## 🧪 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm prisma studio # Open Prisma Studio
```

### Debug Tools (Optional)

Start with debug profile for additional tools:

```bash
docker-compose --profile debug up -d
```

- pgAdmin: http://localhost:5050
- Redis Commander: http://localhost:8081

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Self-Hosted

```bash
pnpm build
pnpm start
```

## 📄 License

Proprietary - Notroom LLC

## 🤝 Support

For support, email closings@notroom.com or call (814) 480-0989.
