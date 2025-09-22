# Calorify - Backend

Este proyecto es el backend de un MVP de un tracker de calorías y macros, desarrollado en NestJS. La aplicación permite:

- Registro y autenticación de usuarios (JWT).  
- Creación y gestión de alimentos personalizados con calorías y macros (proteínas, carbohidratos y grasas).  
- Creación de planes diarios vacíos, con límite de calorías y macros.  
- Agregar alimentos a los planes diarios, actualizando automáticamente las calorías y macros consumidos.  
- Consultar el estado del plan diario para ver totales y límites.

Este backend está diseñado para servir como API que puede ser consumida por aplicaciones web o móviles.  

## Tecnologías
- NestJS  
- TypeORM / Prisma  
- SQLite / PostgreSQL (según configuración)  
- JWT para autenticación  

## Flujo mínimo de uso
1. Crear usuario → `/auth/register`  
2. Loguearse → `/auth/login`  
3. Crear alimentos → `/foods`  
4. Crear plan diario → `/daily-plan`  
5. Agregar alimentos al plan → `/daily-plan/:id/add-food`  
6. Consultar plan diario → `/daily-plan/:date`  

## Objetivo del MVP
Demostrar la funcionalidad central del tracker de calorías y macros, permitiendo añadir alimentos a planes diarios y ver el progreso de calorías y macros consumidos, listo para ser consumido por un frontend web o móvil.
