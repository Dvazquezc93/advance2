FROM node:24-alpine AS descarga
WORKDIR /app
RUN npm install grapesjs@0.23.9 font-awesome@4.7.0

FROM nginx:alpine
COPY --from=descarga /app/node_modules/grapesjs/dist/ /usr/share/nginx/html/grapesjs/
COPY --from=descarga /app/node_modules/grapesjs/locale/es.mjs /usr/share/nginx/html/grapesjs/es.js
COPY --from=descarga /app/node_modules/font-awesome/ /usr/share/nginx/html/fa/
COPY index.html /usr/share/nginx/html/index.html