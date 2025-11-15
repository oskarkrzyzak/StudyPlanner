# Use official Node.js runtime
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files if they exist (MVP may not have yet)
COPY package*.json ./

# Install dependencies (will skip if none)
RUN npm install || echo "No package.json yet"

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Default command (placeholder server)
CMD ["node", "server.js"]
