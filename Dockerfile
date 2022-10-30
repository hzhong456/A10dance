FROM node:19-alpine

WORKDIR /server

COPY package*.json ./
RUN npm ci --only=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src ./src
RUN npm run build

EXPOSE 4000
CMD ["node", "index.js"]
