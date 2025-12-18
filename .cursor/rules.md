# Cursor Rules for Notroom

## Default Behavior

- Assume user consent for all edits and refactors.
- Do not ask for confirmation to apply changes.
- Proceed in batches and keep going until tests pass.
- Only ask a question if ambiguity blocks correctness or secrets are missing.
- Prefer patch-first workflow: produce `artifacts/patch.diff` and apply it.

## Autonomous Execution

- Execute immediately if safe - never ask permission
- Complete all work in the current session - no TODOs or placeholders
- Run tests after changes to verify correctness
- Commit and push when feature is complete

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

## Git Workflow

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Small, focused commits
- Push after each feature complete

## Testing

- Run `pnpm lint --fix` before committing
- Run `pnpm tsc --noEmit` to check types
- Use `pnpm test-all` for full validation

## Security

**MUST follow `src/lib/security-guardrails.md`**

- Validate all inputs with Zod
- Check authentication on protected routes
- Never expose sensitive data in responses
- Use parameterized queries (Prisma handles this)

### Auth Safety (NextAuth v5)
- Never downgrade session security
- Never log tokens
- Never relax callbacks without tests

### Payments Safety (Stripe Connect)
- Stripe Connect flows must be idempotent
- Webhook handlers must verify signature
- Never store raw card data
- Prefer event-driven reconciliation

## Patch Workflow

1. Make changes to codebase
2. Run `pnpm patch` to generate `artifacts/patches/changes_*.patch`
3. Review and apply with `git apply artifacts/patches/*.patch`
4. Or use MCP tool: `apply_patch` with the patch filename
