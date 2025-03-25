## DASHBOARD FRONTEND

Se hace uso de React + Vite. Usando react-router-dom para el enrutamiento, react-hook-form para formularios, Zustand para manejo de estados, custom hooks. El diseño es responsivo, usa TailwindCSS, se adapta bien a escritorio hasta tabletas, y utiliza Recharts para una visualización clara y moderna. Las métricas se pueden activar/desactivar desde un panel de filtros dando click donde visualice su nombre de usuario solo al estar sobre /dashboard, y también se puede exportar el resumen como JSON desde la vista de tareas.

## Instalación rapida

```bash
# Entorno de desarrollo
$ nvm install 20.11.1
$ nvm use 20.11.1

# Dependencias
$ npm install
```

## Ejecuta el proyecto

```bash
# development
$ npm run dev
```

## JUSTIFICACIÓN DASHBOARD

Se da explicación por metrica empleada para el dashboard.

### Resumen general:

Muestra el total de tareas por estado y el porcentaje completadas. Da una visión rápida del estado actual de las tareas.

### Tareas más recurrentes por categoría:

Pie chart para visualizar en qué áreas se concentra la carga de trabajo (laboral, personal, estudio, etc.).

### Tendencia de productividad (últimas semanas):

Gráfico de líneas que permite ver cómo evoluciona la productividad a lo largo del tiempo.

### Días de mayor productividad:

Gráfico de barras que indica en qué días el usuario suele ser más productivo.

### Porcentaje de completadas vs pendientes:

Compara visualmente en porcentaje las tareas hechas frente a las pendientes.

### Tiempo promedio (creación hasta completitud):

Calcula el tiempo medio que el usuario tarda en completar una tarea en minutos u horas. Ayuda a estimar y mejorar tiempos.

### Tasa de abandono:

Mide cuántas tareas no fueron completadas y terminaron eliminadas en porcentaje. Útil para detectar posibles bloqueos o falta de seguimiento.


