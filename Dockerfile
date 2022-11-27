FROM node:16-slim
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN npm install --omit=dev
COPY . .
CMD [ "npm", "start" ]