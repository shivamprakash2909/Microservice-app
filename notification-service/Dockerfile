FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

#Expose applicartion poer
EXPOSE 5003

CMD ["npm", "run", "start"]