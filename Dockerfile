FROM node:18

WORKDIR /app

COPY StudyPlanner-backend/package*.json ./
RUN npm install

COPY StudyPlanner-backend .

EXPOSE 8080

CMD ["node", "server.js"]