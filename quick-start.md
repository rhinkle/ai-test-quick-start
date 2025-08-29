# React + Vite Application Setup Instructions

## Project Requirements
- Node.js 18+
- React 18+
- Vite 5+
- TypeScript (preferred)

## Initial Setup Commands
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## Core Dependencies
Install these essential packages:
```bash
# Routing
npm install react-router-dom
npm install -D @types/react-router-dom

# State Management
npm install zustand

# HTTP Client
npm install axios

# Form Handling
npm install react-hook-form @hookform/resolvers zod

# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npm install clsx

# Utilities
npm install date-fns
npm install uuid
npm install -D @types/uuid
```

## Development Dependencies
```bash
# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Linting & Formatting
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D prettier eslint-config-prettier

# Build Tools
npm install -D @vitejs/plugin-react
```

## File Structure
Create this directory structure:
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── pages/            # Route components
├── hooks/            # Custom hooks
├── stores/           # Zustand stores
├── services/         # API calls and external services
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── constants/        # App constants
└── assets/           # Images, icons, etc.
```

## Vite Configuration (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

## Tailwind CSS Setup
Initialize Tailwind:
```bash
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## TypeScript Configuration
Update `tsconfig.json` to include path mapping:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/services/*": ["./src/services/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/constants/*": ["./src/constants/*"]
    }
  }
}
```

## Package.json Scripts
Ensure these scripts are configured:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write ."
  }
}
```

## Component Conventions

### Naming
- Components: PascalCase (`UserProfile.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Folders: lowercase with hyphens if needed

### Component Structure
```typescript
// UserProfile.tsx
import { FC } from 'react'

interface UserProfileProps {
  userId: string
  className?: string
}

export const UserProfile = ({
  userId,
  className = ''
}:UserProfileProps) => {
  return (
    <div className={`user-profile ${className}`}>
      {/* Component content */}
    </div>
  )
}
```

### Export Patterns
- Use named exports for components
- Use default exports only for pages/routes
- Create index.ts files for clean imports

## State Management with Zustand
```typescript
// stores/userStore.ts
import { create } from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
```

## API Services Structure
```typescript
// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// services/userService.ts
export const userService = {
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: Partial<User>) =>
    api.patch(`/users/${id}`, data),
}
```

## Environment Variables
Create `.env` files:
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=My App

# .env.production
VITE_API_BASE_URL=https://api.myapp.com
VITE_APP_NAME=My App
```

## Testing Setup
Configure `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

## Git Configuration
Add to `.gitignore`:
```
# Environment variables
.env.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

## ESLint Configuration
Extend `.eslintrc.cjs`:
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
```

## Additional Notes
- Always use TypeScript strict mode
- Prefer functional components with hooks
- Use React.memo() for performance optimization when needed
- Keep components small and focused (single responsibility)
- Use custom hooks for complex logic
- Implement error boundaries for production apps
- Set up absolute imports with @ alias for cleaner imports
