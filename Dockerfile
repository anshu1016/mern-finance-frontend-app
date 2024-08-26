## Use an official Node.js runtime as a parent image
FROM node:22.2.0

# Set the working directory in the container
WORKDIR /app


# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Use a smaller base image for the production build
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=0 /app/dist /usr/share/nginx/html


# Expose the port the frontend runs on
EXPOSE 5173

# Start the app
CMD ["nginx", "-g", "daemon off;"]