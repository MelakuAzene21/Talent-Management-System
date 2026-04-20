# Talent Management Backend System

A robust RESTful API built with NestJS for managing talent profiles. This system provides secure CRUD operations for talent management with JWT-based authentication and comprehensive input validation.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

### Core Functionality
- **Talent Profile Management**: Complete CRUD operations for talent profiles
- **Secure Authentication**: JWT-based authentication system for admin access
- **Input Validation**: Comprehensive validation with detailed error messages
- **Database Integration**: TypeORM with SQLite for development, PostgreSQL ready for production
- **RESTful API**: Clean, well-structured API endpoints following REST principles

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Endpoints**: Admin-only access for write operations
- **Input Sanitization**: Protection against injection attacks
- **CORS Support**: Configurable cross-origin resource sharing

### Development Features
- **Hot Reload**: Development server with auto-restart
- **Environment Configuration**: Flexible environment-based configuration
- **Database Migrations**: TypeORM migration support
- **Comprehensive Error Handling**: Proper HTTP status codes and error messages
- **API Documentation**: Clear endpoint documentation with examples

## Technology Stack

### Backend Framework
- **NestJS**: Progressive Node.js framework for building efficient applications
- **TypeScript**: Type-safe JavaScript for better code quality

### Database & ORM
- **TypeORM**: Powerful ORM for TypeScript and JavaScript
- **SQLite**: Lightweight database for development
- **PostgreSQL**: Production-ready database support

### Authentication & Security
- **JWT**: JSON Web Tokens for secure authentication
- **Passport.js**: Authentication middleware for Node.js
- **bcrypt**: Password hashing library

### Validation & Documentation
- **class-validator**: Decorator-based validation
- **class-transformer**: Object transformation
- **Swagger**: API documentation (ready to implement)

### Development Tools
- **Jest**: Testing framework
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **nodemon**: Auto-restart during development

## Project Structure

```
src/
|-- auth/                    # Authentication module
|   |-- auth.controller.ts   # Login endpoint
|   |-- auth.module.ts       # Auth module configuration
|   |-- auth.service.ts      # Authentication logic
|   |-- dto/                 # Data transfer objects
|   |   |-- login.dto.ts     # Login validation
|   |-- guards/              # Authentication guards
|   |   |-- jwt-auth.guard.ts
|   |   |-- local-auth.guard.ts
|   |-- strategies/          # Passport strategies
|       |-- jwt.strategy.ts  # JWT authentication
|       |-- local.strategy.ts # Local authentication
|-- talents/                 # Talent management module
|   |-- talents.controller.ts # Talent CRUD endpoints
|   |-- talents.module.ts     # Talent module configuration
|   |-- talents.service.ts    # Talent business logic
|   |-- dto/                  # Data transfer objects
|   |   |-- create-talent.dto.ts
|   |   |-- update-talent.dto.ts
|   |-- entities/             # Database entities
|       |-- talent.entity.ts
|-- users/                   # User management module
|   |-- entities/
|       |-- user.entity.ts    # User entity for authentication
|-- app.module.ts            # Root application module
|-- main.ts                  # Application entry point
|-- .env                     # Environment variables
```

## API Documentation

### Base URL
- Development: `http://localhost:3001`
- Production: `https://your-domain.com`

### Response Format
All API responses follow a consistent format:

```json
{
  "data": {}, // Response data
  "message": "Success message", // Optional message
  "statusCode": 200 // HTTP status code
}
```

### Error Response Format
```json
{
  "statusCode": 400,
  "message": ["Validation error details"],
  "error": "Bad Request"
}
```

## Installation & Setup

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Git**: For version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/MelakuAzene21/Talent-Management-System.git
cd talent-management-backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create and configure your environment file:
```bash
cp src/.env.example src/.env
```

Edit `src/.env` with your configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=talent_admin
DB_PASSWORD=SecurePassword123
DB_DATABASE=talent_management

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production

# Server Configuration
PORT=3001
```

### Step 4: Database Setup
The application uses SQLite for development (configured in app.module.ts). The database file will be created automatically when you start the application.

For PostgreSQL production setup:
1. Install PostgreSQL
2. Create database and user
3. Update environment variables
4. Modify TypeORM configuration in app.module.ts

## Running the Application

### Development Mode
```bash
npm run start:dev
```
The application will start on `http://localhost:3001` with hot reload enabled.

