# Stage 1
FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY .npmrc /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/telescopeV2 /usr/share/nginx/html
COPY .DOCKER_FILES/nginx/default.conf /etc/nginx/conf.d
EXPOSE 80