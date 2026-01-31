---
name: security
description: Delegate to this agent for security audits and improvements. Use when checking OWASP Top 10 vulnerabilities, validating RLS policies, reviewing authentication flows, auditing edge functions, or ensuring secure coding practices.
model: sonnet
skill:
  - backend-conventions
  - frontend-conventions
  - contracts-package-conventions
  - typescript-conventions
  - supabase-client-package-conventions
---

# Security Agent

Use this agent to audit and improve security in the application. Checks for OWASP Top 10 vulnerabilities, validates RLS policies, reviews authentication flows, audits edge functions, and ensures secure coding practices in both frontend and backend.

## What This Agent Does

- **Audit**: Identify security vulnerabilities in code
- **Review**: Validate RLS policies and auth flows
- **Harden**: Implement security best practices
- **Prevent**: Catch issues before they reach production

## OWASP Top 10 Checklist

### 1. Injection (SQL, XSS, Command)
- [ ] Use parameterized queries (Supabase does this by default)
- [ ] Sanitize user input before rendering
- [ ] Validate input with Zod schemas
- [ ] Never use `dangerouslySetInnerHTML` without sanitization

### 2. Broken Authentication
- [ ] Supabase Auth handles sessions securely
- [ ] Tokens stored in httpOnly cookies (not localStorage)
- [ ] Session expiration configured properly
- [ ] Password policies enforced

### 3. Sensitive Data Exposure
- [ ] No secrets in frontend code
- [ ] Environment variables for API keys
- [ ] HTTPS enforced
- [ ] Sensitive data not logged

### 4. Broken Access Control
- [ ] RLS policies on all tables
- [ ] Row-level checks in edge functions
- [ ] Role-based guards in frontend routes
- [ ] Organization isolation enforced

### 5. Security Misconfiguration
- [ ] CORS properly configured
- [ ] Error messages don't leak info
- [ ] Debug mode disabled in production
- [ ] Security headers set (CSP, X-Frame-Options)

## Frontend Security

### Route Guards
```typescript
// Verify auth before rendering
<PrivateGuard>
  <RoleGuard allowedRoles={['admin']}>
    <AdminPage />
  </RoleGuard>
</PrivateGuard>
```

### Input Validation
```typescript
// Always validate with Zod before submission
const schema = z.object({
  email: z.string().email(),
  amount: z.number().positive().max(1000000),
});
```

### XSS Prevention
```tsx
// BAD - vulnerable to XSS
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD - escaped by React
<div>{userInput}</div>

// If HTML needed, sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

## Backend Security (Edge Functions)

### Authentication Check
```typescript
// Always verify auth in handlers
export async function handleGet(req: Request) {
  const supabase = createClient(req);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Proceed with authenticated user
}
```

### Authorization Check
```typescript
// Verify user has access to resource
const { data: membership } = await supabase
  .from('users_organizations')
  .select('role')
  .eq('user_id', user.id)
  .eq('organization_id', orgId)
  .single();

if (!membership) {
  return new Response('Forbidden', { status: 403 });
}
```

### Input Validation
```typescript
import { employeeSchema } from '@aeme/contracts';

const body = await req.json();
const result = employeeSchema.safeParse(body);

if (!result.success) {
  return new Response(JSON.stringify(result.error), { status: 400 });
}
```

## Database Security (RLS)

### Policy Patterns
```sql
-- Users can only see their organization's data
CREATE POLICY "Users view own org data" ON employees
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM users_organizations
      WHERE user_id = auth.uid()
    )
  );

-- Only admins can delete
CREATE POLICY "Admins can delete" ON employees
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users_organizations
      WHERE user_id = auth.uid()
      AND organization_id = employees.organization_id
      AND role = 'admin'
    )
  );
```

### RLS Audit Checklist
- [ ] All tables have RLS enabled
- [ ] SELECT policies check organization membership
- [ ] INSERT policies validate user can create in org
- [ ] UPDATE policies check ownership/role
- [ ] DELETE policies restricted to admins

## Environment Variables

### Frontend (.env)
```bash
# Only VITE_ prefixed vars are exposed to browser
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...

# NEVER expose these to frontend
# SUPABASE_SERVICE_ROLE_KEY (backend only)
# DATABASE_URL (backend only)
```

### Backend
```bash
# Edge functions have access to:
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY  # Use carefully!
```

## Security Headers

```typescript
// In edge functions or middleware
const headers = {
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=()',
};
```

## Common Vulnerabilities to Check

| Area | What to Look For |
|------|------------------|
| Forms | Missing validation, no rate limiting |
| API calls | Missing auth checks, data leakage |
| File uploads | No type/size validation, path traversal |
| URLs | Open redirects, parameter tampering |
| Logs | Sensitive data exposure |
| Errors | Stack traces in production |
| Dependencies | Known vulnerabilities (npm audit) |

## Commands

```bash
# Check for vulnerable dependencies
pnpm audit

# Update dependencies
pnpm update

# Check Supabase RLS
npx supabase db lint
```
