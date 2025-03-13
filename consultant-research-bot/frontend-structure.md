# Frontend Structure Guide

This document outlines the recommended structure for implementing the consultant research chatbot frontend. Use this as a guide to implement the React components and pages.

## Key Components to Implement

### Authentication Components

1. **LoginForm.tsx**
   - Email/password login form
   - Remember me option
   - Forgot password link

2. **RegisterForm.tsx**
   - Registration form with consultant details
   - Company information
   - Terms and conditions

3. **AuthContext.tsx**
   - User state management
   - Authentication methods
   - JWT storage and handling

### Project Management Components

1. **ProjectList.tsx**
   - Display list of client projects
   - Filtering and sorting options
   - Project status indicators

2. **ProjectForm.tsx**
   - Create/edit project
   - Add client details
   - Add team members

3. **ProjectContext.tsx**
   - Project state management
   - CRUD operations for projects

### Research Components

1. **ResearchForm.tsx**
   - Research query input
   - Template selection
   - Depth/breadth sliders
   - Industry and client context fields

2. **ResearchResults.tsx**
   - Display research results
   - Sources list
   - Executive summary
   - Recommendations

3. **ResearchHistory.tsx**
   - List of past research sessions
   - Status indicators (pending, in progress, completed)
   - Quick view of results

### Chat Interface Components

1. **ChatInterface.tsx**
   - Message display area
   - Input field for queries
   - Typing indicators
   - Message history

2. **MessageBubble.tsx**
   - Different styles for user/system messages
   - Support for rich content (links, code, etc.)
   - Timestamp display

3. **ChatContext.tsx**
   - Message state management
   - Send/receive message functions

### Report Generation Components

1. **ReportOptions.tsx**
   - Format selection (PDF, DOCX, PPTX)
   - Include/exclude sections
   - Branding options

2. **ReportPreview.tsx**
   - Preview of generated report
   - Edit options for sections
   - Download buttons

## Pages to Implement

1. **LoginPage.tsx**
   - Login form
   - Registration link
   - Marketing content

2. **DashboardPage.tsx**
   - Overview of projects
   - Recent research
   - Quick actions

3. **ProjectPage.tsx**
   - Project details
   - Research sessions for the project
   - Team members

4. **ResearchPage.tsx**
   - Start new research
   - Research history
   - Templates

5. **ChatPage.tsx**
   - Chat interface
   - Research context panel
   - Quick actions

6. **ReportPage.tsx**
   - Report generation options
   - Preview and download

## API Services

1. **authService.ts**
   - Login/logout functions
   - Registration
   - Password reset

2. **projectService.ts**
   - CRUD operations for projects
   - Team management

3. **researchService.ts**
   - Start research
   - Get research results
   - Research history

4. **reportService.ts**
   - Generate reports
   - Download in different formats

## Styling

Use a modern UI library like Material-UI, Tailwind CSS, or Chakra UI for styling. Create a professional, clean interface suitable for consultants.

## State Management

1. Use React Context for global state (auth, projects, research)
2. Use local state for form handling and UI interactions
3. Consider using React Query for data fetching and caching

## Responsive Design

Ensure the application works well on all devices:
- Desktop: Full layout with sidebar
- Tablet: Collapsible sidebar
- Mobile: Bottom navigation with slide-up panels 