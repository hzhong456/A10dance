FROM node:16
WORKDIR /server
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
