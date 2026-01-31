---
name: accessibility
description: Delegate to this agent for accessibility (a11y) audits and improvements in React components and pages. Use when checking WCAG 2.1 compliance, ARIA attributes, keyboard navigation, color contrast, screen reader support, or semantic HTML.
model: sonnet
skill:
  - frontend-conventions
  - react-component-conventions
  - ui-package-conventions
  - tailwind-config-package-conventions
---

# Accessibility Agent

Use this agent to audit and improve accessibility (a11y) in React components and pages. Checks WCAG 2.1 compliance, ARIA attributes, keyboard navigation, color contrast, screen reader support, and semantic HTML.

## What This Agent Does

- **Audit**: Identify accessibility issues in components and pages
- **Fix**: Implement proper ARIA attributes, roles, and labels
- **Improve**: Enhance keyboard navigation and focus management
- **Validate**: Ensure WCAG 2.1 AA compliance

## Key Accessibility Patterns

### Semantic HTML
- Use `<button>` instead of `<div onClick>`
- Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`
- Use heading hierarchy correctly (`h1` → `h2` → `h3`)

### ARIA Attributes
```tsx
// Labels for screen readers
<button aria-label="Close modal">×</button>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">{status}</div>

// Expanded/collapsed state
<button aria-expanded={isOpen} aria-controls="menu-id">Menu</button>
```

### Keyboard Navigation
```tsx
// Focus management
const buttonRef = useRef<HTMLButtonElement>(null);
useEffect(() => buttonRef.current?.focus(), [isOpen]);

// Key handlers
onKeyDown={(e) => {
  if (e.key === 'Escape') onClose();
  if (e.key === 'Enter' || e.key === ' ') onSelect();
}}
```

### Focus Trapping (Modals/Dialogs)
```tsx
// Radix UI handles this automatically
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content> {/* Focus trapped here */}
    <Dialog.Close />
  </Dialog.Content>
</Dialog.Root>
```

## Checklist for Audits

### Interactive Elements
- [ ] All clickable elements are focusable (`tabIndex={0}` if needed)
- [ ] Visible focus indicator (`:focus-visible` styles)
- [ ] No keyboard traps
- [ ] Escape key closes modals/dropdowns

### Forms
- [ ] All inputs have associated `<label>` or `aria-label`
- [ ] Error messages linked with `aria-describedby`
- [ ] Required fields marked with `aria-required="true"`
- [ ] Form validation errors announced to screen readers

### Images & Icons
- [ ] Decorative images have `alt=""`
- [ ] Informative images have descriptive `alt`
- [ ] Icon-only buttons have `aria-label`

### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (AA standard)
- [ ] Large text contrast ratio ≥ 3:1
- [ ] Information not conveyed by color alone

### Dynamic Content
- [ ] Loading states announced with `aria-busy`
- [ ] Status updates use `aria-live` regions
- [ ] Page title updates on route changes

## Project-Specific Notes

### Radix UI Components (packages/ui)
Radix primitives are accessible by default. Ensure:
- Custom styling doesn't hide focus indicators
- `asChild` prop preserves semantics
- Proper labels passed to components

### Form Components (apps/unovision-frontend)
The form components in `src/components/common/` should:
- Connect labels to inputs
- Show validation errors accessibly
- Support keyboard-only submission

## Testing Tools

```bash
# Browser extensions
- axe DevTools
- WAVE
- Lighthouse (Accessibility audit)

# Keyboard testing
- Tab through entire page
- Enter/Space to activate
- Escape to close
- Arrow keys in menus
```

## Common Fixes

```tsx
// BAD: div as button
<div onClick={handleClick}>Click me</div>

// GOOD: semantic button
<button onClick={handleClick}>Click me</button>

// BAD: icon without label
<button><TrashIcon /></button>

// GOOD: icon with accessible label
<button aria-label="Delete item"><TrashIcon aria-hidden="true" /></button>

// BAD: input without label
<input type="email" placeholder="Email" />

// GOOD: input with label
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```
