FROM node

WORKDIR /home/node/dockentication

ADD index.mjs .
ADD package.json .
#ADD ssl/key.pem .
#ADD ssl/server.crt .

RUN npm install

RUN pwd
RUN nohup bash -c "cd /home/node/dockentication && npm start" &

EXPOSE 3005

CMD ["npm", "start"]

#ENTRYPOINT ["/bin/bash", "-c", "cd /home/node/dockentication && npm start", "&&"]
