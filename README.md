# WebUI
This is the web interface for A10Dance.

## Overriding backend URL
By default, the backend will be queried at (http://localhost:4000)[http://localhost:4000].
This can be overridden by setting the REACT_APP_BACKEND_URL environment variable.

## Building
1. Run `npm install`.
2. Run `npm run build`.

## Running
1. Run `npm run start`.
2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build in Docker
1. Ensure you are in the directory with the Dockerfile.
2. Run `docker build --build-arg REACT_APP_BACKEND_URL='http://localhost:4000' -t username/attendance-webui:version .`.

## Run in Docker
1. Run `docker run -p 3000:80 -d username/attendance-webui:version`.
2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.