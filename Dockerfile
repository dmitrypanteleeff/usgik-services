FROM node:18.17.1 as node

WORKDIR /app

COPY . .
RUN npm install
RUN npm install build --prod

FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs
COPY --from=node /app/dist/my-app .
