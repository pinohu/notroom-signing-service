# Cursor Rules for Notroom

## Code Style

- Use TypeScript strict mode
- Prefer `function` declarations over arrows for components
- Use named exports
- Follow existing patterns in the codebase

## File Naming

- Use lowercase with dashes for directories: `components/auth-wizard/`
- Use PascalCase for component files: `AuthWizard.tsx`
- Use camelCase for utilities: `paymentCalculations.ts`

## Imports

- Group imports: external, internal, relative
- Use absolute imports from `@/`
- No circular dependencies

## Components

- Server Components by default
- Add "use client" only when needed
- Co-locate related files

## API Routes

- Use Next.js Route Handlers
- Validate input with Zod
- Return consistent response format:
  ```typescript
  { success: true, data: { ... } }
  { success: false, error: "message" }
  ```

## Database

- Use Prisma for all queries
- Never write raw SQL
- Add indexes for frequently queried fields
- Use transactions for multi-step operations

## Git

- Use conventional commits
- Small, focused commits
- Push after each feature complete

## Testing

- Run `pnpm lint --fix` before committing
- Run `pnpm tsc --noEmit` to check types
- Use `pnpm test-all` for full validation

## Security

- Validate all inputs with Zod
- Check authentication on protected routes
- Never expose sensitive data in responses
- Use parameterized queries (Prisma handles this)

