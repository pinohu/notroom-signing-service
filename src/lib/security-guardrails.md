# Notroom Security Guardrails

> **MANDATORY**: All agents and developers MUST follow these rules.
> Violations will break authentication, payments, or expose user data.

---

## 🔐 Authentication Safety (NextAuth v5 Beta)

### NEVER DO

1. **Never downgrade session security**
   - Don't change `session.strategy` from "jwt" to "database" without migration
   - Don't reduce `maxAge` below 24 hours
   - Don't disable `secure` cookies in production

2. **Never log tokens or secrets**
   ```typescript
   // ❌ FORBIDDEN
   console.log(session.accessToken)
   console.log(account.access_token)
   console.log(user.password)
   
   // ✅ OK
   console.log("Session valid:", !!session)
   console.log("User ID:", session.user.id)
   ```

3. **Never relax callbacks without tests**
   - `jwt` callback: Don't add fields without validating source
   - `session` callback: Don't expose internal IDs unnecessarily
   - `signIn` callback: Don't bypass email verification

4. **Never modify auth.ts without updating tests**
   - Every auth change requires corresponding test
   - Test both success and failure paths

### ALWAYS DO

1. **Validate session on every protected route**
   ```typescript
   const session = await auth()
   if (!session?.user) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
   }
   ```

2. **Use role-based access control**
   ```typescript
   if (session.user.role !== "ADMIN") {
     return NextResponse.json({ error: "Forbidden" }, { status: 403 })
   }
   ```

3. **Rotate secrets on suspected compromise**
   - NEXTAUTH_SECRET must be rotated if exposed
   - All sessions invalidated on secret rotation

---

## 💳 Payments Safety (Stripe Connect)

### NEVER DO

1. **Never store raw card data**
   ```typescript
   // ❌ FORBIDDEN - PCI violation
   await prisma.user.update({
     data: { cardNumber: req.body.cardNumber }
   })
   
   // ✅ OK - Use Stripe tokens
   const paymentMethod = await stripe.paymentMethods.create({
     type: 'card',
     card: { token: req.body.stripeToken }
   })
   ```

2. **Never skip webhook signature verification**
   ```typescript
   // ❌ FORBIDDEN
   const event = req.body
   
   // ✅ REQUIRED
   const sig = req.headers['stripe-signature']
   const event = stripe.webhooks.constructEvent(
     rawBody,
     sig,
     process.env.STRIPE_WEBHOOK_SECRET!
   )
   ```

3. **Never process payments without idempotency**
   ```typescript
   // ❌ FORBIDDEN - Double charges possible
   await stripe.transfers.create({ amount, destination })
   
   // ✅ REQUIRED
   await stripe.transfers.create(
     { amount, destination },
     { idempotencyKey: `transfer_${assignmentId}` }
   )
   ```

4. **Never trust client-side payment amounts**
   ```typescript
   // ❌ FORBIDDEN
   const amount = req.body.amount
   
   // ✅ REQUIRED - Calculate server-side
   const amount = await calculatePaymentAmount(assignmentId)
   ```

### ALWAYS DO

1. **Use event-driven reconciliation**
   ```typescript
   // Don't rely on synchronous payment confirmation
   // Use webhooks: transfer.paid, transfer.failed
   ```

2. **Log payment events for audit**
   ```typescript
   await prisma.auditLog.create({
     data: {
       action: "PAYMENT_PROCESSED",
       resourceType: "Assignment",
       resourceId: assignmentId,
       metadata: { transferId, amount, status }
     }
   })
   ```

3. **Handle all Stripe error codes**
   ```typescript
   try {
     await stripe.transfers.create(...)
   } catch (err) {
     if (err.code === 'insufficient_funds') {
       // Handle gracefully
     }
     throw err
   }
   ```

4. **Verify Connect account status before transfers**
   ```typescript
   const account = await stripe.accounts.retrieve(stripeConnectId)
   if (!account.charges_enabled || !account.payouts_enabled) {
     throw new Error("Account not ready for payouts")
   }
   ```

---

## 🛡️ General Security Rules

### Input Validation

```typescript
// Always validate with Zod
import { z } from "zod"

const schema = z.object({
  amount: z.number().positive().max(100000),
  email: z.string().email(),
  notaryId: z.string().cuid(),
})

const validated = schema.parse(req.body)
```

### Database Access

```typescript
// Always use Prisma - never raw SQL
// ❌ FORBIDDEN
await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`

// ✅ OK
await prisma.user.findUnique({ where: { id: userId } })
```

### Error Messages

```typescript
// Never expose internal errors to clients
// ❌ FORBIDDEN
return NextResponse.json({ error: err.message })

// ✅ OK
console.error("Payment failed:", err)
return NextResponse.json({ error: "Payment processing failed" })
```

---

## 🚨 Incident Response

If you suspect a security issue:

1. **Do NOT commit the fix publicly first**
2. Document the issue in a private channel
3. Rotate any potentially compromised secrets
4. Apply fix and deploy immediately
5. Audit logs for exploitation

---

## Checklist for Code Review

- [ ] No tokens/secrets logged
- [ ] Auth checked on all protected routes
- [ ] Stripe webhooks verified
- [ ] Payment amounts calculated server-side
- [ ] Idempotency keys used for payments
- [ ] Inputs validated with Zod
- [ ] Errors don't expose internals
- [ ] Audit logs for sensitive operations

