FROM node:16
EXPOSE 80
WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./ .

RUN yarn build

ENV NODE_ENV=production
ENV PORT=80

CMD ["yarn", "start"]