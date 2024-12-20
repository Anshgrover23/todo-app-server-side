# use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in container
WORKDIR /app

# copy the package.json and package-lock.json file to the container
COPY package*.json .

# Install the dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Expose the port that the app runs on
EXPOSE 8080

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# run prisma generate
RUN npx prisma generate

#Define the command to run up application
ENTRYPOINT [ "node", "./src/server.js" ]


