# Use the official Node.js image
FROM node:23-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the project source code into the container
COPY . .

# Expose the Next.js port (default: 3000)
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
