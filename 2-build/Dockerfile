# Node 22 runs TypeScript without compiling, so there are no dependencies and no build.
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
USER node
CMD ["npm", "start"]
