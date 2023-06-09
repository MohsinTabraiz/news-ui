# Setup
- cp .env.example .env (You may want to change the URL of the api, if you decide to run it on another domain but change the URL in the .env please to make it work.)
- I have created two separate docker-composer.yml files for Development and Production, Just to demonstrate I know working with Docker very well.
You may run them like this:
`docker-compose -f docker-compose.dev.yml up -d`
`docker-compose -f docker-compose.prod.yml up -d`


# Used
- ContextAPI

# Wanted to (and can do!) but could not do due to time limitations...
- Redux
- More proper and even more centralized error handling
- Tests
- Typescript
