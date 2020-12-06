FROM node:14.15.0
WORKDIR /usr/src/app

# Install app dependencies 
COPY ./src/package*.json ./
RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY src/. .
EXPOSE 80 3000
RUN mkdir -p /usr/src/app/io
VOLUME [ "/app/io" ]

CMD ["npm", "start"]
