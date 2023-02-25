FROM node:18.12.1
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "index.js"]