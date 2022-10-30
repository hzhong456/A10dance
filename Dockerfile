FROM node:19-alpine as builder

WORKDIR '/webui'

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY public ./public
COPY src ./src

RUN npm run build

FROM nginx

COPY --from=builder /webui/build /usr/share/nginx/html

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY conf /etc/nginx