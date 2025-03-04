# Используем Node.js для сборки React
FROM node:20-alpine AS build

WORKDIR /app

# Копируем package.json и package-lock.json (если он есть)
COPY package.json package-lock.json ./

# Устанавливаем зависимости через npm
RUN npm install

# Копируем весь код и собираем проект
COPY . .
RUN npm run build

# Используем Nginx для раздачи статики
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Добавляем конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]