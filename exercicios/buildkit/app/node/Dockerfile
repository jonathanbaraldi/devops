
FROM node

# Autor/Mantenedor
MAINTAINER Jonathan Baraldi


RUN mkdir -p /src 
	# Instalar MariaDB SQL e rodar o script para injetar o SQL

	# Definir diretório de trabalho
WORKDIR /src
ADD . /src

	# Expor porta 80
EXPOSE  8080

	# Rodar o app usando nodemon
CMD ["node", "/src/index.js"]