FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 3600

CMD ["npm", "run", "dev"]