FROM node:19-alpine as builder

WORKDIR '/webui'

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY public ./public
COPY src ./src

ARG REACT_APP_BACKEND_URL='http://localhost:4000'
ENV REACT_APP_BACKEND_URL ${REACT_APP_BACKEND_URL}

RUN npm run build

FROM nginx

COPY --from=builder /webui/build /usr/share/nginx/html

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY conf /etc/nginx