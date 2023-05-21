FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .
# Install dependencies
RUN npm install
# Copy app files
COPY . .
# Expose port for development
EXPOSE 3000
# Start the app
CMD ["npm", "start"]

FROM node:16-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .
# Install dependencies
RUN npm install --production
# Copy app files
COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port for production
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
