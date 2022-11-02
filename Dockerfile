FROM node:19-alpine

WORKDIR /server

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY src ./src

EXPOSE 4000
CMD ["node", "src/index.js"]
