FROM node

WORKDIR /home/node/dockentication

ADD index.mjs .
ADD package.json .
ADD ssl/key.pem .
ADD ssl/server.crt .

RUN npm install

RUN pwd

EXPOSE 3005

CMD ["npm", "start"]