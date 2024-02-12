FROM node:lts-alpine

WORKDIR /usr/src/spend-weather

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
