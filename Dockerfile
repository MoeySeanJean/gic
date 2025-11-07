FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./
COPY backend/prisma/schema.prisma ./

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:22-alpine

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
