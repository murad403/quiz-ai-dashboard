# AI Coding Agent Instructions for Quiz AI Dashboard

## Project Overview
**Quiz AI Dashboard** is a Next.js-based admin dashboard for a quiz application with AI capabilities. The project uses TypeScript, React 19, and Tailwind CSS with a custom theme system. The app is structured around authentication pages and a main dashboard area with a dark theme (black background).

## Architecture & Key Components

### App Structure
- **`src/app/(auth)/auth/`** — Route group for auth flows (sign-in, sign-up, forgot-password, reset-password, verify-otp)
- **`src/app/(app)/`** — Route group for authenticated dashboard pages (to be implemented)
- **`src/components/Wrapper/AuthWrapper.tsx`** — Layout wrapper for auth pages, provides centered dark container with responsive padding
- **`src/app/layout.tsx`** — Root layout applying global fonts (Geist) and body styles

### Key Technical Stack
- **Framework:** Next.js 16.1.1 with App Router and React Compiler enabled
- **Form Management:** React Hook Form with Zod validation
- **Styling:** Tailwind CSS 4 with custom theme tokens in `globals.css`
- **Icons:** Lucide React
- **Path Alias:** `@/*` maps to `./src/*` for clean imports

## Important Patterns & Conventions

### Form Implementation Pattern
All auth forms use this pattern:
1. Define Zod validation schema in `src/validation/validation.ts`
2. Create "use client" component
3. Use `useForm<T>` with `zodResolver` from `@hookform/resolvers/zod`
4. Import schema and infer type: `type TInputs = z.infer<typeof validationSchema>`
5. Example from [sign-in page](src/app/(auth)/auth/sign-in/page.tsx#L1):
```tsx
const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
  resolver: zodResolver(signInValidation)
})
```

### Styling & Theme System
- Custom CSS custom properties defined in [globals.css](src/app/globals.css):
  - Colors: `--color-header` (green), `--color-main` (white), `--color-title` (gray), `--color-card` (dark)
  - Text sizes: `--text-heading` (32px), `--text-subheading` (25px), `--text-paragraph` (16px)
- Use class names like `text-main`, `text-title`, `text-heading` for consistency
- All pages use dark background (`bg-black`) at root level

### File Organization
- **Validation schemas** — Centralized in `src/validation/validation.ts`
- **Wrapper components** — In `src/components/Wrapper/` (e.g., AuthWrapper for centered dark layout)
- **Utility functions** — Go in `src/lib/` (currently empty, ready for helpers)
- **Global types** — Define in `src/types/global.ts`

## Development Commands
```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Critical Implementation Notes
- **Middleware/Guards:** Auth protection not yet implemented; (app) route group is prepared but pages need guarding logic
- **State Management:** Currently only local component state (useState); centralized state/context for auth state expected
- **API Integration:** No API routes yet; will need `src/app/api/` endpoints for auth operations (login, password reset, OTP verification)
- **React Compiler:** Enabled in `next.config.ts` — automatic memoization handled by compiler
- **TypeScript Strict Mode:** Enabled; all components must be fully typed

## Common Workflows
1. **Adding Auth Page:** Copy auth form pattern from sign-in, add validation schema, import AuthWrapper layout
2. **Adding Dashboard Feature:** Create under `(app)/` route, ensure auth guard exists before implementing
3. **Modifying Theme:** Update custom properties in `globals.css` theme section
4. **Form Validation:** Add new schema in `validation.ts`, reuse across components via Zod inference

## Project Status & Next Steps
- Auth UI pages are scaffolded (sign-in, forgot-password, reset-password, verify-otp)
- Core form validation and component structure in place
- Ready for: API integration, auth logic implementation, dashboard page development, state management setup
