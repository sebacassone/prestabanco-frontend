# Stage 1: Build
FROM node:20-alpine AS build

# Es una aplicación de React
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copiar desde la "Etapa" build el contenido de la carpeta build/
# dentro del directorio indicado en nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar desde la "Etapa" build el contenido de la carpeta la 
# configuracion de nginx dentro del directorio indicado en nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENV VITE_PAYROLL_BACKEND_SERVER=$VITE_PAYROLL_BACKEND_SERVER

# Expone el puerto 3000
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]

