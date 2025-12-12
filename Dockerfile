# Build stage
FROM node:22-alpine

ARG SERVICE_NAME
ENV APP=${SERVICE_NAME} 

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "preview", "--", "--port", "4000", "--host", "0.0.0.0"]
