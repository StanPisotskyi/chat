FROM node:20.10.0
WORKDIR /usr/src/app
COPY app/package*.json .
RUN npm ci
COPY app/src .
EXPOSE 3000
CMD ["npm", "run-script", "run"]