## DASHBOARD BACKEND

Se hace uso de NEST, un framework de Node.js, hace uso de Prisma como ORM, para la conexión con la base de datos PostgreSQL. Con la ventaja de que mapea los modelos de TypeScript al esquema de base de datos, permite la creacion, lectura, actualización y eliminación de datos usando código TypeScript sin escribir SQL directamente.

## Instalación rapida

```bash
# Entorno de desarrollo
$ nvm install 20.11.1
$ nvm use 20.11.1

# Dependencias
$ npm install

# Persistencia
$ docker-compose up -d
```

## Run the project

```bash
# abre docker, y escribe en consola
$ docker start postgres_nest

#comandos para prisma
$ npx prisma generate
$ npx prisma migrate dev --name first_migration

# development
$ npm run start
```