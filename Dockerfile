FROM node

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 8000

CMD [ "yarn", "start" ]