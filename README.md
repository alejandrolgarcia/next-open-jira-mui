# Nextjs OpenJira App

Para correr localmente el proyecto y generar la base de datos, ejecute el comando:

```
docker-compose up -d
```

* El -d significa __detached__

* MongoDB Local URL

```
mongodb://localhost:27017/entriesdb
```

## Configurar variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Generación de información de pruebas en la base de datos

GET al servicio:
```
    http://localhost:3000/api/seed
```
