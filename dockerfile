# Dockerfile - SÚPER SIMPLE
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Generar Prisma
RUN npx prisma generate

# Exponer puerto
EXPOSE 3000

# Iniciar app
CMD ["npm", "run", "start:dev"]