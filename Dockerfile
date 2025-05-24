FROM node:18.19.

WORKDIR /App

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
