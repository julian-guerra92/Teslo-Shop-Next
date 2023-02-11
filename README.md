# Teslo Shop - Next Js

Tienda virtual Teslo Shop creada a partir de Next.js. Para su inicilaización y uso tener en cuenta lo siguientes aspectos:

1. Instalar dependencias de la App usando el comando:

```
yarn install
```

2. Para iniciar la App en modo de desarrollo, se requiere el servicio de la base de datos. Para esto tener en cuenta la configuración del archivo `docker-compose.yml` y ejecutar el siguiente comando:

```
docker-compose up -d
```

3. MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

4. Para iniciar la aplicación en modo de desarrollo usar el comando:

```
yarn dev
```

5. Configurar las variables de entorno basado en el archivo __.env.template__ y renombrar a __.env__

6. Llenar la base de datos con información de prueba, mediante petición `get` al siguiente endpoint:
```
http://localhost:3000/api/seed
```