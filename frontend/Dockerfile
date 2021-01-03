FROM node:10.15.2-alpine
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install
COPY src /frontend/src
COPY public /frontend/public
