FROM node:20.12.2-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the application will run on
EXPOSE 3333

# Build & start the application
CMD npm run build && node ./dist/server.js
