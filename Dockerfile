# Fetching the latest node image on alpine linux
FROM node:20-alpine

# git setup

# RUN git checkout ui
# RUN git pull --force
# RUN cd ./frontend

# Declaring env
# ENV NODE_ENV development
# RUN cd ./frontend
# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./frontend/package*.json .

RUN npm install

# COPY package-lock.json .

# Copying all the files in our project
COPY  ./frontend .

EXPOSE 5173
# Starting our application
CMD ["npm","run", "dev"]