# Development
Pasos para levantar la app en Desarrollo

1.  levantar la bases de datos
```
docker compose up -d
```
2. Renombrar el .env.example a .env
3. Reemplazar las variables de entorno por las pertinentes
4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed) 

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```