# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de NPM
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Define el comando para ejecutar la aplicación
CMD ["serve", "-s", "dist", "-p", "5000"]

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000
