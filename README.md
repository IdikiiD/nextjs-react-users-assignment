# User Management Application

A Next.js + React + TypeScript application for managing users with search, filter, and edit functionality.

---

## How to Run the Project
```bash
# Clone the repository
git clone <repository-url>
cd user-management-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Available commands:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

---

##  Architecture

### Structure
```
app/
  ├── layout.tsx          # Root layout (Server Component)
  ├── page.tsx            # Main page (Client Component)
components/
  ├── UserCard.tsx        # Individual user display
  ├── UserList.tsx        # List with loading/error states
  ├── FilterControls.tsx  # Search and city filter
  └── EditUserForm.tsx    # Edit modal
hooks/
  ├── useUsers.ts         # Data fetching + state management
  └── useDebounce.ts      # Search optimization
utils/
  ├── filters.ts          # Filtering logic
  └── validation.ts       # Form validation
types/
  └── user.ts             # TypeScript types
```

### Key Decisions

**Client-side fetching** - Used `useUsers` hook with `useEffect` for better control over loading/error states and easier optimistic updates.

**Local state** - Simple single-page app doesn't need Zustand/Redux.

**Custom hooks** - Built `useUsers` and `useDebounce` instead of using React Query/SWR since we have a simple use case (one API endpoint, fetch once).

**Separation of logic** - Filtering and validation are in `utils/` as pure functions, keeping components clean and logic testable.

---

##  Production Improvements

**Testing**
- Unit tests for utils (filters, validation)
- Component tests with React Testing Library
- E2E tests with Playwright

**State & Data**
- React Query for caching and revalidation
- Real backend API with proper CRUD
- Server-side pagination for scalability

**Performance**
- Virtual scrolling for large lists
- Code splitting
- Image optimization

**UX**
- Toast notifications
- Undo/redo
- Keyboard shortcuts
- Better error handling with retry logic

**Code Quality**
- Stricter ESLint rules
- Pre-commit hooks
- CI/CD pipeline

**Security**
- Authentication
- Input sanitization
- Rate limiting
