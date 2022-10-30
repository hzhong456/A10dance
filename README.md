# Server
This is the backend server for A10Dance.

## Building
1. Run `npm install`.
2. Run `npm run build`.

## Running
1. Run `npm run start`.
2. The graphql server will be at [http://localhost:4000](http://localhost:4000).

## Build in Docker
1. Ensure you are in the directory with the Dockerfile.
2. Run `docker build -t username/attendance-node:version .`.

## Run in Docker
1. Run `docker run -p 4000:4000 -d username/attendance-node:version`.
2. The graphql server will be at [http://localhost:4000](http://localhost:4000).