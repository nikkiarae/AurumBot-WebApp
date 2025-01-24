# Use the Node.js 18 base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Command to run the Next.js app in development mode
CMD ["npm", "run", "dev"]