FROM node:19

WORKDIR /app

COPY package.json* /app

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD [ "npm", "run dev" ]