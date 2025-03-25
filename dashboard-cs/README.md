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

## Ejecuta el proyecto

```bash
# abre docker, y escribe en consola
$ docker start postgres_nest

# comandos para prisma
$ npx prisma generate
# solo ejecutar en caso de que la migración lo pida
$ npx prisma migrate reset
# ejecutar una migración
$ npx prisma migrate dev --name first_migration

# development
$ npm run start
```

## JUSTIFICACIÓN BACKEND

Se explica la lógica y estructura detrás de cada métrica ofrecida por el servicio `DashboardService`.

### `getSummary`

Consulta el total de tareas del usuario y agrupa por estado (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `DELETED`).
Permite calcular el porcentaje de completitud (`completionRate`) para una visión general.

### `getTasksByCategory`

Agrupa las tareas activas (`deleted_at: null`) por categoría (`WORK`, `STUDY`, `PERSONAL`, `OTHER`, etc.) usando `groupBy`.
Esta métrica refleja cuáles son las categorías más usadas por el usuario.

### `getWeeklyTrend`

Agrupa las tareas completadas (`COMPLETED`) por semana ISO (`YYYY-Www`), permitiendo visualizar cómo ha cambiado la productividad semana a semana.
Se utiliza `date-fns` y `toZonedTime` para ajustar correctamente la zona horaria (`America/Bogota`).

### `getProductivityByDay`

Agrupa las tareas completadas por día de la semana (`Sunday` a `Saturday`) para identificar en qué días el usuario es más productivo.

### `getCompletionRate`

Calcula el porcentaje de tareas completadas sobre el total de tareas activas (`deleted_at: null`).
Permite saber cuántas tareas logra finalizar el usuario.

### `getAverageCompletionTime`

Calcula el tiempo promedio entre la creación (`created_at`) y finalización (`completed_at`) de tareas completadas.
Devuelve el valor en minutos (`averageMinutes`) y horas (`averageHours`) para facilitar su visualización.

### `getAbandonmentRate`

Calcula cuántas tareas fueron abandonadas (eliminadas sin completarse) sobre el total de tareas activas no finalizadas.
Es útil para detectar tareas desatendidas. Aplica a tareas con `status` en `PENDING` o `IN_PROGRESS` y `completed_at: null`.

### `getFullReport`

Endpoint que consolida todos los datos anteriores en un único objeto exportable.
Incluye la marca de tiempo `generatedAt` y sirve como base para exportar el dashboard en formato JSON.
