FROM node:16
WORKDIR /server
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .
