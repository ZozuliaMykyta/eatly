# Use the official Node.js image
FROM node:23-alpine3.20

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the project source code into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the Node.js port (default: 5000)
EXPOSE 5000

# Start the production server
CMD ["npm", "start"]