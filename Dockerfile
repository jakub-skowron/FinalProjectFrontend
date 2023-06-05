FROM node AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
