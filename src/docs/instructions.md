# Todo List Application

## Overview

Create a modern, user-friendly todo list application that allows users to efficiently manage their tasks with features like authentication, prioritization, and batch operations.

### Tech Stack
- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Lucide icons
- **Backend**: Next.js API routes
- **Database**: PostgreSQL (Vercel Postgres)
- **Authentication**: Clerk (Google, GitHub, Email/Password)
- **Development Tools**: ESLint, Prettier
- **Deployment**: Vercel

## Functional Requirements

### 1. Authentication
1. Implement user authentication
   1. Support multiple providers
        1. Google authentication
        2. Email/password as fallback
   2. Automatic profile creation
        1. Create user profile on first login
        2. Store essential user information
   3. Route protection
        1. Secure all API routes
        2. Protect page routes
        3. Handle unauthorized access

### 2. Todo Management
1. Core todo operations
   1. Create todo items
        1. Required title field
        2. Optional description
        3. Optional deadline
   2. Edit todo items
        1. Modify any field
        2. Real-time updates
   3. Delete todo items
        1. Individual deletion
        2. Confirmation prompt

2. Task organization
   1. Prioritization
        1. High priority
        2. Medium priority
        3. Low priority
   2. Status management
        1. Mark as complete
        2. Mark as incomplete

### 3. Bulk Operations
1. Selection mechanism
   1. Multiple selection
        1. Checkbox for each todo
        2. Select all option
        3. Clear selection option

2. Batch actions
   1. Delete multiple
        1. Remove selected todos
        2. Confirmation required
   2. Update status
        1. Mark selected as complete
        2. Mark selected as incomplete
   3. Update priority
        1. Change priority for selected todos

## Technical Specifications

### File Structure

Below is a recommended file structure. Follow this closely to maintain organization and ensure scalability of the project.

```
/src
  ├── app/
  │   ├── layout.tsx                   # Main layout for the app
  │   ├── page.tsx                     # Homepage (Todo list view)
  │   ├── api/
  │   │   ├── todos/
  │   │   │   ├── [id].ts              # API route for individual todo actions (GET, DELETE, PATCH)
  │   │   │   ├── index.ts             # API route to get, create todos
  │   │   │   └── bulk.ts              # API route for bulk updates/deletes
  │   │   └── auth/
  │   │       └── callback.ts          # Clerk auth callback
  │   └── auth/
  │       └── sign-in.tsx              # Sign-in page for authentication
  │
  ├── components/
  │   ├── Header.tsx                   # Header component for navigation
  │   ├── TodoItem.tsx                 # Todo item component
  │   ├── TodoList.tsx                 # Todo list component (renders multiple TodoItems)
  │   ├── BulkActionButtons.tsx        # Buttons for bulk actions (delete, update)
  │   └── AuthButton.tsx               # Button for sign-in/sign-out
  │
  ├── lib/
  │   └── db.ts                        # Database connection logic (PostgreSQL)
  │
  ├── styles/
  │   └── globals.css                  # Global Tailwind CSS styles
  │
  └── utils/
      ├── api.ts                       # API utility for interacting with the backend
      └── auth.ts                      # Authentication utilities using Clerk
```

### Explanation of Key Directories

1. **`/app/`**
   - **`layout.tsx`**: Defines the main layout structure for the entire application (e.g., navigation, footers, etc.). Ensure it wraps around all pages
   - **`page.tsx`**: This is the homepage where the todo list will be displayed
   - **API Routes**:
     - **`/api/todos/[id].ts`**: For handling individual todo items (get, update, or delete specific todo)
     - **`/api/todos/index.ts`**: Handles listing all todos and creating new todos
     - **`/api/todos/bulk.ts`**: This route should manage bulk actions like updating and deleting multiple todos
     - **`/api/auth/callback.ts`**: This is for handling the authentication callback from Clerk

2. **`/components/`**
   - **`Header.tsx`**: A reusable header component for global navigation
   - **`TodoItem.tsx`**: Represents a single todo item. This component will be used inside the todo list
   - **`TodoList.tsx`**: A container that renders multiple `TodoItem` components
   - **`BulkActionButtons.tsx`**: Buttons that allow the user to perform bulk actions on selected todo items
   - **`AuthButton.tsx`**: Button to handle authentication (sign-in/sign-out) with Clerk

## Development Guidelines

### Code Quality
- Use **TypeScript** for strict type checking and safety
- Follow the **ESLint** and **Prettier** configurations for maintaining code quality and consistency
- **Unit Tests**: Write unit tests for critical functions, especially for API routes and utility functions

### Performance Considerations
- **Optimistic Updates**: Implement optimistic UI updates for actions like marking a task as completed (update the UI before the API call finishes to enhance UX)
- **Infinite Scrolling**: Implement infinite scrolling if the todo list grows large
- **Code Splitting**: Split the codebase where necessary to keep the bundle size small

### Security Measures
- Ensure all API routes and pages are **protected** by Clerk authentication
- Use **CSRF protection** and **session management** provided by Clerk
- Sanitize all user inputs to avoid SQL injection or XSS vulnerabilities

## Testing Strategy

### Unit Testing
- Test individual components like `TodoItem.tsx` and utility functions in `api.ts` and `auth.ts`
- Test API route handlers to ensure todos are fetched, created, updated, and deleted as expected

### Integration Testing
- Test database operations, ensuring that data is correctly stored and retrieved
- Test authentication flows to ensure proper login, session management, and error handling

### End-to-End Testing
- Test critical user journeys like:
  - Signing in with Google/GitHub
  - Creating, updating, and deleting todos
  - Performing bulk operations (deleting/updating multiple items)
  - Responsive design and accessibility

## Monitoring & Analytics

### Authentication Monitoring
- Track sign-in/sign-up events and monitor for authentication failures using Clerk's built-in monitoring

### Performance Monitoring
- Monitor the response times of API requests
- Track client-side performance, focusing on page load times and interactions

### Error Tracking
- Implement error boundaries in React to catch client-side errors
- Set up error logging services (such as Sentry) to capture API or UI errors in production

## Mentorship Notes
- **Thinking through the problem**: Break down tasks into manageable parts. Start with authentication, then tackle the todo list, followed by bulk operations
- **Iterative development**: Build and test each feature incrementally. Don't wait to implement everything at once—deploy small pieces and test
- **Documentation**: Make sure to comment your code where necessary. Clear, concise comments help future developers (and yourself) when revisiting the code

If you have any questions, feel free to reach out for guidance!