# Hotel Management System - Technical Context

## Technologies Used

### Backend Stack

| Technology | Purpose | Description |
|------------|---------|-------------|
| Node.js | Runtime Environment | JavaScript runtime for building the server-side application |
| Express.js | Web Framework | Handles HTTP requests, routing, and middleware integration |
| Sequelize | ORM | Object-Relational Mapping for database interactions |
| MySQL | Database | Relational database for storing application data |
| CORS | Middleware | Cross-Origin Resource Sharing support |
| dotenv | Configuration | Environment variable management (.env file present) |

### Frontend Stack

| Technology | Purpose | Description |
|------------|---------|-------------|
| React | UI Library | Component-based UI development |
| Vite | Build Tool | Fast development server and build optimization |
| Tailwind CSS | Styling | Utility-first CSS framework for styling components |
| React Router | Routing | Client-side routing between application pages |
| Shadcn UI | Component Library | UI component collection based on Radix UI |
| Axios | HTTP Client | Promise-based HTTP client for API requests |
| Lucide React | Icons | Icon library for UI elements |
| ESLint | Code Quality | JavaScript/React code linting |
| PostCSS | CSS Processing | CSS transformation and optimization |

## Development Setup

### Prerequisites
- Node.js and npm installed
- MySQL database server installed and configured
- Git for version control

### Backend Setup
1. Clone the repository
2. Navigate to the `backend-hotel` directory
3. Install dependencies with `npm install`
4. Configure environment variables in `.env` file:
   ```
   PORT=5000
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_NAME=hoteldb
   DB_HOST=127.0.0.1
   ```
5. Set up the database using MySQL
6. Start the development server with `node server.js`

### Frontend Setup
1. Navigate to the `frontend-app` directory
2. Install dependencies with `npm install`
3. Configure environment variables in `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api/v1
   ```
4. Start the development server with `npm run dev`
5. Access the application at the provided local URL (typically http://localhost:5173)

## Project Structure

### Backend Structure
```
backend-hotel/
├── config/             # Configuration files
│   ├── config.json     # Database configuration
│   └── database.js     # Database connection setup
├── controllers/        # Request handlers
│   ├── guestsController.js
│   └── roomController.js
├── middleware/         # Express middleware
│   └── errorHandler.js
├── models/             # Sequelize models
│   ├── DynamicPricing.js
│   ├── Guests.js
│   ├── Mainentance.js
│   ├── Notifications.js
│   ├── Payments.js
│   ├── Reservations.js
│   ├── RoomDetails.js
│   ├── Rooms.js
│   ├── RoomType.js
│   ├── Services.js
│   ├── ServiceUsage.js
│   ├── Users.js
│   ├── feedback.js
│   ├── index.js
│   └── room_types.js
├── routes/             # API routes
│   ├── Rooms.js
│   ├── RoomTypes.js
│   ├── guestsRoutes.js
│   └── roomRoutes.js
├── seeders/            # Database seed data
├── .env                # Environment variables
├── package.json        # Project dependencies
└── server.js           # Main application entry point
```

### Frontend Structure
```
frontend-app/
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # App configuration
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── BookingSteps/   # Booking workflow components
│   │   ├── Guests/         # Guest management components
│   │   ├── RoomManagement/ # Room management components
│   │   ├── Settings/       # Settings components
│   │   ├── sidebar/        # Sidebar navigation
│   │   └── ui/             # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Technical Constraints

### Performance Considerations
- Database query optimization for large datasets (rooms, reservations)
  - Current implementation uses basic Sequelize queries
  - Room availability search uses SQL literals for complex queries
- Frontend rendering performance with complex UI components
  - Collapsible components used for detailed information display
  - Large lists use scrollable containers
- API response times for critical operations
  - Current implementation has basic error handling but limited optimization

### Security Requirements
- Secure authentication and authorization (not yet implemented)
- Protection of sensitive guest information
  - Basic data structure in place but security measures not evident
- Secure payment processing (not yet implemented)
- Input validation and sanitization
  - Basic validation in controllers (e.g., capitalizeWords function)
  - More comprehensive validation needed
- Protection against common web vulnerabilities (not yet implemented)

### Scalability Concerns
- Handling peak booking periods
  - Current implementation has no specific optimizations
- Supporting multiple concurrent users
  - Basic Express setup without specific concurrency handling
- Database scaling for growing data volume
  - No specific indexing or optimization strategies evident

## Dependencies and Integrations

### Backend Dependencies
From package.json:
- Express.js for API routing and middleware
- Sequelize for ORM functionality
- MySQL2 for database connectivity
- CORS for cross-origin resource sharing
- dotenv for environment variable management

### Frontend Dependencies
From package.json:
- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components (based on Radix UI)
- Axios for API requests
- Lucide React for icons
- Class-variance-authority for component styling
- Clsx for conditional class names
- Tailwind-merge for merging Tailwind classes

### Potential External Integrations
- Payment gateways for processing transactions (not yet implemented)
- Email/SMS services for notifications (not yet implemented)
- Third-party booking platforms (not yet implemented)
- Reporting and analytics tools (not yet implemented)

## Development Workflow

### Code Organization
- Feature-based component organization
  - Frontend components grouped by feature area (BookingSteps, RoomManagement, etc.)
  - Backend organized by MVC pattern
- Separation of concerns between frontend and backend
  - Clear API boundaries
  - Frontend focused on UI and user interaction
  - Backend focused on data processing and storage
- UI components separated for reusability
  - Common UI components in src/components/ui
  - Feature-specific components in dedicated directories

### Testing Approach
No formal testing implementation is evident in the codebase:
- No test files or testing libraries found
- No testing scripts in package.json
- Testing strategy needs to be established

### Deployment Considerations
- Environment-specific configurations via .env files
- No visible CI/CD configuration
- API versioning approach started (routes prefixed with /api/v1/)
- No database migration scripts evident

This technical context document provides an overview of the technologies, structure, and technical considerations for the Hotel Management System. It serves as a reference for understanding the technical foundation of the project.
