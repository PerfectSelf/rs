# Consultant Research Chatbot

A powerful chatbot application built on top of the Open Deep Research API, designed specifically for consultants to perform deep research and generate client-ready reports.

## Project Status

This project is currently under active development. The backend API and core services are implemented, while the frontend is in progress.

## Features

- **AI-Powered Research**: Leverages the Deep Research API to perform comprehensive research on any topic
- **Consultant-Focused UI**: Clean, professional interface designed for consulting workflow
- **Research Templates**: Pre-defined research patterns for market analysis, competitive intelligence, etc.
- **Depth & Breadth Control**: Customize research depth and breadth based on consulting needs
- **Client Project Management**: Organize research by client and project
- **Report Generation**: Create professional, client-ready reports in various formats

## Architecture

- **Backend**: Node.js/Express with TypeScript, MongoDB for data storage
- **Frontend**: React with TypeScript
- **Integration**: Deep Research API for AI-powered research capabilities

## Implemented Components

### Backend
- ✅ User Authentication (JWT)
- ✅ Project Management
- ✅ Research Integration with Deep Research API
- ✅ API Routes for frontend integration

### Frontend
- ✅ API Services
- ✅ State Management (Context API)
- ✅ Authentication Components
- 🚧 Project Management UI
- 🚧 Research Interface
- 🚧 Chat Interface
- 🚧 Report Generation

## Getting Started

### Prerequisites

- Node.js v14 or higher
- MongoDB (local or Atlas)
- Deep Research API running (local or hosted)

### Installation

1. Clone the repository
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/consultant-research
JWT_SECRET=your_jwt_secret_key
DEEP_RESEARCH_API_URL=http://localhost:3051
```

5. Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:4000/api
```

### Running the Application

1. Start MongoDB (if running locally):

```bash
mongod
```

2. Start the backend server:

```bash
cd backend
npm run dev
```

3. Start the frontend development server:

```bash
cd frontend
npm start
```

4. Access the application at `http://localhost:3000`

## Usage

1. Register a consultant account
2. Create a new client project
3. Start a research session:
   - Enter your research query
   - Select a template (Quick Overview, Deep Dive, etc.)
   - Customize depth and breadth if needed
   - Add client context and industry focus
4. View real-time research progress
5. Generate client-ready reports from research results

## Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new consultant
- `POST /api/auth/login` - Login to the system
- `GET /api/auth/me` - Get current authenticated user

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects for the authenticated user
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `POST /api/projects/:id/team` - Add a team member to a project
- `DELETE /api/projects/:id/team/:userId` - Remove a team member from a project

### Research
- `POST /api/research` - Initiate a new research session
- `GET /api/research/:id` - Get a specific research session
- `GET /api/research/project/:projectId` - List research sessions for a project

## Development Roadmap

1. Complete Frontend UI Implementation
2. Add Report Generation Service
3. Implement Chat Interface
4. Add Real-time Research Updates
5. Implement Team Collaboration Features
6. Add Analytics Dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 