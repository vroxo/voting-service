## Installing the required packages
FROM node:18-alpine as setup
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .

## Migration
# FROM setup as migration
# WORKDIR /usr/src/app
# CMD ["yarn", "typeorm:run"]

## Building the app
FROM setup as build
RUN npm run build

## Image for Development
FROM setup as development
ENV NODE_ENV=development

## Image for Production
FROM node:18-alpine as production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package.json .
COPY package-lock.json .
COPY --from=build /usr/src/app/src/core/dist ./core/dist
COPY --from=build /usr/src/app/src/interface/dist ./interface/dist
RUN npm i --frozen-lockfile --production
CMD ["npm", "start"]
