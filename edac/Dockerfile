# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app


# Install deps
COPY package*.json ./
RUN npm ci


# Copy the rest and build
COPY . .
# You can point the frontend to the backend via a build-time env
ARG REACT_APP_API_BASE_URL=/api
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build


# ---------- Runtime stage (Nginx) ----------
FROM nginx:alpine
# Custom nginx conf that proxies /api to the backend service
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf


# Static files
COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]