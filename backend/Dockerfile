FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma ./

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]