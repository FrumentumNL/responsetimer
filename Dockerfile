FROM node:18.16.0-alpine
COPY . /app
WORKDIR /app
CMD ["yarn", "start"]
