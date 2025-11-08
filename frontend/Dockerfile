# Use the official Node.js image
FROM node:23-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the project source code into the container
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# Expose the Next.js port (default: 3000)
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
