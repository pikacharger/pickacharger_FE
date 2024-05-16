FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:latest

COPY ./dist /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d

COPY ./service-env.inc /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]