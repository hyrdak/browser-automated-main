# Use an official Node runtime as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN pnpm install

# Copy the application code to the container
COPY . .

# Build the React app
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "start"]