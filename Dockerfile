# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy entire project
COPY . .

# Expose the server port
EXPOSE 5002

# Start the app
CMD ["node", "index.js"]
