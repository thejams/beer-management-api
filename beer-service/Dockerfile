# pull a node image from docker hub
FROM node:10-alpine

# set the working dir to /beer-service
WORKDIR /beer-service 

# copy package.json to the container
COPY package.json package.json

# install package.json modules in container
# install nodemon for changes on the fly
RUN npm install && \ 
    npm install -g nodemon 

# copy everything to container /beer-service
COPY . . 

# expose port 4000 to mount it to another port in local machine 
EXPOSE 4000

# start server inside container
CMD [ "nodemon", "src/index.js" ] 