FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

ENV MONGODB_URI=$(MONGODB_URI)

COPY . .

EXPOSE 3001

CMD [ "node", "index.js" ]