FROM node:16-alpine3.14

EXPOSE 4000

WORKDIR /app

COPY . .

RUN npm install --only=prod

# Set up a default command
CMD [ "npm","start" ]