FROM node:20-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

# Запускаем dev-сервер
CMD ["npm", "run", "start"]