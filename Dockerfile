FROM node:19.5.0-alpine AS installer

WORKDIR /app

COPY . .
RUN npm install -g @angular/cli
RUN npm install

FROM node:19.5.0-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY --from=installer /app .
RUN ls -a /app

RUN npm run build

FROM nginx as production
ENV NODE_ENV production

RUN rm /usr/share/nginx/html/*
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 2000

CMD ["nginx", "-g", "daemon off;"]

# FROM node AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:1.21.0-alpine

# COPY --from=build /app/dist/frontend /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]




# docker build -t final-project .
