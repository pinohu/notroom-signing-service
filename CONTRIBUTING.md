# Contributing to Notroom

Thank you for your interest in contributing to Notroom! This document provides guidelines and standards for contributing to the codebase.

## Code Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode
- Define proper interfaces/types
- Avoid `any` type unless absolutely necessary
- Use type inference when possible

### React
- Use functional components with hooks
- Follow React best practices
- Use proper dependency arrays in useEffect
- Memoize expensive computations
- Keep components focused and single-purpose

### Styling
- Use Tailwind CSS utility classes
- Follow the design system in `src/index.css`
- Use semantic color tokens (e.g., `text-primary` not `text-blue-500`)
- Ensure responsive design (mobile-first)
- Maintain accessibility standards

### File Naming
- Components: PascalCase (e.g., `BookingForm.tsx`)
- Utilities: camelCase (e.g., `validation.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `SITE_CONFIG`)
- Hooks: camelCase with 'use' prefix (e.g., `useDebounce.tsx`)

## Component Guidelines

### Structure
```tsx
// Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

// Component
const Component = ({ title, onSubmit }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// Export
export default Component;
```

### Best Practices
- Extract complex logic to custom hooks
- Use React.memo for expensive components
- Implement proper error boundaries
- Add loading states
- Handle edge cases
- Include ARIA labels for accessibility

## Form Guidelines

### Validation
```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  // ...
};
```

### Error Handling
- Display clear error messages
- Validate on blur and submit
- Show field-level errors
- Prevent duplicate submissions
- Handle network errors gracefully

## SEO Guidelines

### Meta Tags
```tsx
<SEO
  title="Page Title | Notroom"
  description="Clear, concise description (150-160 chars)"
  keywords="relevant, keywords, here"
  canonical="https://notroom.com/page"
  schema={schemaObject}
/>
```

### Structured Data
- Use schema.org vocabulary
- Include all relevant properties
- Validate with Google's Rich Results Test
- Update schemas when content changes

### Content
- One H1 per page
- Hierarchical heading structure (H1 → H2 → H3)
- Descriptive alt text for images
- Semantic HTML elements
- Internal linking

## Accessibility Checklist

- [ ] All interactive elements have min 44x44px touch targets
- [ ] Proper heading hierarchy
- [ ] ARIA labels on icons and buttons
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Color contrast ratio meets WCAG AA (4.5:1)
- [ ] Forms have proper labels
- [ ] Error messages are announced
- [ ] Skip navigation link present
- [ ] Images have alt text

## Performance Checklist

- [ ] Code splitting implemented where beneficial
- [ ] Images optimized and lazy loaded
- [ ] Unnecessary re-renders prevented
- [ ] Debounced inputs for search/filter
- [ ] Minimize bundle size
- [ ] Use production builds for testing
- [ ] Check Lighthouse scores
- [ ] Monitor Core Web Vitals

## Git Workflow

### Branches
- `main`: Production code
- `develop`: Development code
- `feature/*`: New features
- `fix/*`: Bug fixes
- `refactor/*`: Code refactoring

### Commits
Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(booking): add email confirmation
fix(forms): resolve validation error on submit
docs(readme): update installation instructions
```

### Pull Requests
- Clear, descriptive title
- Link to related issues
- List of changes made
- Screenshots for UI changes
- Updated tests if applicable
- Request review from maintainers

## Testing

### Unit Tests
```tsx
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Integration Tests
- Test user flows
- Mock external services
- Test error scenarios
- Verify side effects

## Documentation

### Code Comments
```tsx
/**
 * Calculates the total price for a booking
 * @param basePrice - The base service price
 * @param additionalFees - Array of additional fees
 * @returns Total price including all fees
 */
const calculateTotal = (basePrice: number, additionalFees: number[]): number => {
  return basePrice + additionalFees.reduce((sum, fee) => sum + fee, 0);
};
```

### Component Documentation
- Purpose of the component
- Props and their types
- Usage examples
- Known limitations

## Security

### Input Handling
- Always validate and sanitize user input
- Use parameterized queries
- Implement rate limiting
- Escape output
- Use HTTPS

### Authentication
- Never store passwords in plain text
- Use secure session management
- Implement proper RBAC
- Validate tokens server-side
- Use secure cookies

## Performance

### Optimization Techniques
- Code splitting
- Lazy loading
- Memoization
- Debouncing
- Throttling
- Virtual scrolling (for large lists)
- Image optimization

### Monitoring
- Track Core Web Vitals
- Monitor bundle sizes
- Profile slow components
- Analyze network requests
- Use Performance tab in DevTools

## Deployment

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Linting errors resolved
- [ ] Build succeeds
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Assets optimized
- [ ] Security headers configured
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Backup strategy in place

### Post-deployment
- Monitor error logs
- Check performance metrics
- Verify critical flows
- Review user feedback
- Update documentation

## Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Supabase](https://supabase.com/docs)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## Questions?

If you have questions or need clarification, please:
1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Contact maintainers

Thank you for contributing to Notroom!