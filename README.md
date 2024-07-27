<p align="center">
  <a href="https://github.com/" target="blank"><img src="https://raw.githubusercontent.com/jatinderbhola/dicecape/main/1.png" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
A quick-to-go starter project for NestJS with Fastify, TypeORM, Swagger, SWC and more.
</p>

## Description

- TODO

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

## Stay in touch

- Author - [Jatinder Bhola](https://jatinderbhola.com)
- Framework - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).

## Project Structure

Creating an advanced project structure in NestJS involves organizing your code into modules, controllers, and services in a way that promotes maintainability, scalability, and ease of development. Here’s a comprehensive guide to structuring a NestJS project:

### Directory Structure

```plaintext
src
├── common
│   ├── constants
│   ├── decorators
│   ├── dtos
│   ├── filters
│   ├── guards
│   ├── interceptors
│   ├── interfaces
│   ├── middlewares
│   ├── pipes
│   └── utils
├── config
│   ├── configuration.ts
│   ├── validation.ts
│   └── configuration.interface.ts
├── modules
│   ├── logger
│   │   ├── logger.module.ts
│   │   ├── logger.service.ts
│   │   └── logger.constants.ts
│   ├── users
│   │   ├── controllers
│   │   │   └── users.controller.ts
│   │   ├── dtos
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── services
│   │   │   └── users.service.ts
│   │   ├── entities
│   │   │   └── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.constants.ts
│   └── ...
├── app.module.ts
├── main.ts
└── ormconfig.ts
```

### Detailed Explanation

1. **Common Module**:
   This contains shared resources such as constants, decorators, DTOs (Data Transfer Objects), filters, guards, interceptors, interfaces, middlewares, pipes, and utility functions.

   - **constants**: Shared constants.
   - **decorators**: Custom decorators.
   - **dtos**: Shared DTOs.
   - **filters**: Global and custom exception filters.
   - **guards**: Authorization guards.
   - **interceptors**: Logging, caching, etc.
   - **interfaces**: Shared interfaces.
   - **middlewares**: Middleware functions.
   - **pipes**: Validation and transformation pipes.
   - **utils**: Utility functions and helpers.

2. **Config Module**:
   This contains configuration files and validation schemas.

   - **configuration.ts**: Configuration settings.
   - **validation.ts**: Configuration validation schema.
   - **configuration.interface.ts**: Configuration interface.

3. **Modules**:
   This is where the application modules are defined. Each module should have its own directory.

   - **logger**: Example module for logging.

     - **logger.module.ts**: Logger module definition.
     - **logger.service.ts**: Logger service implementation.
     - **logger.constants.ts**: Constants related to the logger module.

   - **users**: Example module for users.
     - **controllers**: Contains the controllers for this module.
       - **users.controller.ts**: User controller implementation.
     - **dtos**: Contains DTOs specific to the module.
       - **create-user.dto.ts**: DTO for creating a user.
       - **update-user.dto.ts**: DTO for updating a user.
     - **services**: Contains the services for this module.
       - **users.service.ts**: User service implementation.
     - **entities**: Contains the entities (database models) for this module.
       - **user.entity.ts**: User entity definition.
     - **users.module.ts**: Users module definition.
     - **users.constants.ts**: Constants related to the users module.

4. **Root Module (app.module.ts)**:
   The root module of the application that imports other modules.

5. **Main Entry Point (main.ts)**:
   The main entry point of the application that bootstraps the NestJS application.

6. **ORM Configuration (ormconfig.ts)**:
   The configuration file for the ORM (e.g., TypeORM) if using a database.
