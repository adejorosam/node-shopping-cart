FROM node:14

WORKDIR /paystack-test
COPY package.json .
RUN npm install
COPY . .
CMD npm start