FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install || echo "No package.json yet"

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
