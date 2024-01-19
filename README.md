# Development
Pasos para levantar la app en Desarrollo

1.  levantar la bases de datos
```
docker compose up -d
```
2. copiar el .env.example y luego esa copia renombrarla a .env
3. Reemplazar las variables de entorno por las pertinentes
4. ejecutar el comando ``` npm install```
5. Ejecutar el comando ``` npm run dev```
6. Ejecutar la migración de prisma con el comando ```npm prisma migrate dev```
6. Ejecutar generar el cliente con ```npm prisma generate```
8. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed) 

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```