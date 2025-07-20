# Use the Node.js base image for building the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy only the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --immutable

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Use a new Node.js base image for running the application in production
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy only the package.json and package-lock.json to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --immutable

# Copy the necessary artifacts from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Remove unnecessary files and caches
RUN npm cache clean --force && \
    rm -rf /tmp/*

# Expose the application port
EXPOSE 3000

# Set the user to "node" for better security
USER node

# Start the application
CMD ["npm", "start"] 