### Production Mode
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Endpoints

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "admin"
  }
}
```

### Talent Management Endpoints

#### Get All Talents (Public)
```http
GET /talents
```

**Response:**
```json
[
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "primarySkill": "JavaScript",
    "yearsOfExperience": 5,
    "description": "Experienced full-stack developer...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Talent by ID (Public)
```http
GET /talents/:id
```

#### Create Talent (Protected)
```http
POST /talents
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "primarySkill": "Python",
  "yearsOfExperience": 3,
  "description": "Python developer with expertise in Django and Flask..."
}
```

#### Update Talent (Protected)
```http
PUT /talents/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "primarySkill": "Python/Django",
  "yearsOfExperience": 4
}
```

#### Delete Talent (Protected)
```http
DELETE /talents/:id
Authorization: Bearer <jwt_token>
```

**Response:** `204 No Content`

## Authentication

### Default Admin User
The system automatically creates a default admin user on first startup:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change the default password in production!

### JWT Token Usage
1. Login to get a JWT token
2. Include the token in the Authorization header for protected endpoints:
   ```http
   Authorization: Bearer <your_jwt_token>
   ```

### Token Expiration
- JWT tokens expire after 24 hours
- You'll need to login again to get a new token

## Database Schema

### Talent Entity
```typescript
interface Talent {
  id: string;              // UUID primary key
  fullName: string;        // 2-100 characters
  email: string;          // Unique, valid email format
  primarySkill: string;    // 2-50 characters
  yearsOfExperience: number; // 0-50 years
  description: string;     // 10-500 characters
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-updated
}
```

### User Entity
```typescript
interface User {
  id: string;              // UUID primary key
  username: string;        // Unique username
  password: string;        // Hashed password
  role: string;           // User role (admin, user)
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-updated
}
```

## Validation Rules

### Create Talent Validation
- **fullName**: Required, 2-100 characters
- **email**: Required, valid email format, unique
- **primarySkill**: Required, 2-50 characters
- **yearsOfExperience**: Required, integer, 0-50
- **description**: Required, 10-500 characters

### Login Validation
- **username**: Required, non-empty string
- **password**: Required, non-empty string

## Error Handling

### HTTP Status Codes
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Resource deleted successfully
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid or missing authentication
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (duplicate email)

### Error Response Examples

**Validation Error (400):**
```json
{
  "statusCode": 400,
  "message": [
    "fullName should not be empty",
    "email must be an email",
    "yearsOfExperience must not be greater than 50"
  ],
  "error": "Bad Request"
}
```

**Authentication Error (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Not Found Error (404):**
```json
{
  "statusCode": 404,
  "message": "Talent with ID uuid-not-found not found",
  "error": "Not Found"
}
```

**Conflict Error (409):**
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

## Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Test Structure
- Unit tests for services and controllers
- Integration tests for API endpoints
- E2E tests for complete workflows

## Deployment

### Production Deployment Steps

1. **Environment Setup**
   ```bash
   # Set production environment
   export NODE_ENV=production
   
   # Update production environment variables
   # Update JWT_SECRET with a strong secret
   # Configure production database
   ```

2. **Database Migration**
   ```bash
   # Run database migrations
   npm run db:migrate:run
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm run start:prod
   ```

### Docker Deployment (Optional)
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/main"]
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your_super_secure_production_jwt_secret
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-db-password
DB_DATABASE=talent_management_prod
```

## Security Considerations

### Production Security Checklist
- [ ] Change default admin password
- [ ] Use strong JWT secret (minimum 32 characters)
- [ ] Enable HTTPS in production
- [ ] Configure proper CORS origins
- [ ] Use environment-specific database credentials
- [ ] Implement rate limiting for API endpoints
- [ ] Add request logging and monitoring
- [ ] Regular security updates for dependencies

### Password Security
- Passwords are hashed using bcrypt
- Minimum password length: 8 characters
- Password strength validation recommended

### API Security
- JWT tokens expire after 24 hours
- Protected endpoints require valid authentication
- Input validation prevents injection attacks
- CORS configuration prevents unauthorized access

## Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Write comprehensive tests for new features
3. Update documentation for API changes
4. Use meaningful commit messages
5. Follow the existing code style

### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Troubleshooting

### Common Issues

**Issue: "JwtStrategy requires a secret or key"**
- Solution: Ensure JWT_SECRET is set in .env file
- Check that ConfigModule is loading the .env file correctly

**Issue: Database connection errors**
- Solution: Verify database configuration in .env
- Ensure database server is running
- Check database credentials

**Issue: Port already in use**
- Solution: Change PORT in .env file or kill the process using the port

**Issue: Permission denied errors**
- Solution: Check file permissions for .env and database files
- Ensure proper user permissions

### Debug Mode
Enable debug logging for troubleshooting:
```bash
npm run start:debug
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support regarding this project, please contact:
- Email: your-email@example.com
- GitHub: your-github-username

---

**Note**: This is a demonstration project showcasing NestJS development skills. In a production environment, additional security measures, monitoring, and scaling considerations would be implemented.
