# Use a specific Node.js version (adjust as needed)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install
RUN npm install -g typescript
RUN tsc --version

# Create the dist directory for compiled TypeScript files
RUN mkdir dist

# Copy TypeScript source files
COPY src/* .

# Compile TypeScript to dist directory
RUN tsc -b

# Expose Node.js port (adjust if needed)
EXPOSE 3001

# Start the server
CMD ["node", "dist/index.js"]
