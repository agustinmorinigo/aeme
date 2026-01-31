---
name: debugging
description: Delegate to this agent for systematic debugging and troubleshooting across the stack. Use when investigating bugs, diagnosing errors, analyzing performance issues, or understanding unexpected behavior in frontend, backend, or database.
model: sonnet
skill:
  - frontend-conventions
  - backend-conventions
  - supabase-client-package-conventions
  - typescript-conventions
---

# Debugging Agent

Use this agent for systematic debugging and troubleshooting in the AEME project. Covers frontend, backend, database, and integration debugging.

## Debugging Methodology

1. **Reproduce** - Exact steps, environment, expected vs actual behavior
2. **Isolate** - Which layer? Browser console, server logs, DB logs
3. **Gather** - Error messages, stack traces, network requests, state
4. **Hypothesize** - What could cause this? What changed?
5. **Test** - Add logging/breakpoints, run in isolation, verify fix
6. **Implement** - Minimal fix, tests to prevent regression, document root cause

## Layer Isolation Quick Reference

| Symptom | Check First | Tool |
|---------|-------------|------|
| UI not rendering | React DevTools, console errors | React DevTools |
| API request failing | Network tab, status code | Chrome DevTools Network |
| Data not saving | Supabase logs, RLS policies | Supabase Studio |
| Slow performance | Profiler, bundle size, query time | React Profiler, EXPLAIN |

→ Ver frontend-conventions y backend-conventions para debugging detallado por capa

## Stack-Specific Issues

### Frontend

**Infinite Re-renders**
```tsx
// Missing dependency array!
useEffect(() => {
  setCount(data.count);
}); // Runs every render

// Fix: Add dependency array
useEffect(() => {
  setCount(data.count);
}, []); // Run once
```

**State Not Updating (Mutation)**
```tsx
// WRONG: Mutates state
items.push(newItem);
setItems(items);

// CORRECT: New reference
setItems([...items, newItem]);
```

**TanStack Query Not Refetching**
```typescript
// Include all dependencies in queryKey
queryKey: ['users', organizationId]

// Force refetch
queryClient.invalidateQueries({ queryKey: ['users'] });

// Check if disabled
enabled: !!userId
```

→ Ver frontend-conventions para más patrones de debugging React/TanStack Query

### Integration

**CORS Error**
- Edge functions auto-allow CORS in local dev
- Check Authorization header format: `Bearer <token>`
- Verify Supabase URL matches environment

**Type Mismatch Frontend/Backend**
```typescript
// Frontend sends string
{ amount: "100" }

// Backend expects number (Zod schema)
{ amount: number }

// Fix: Convert in frontend
{ amount: parseFloat(formData.amount) }
```

### Database

**RLS Policy Blocking**
```sql
-- Test if RLS is the issue (use service role to bypass)
-- Check policy in Supabase Studio → Database → Policies
-- Verify user's organization membership

SELECT * FROM users_organizations
WHERE user_id = auth.uid();
```

→ Ver backend-conventions para debugging de edge functions, RLS, y queries

## Performance Quick Checks

**Frontend**: React Profiler (render count), bundle analysis, TanStack Query DevTools (unnecessary fetches)

**Backend**: Add timing logs (`performance.now()`), check edge function logs → backend-conventions

**Database**: `EXPLAIN ANALYZE`, check indexes, Supabase Studio logs → backend-conventions

## Debugging Checklist

- [ ] Can you reproduce consistently?
- [ ] Error message present?
- [ ] Browser console checked?
- [ ] Network tab inspected?
- [ ] TypeScript errors?
- [ ] Backend logs checked?
- [ ] Data exists in database?
- [ ] Tested simpler version?
- [ ] Recent code changes reviewed?
- [ ] Searched docs/GitHub for similar issues?

## Tools Reference

| Layer | Tool | Purpose |
|-------|------|---------|
| Frontend | Chrome DevTools | Console, Network, Elements |
| Frontend | React DevTools | Props, state, hierarchy |
| Frontend | TanStack Query DevTools | Query status, cache |
| Backend | Console.log | Edge function logging → backend-conventions |
| Database | Supabase Studio | Query data, SQL, logs → backend-conventions |
| Integration | Network Tab | Request/response inspection |
