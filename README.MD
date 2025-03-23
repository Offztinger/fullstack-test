docker-compose up -d
docker-compose down -v
npx prisma generate
npx prisma migrate dev --name init