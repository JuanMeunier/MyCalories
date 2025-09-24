# Foddy's - Backend MVP

Este proyecto es el backend de un MVP de un tracker de calorías y macros, desarrollado en NestJS. La aplicación permite:

- ✅ **Registro y autenticación de usuarios** (JWT)
- ✅ **Creación y gestión de alimentos** personalizados con calorías y macros
- ✅ **Creación de planes diarios** con límite de calorías
- ✅ **Agregar alimentos a planes diarios** actualizando automáticamente los totales
- ✅ **Consultar estado del plan diario** para ver progreso
- ✅ **Sistema de autenticación completo** con JWT Guards
- ✅ **Documentación Swagger** interactiva

## 🛠️ Tecnologías

- **NestJS** - Framework backend
- **Prisma** - ORM con PostgreSQL
- **JWT** - Autenticación 
- **Swagger** - Documentación de API
- **Docker** - Containerización
- **PostgreSQL** - Base de datos

## 🚀 Instalación y Setup

### **Opción 1: Con Docker (Recomendado)**

1. **Clonar el repositorio:**
```bash
git clone <tu-repo>
cd calorify-backend
```

2. **Levantar con Docker:**
```bash
docker-compose up -d
```

3. **Verificar que todo funciona:**
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api
- **Base de datos:** localhost:5434

### **Opción 2: Desarrollo Local**

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.template .env
# Editar .env con tus configuraciones
```

3. **Levantar base de datos:**
```bash
docker-compose up db -d
```

4. **Migrar esquemas:**
```bash
npm run db:migrate
```

5. **Ejecutar aplicación:**
```bash
npm run start:dev
```

## 📖 Flujo de uso del MVP

### **1. Registro de usuario**
```bash
POST /auth/register
{
  "name": "Juan Pérez",
  "email": "juan@example.com", 
  "password": "123456789"
}
```

### **2. Login**
```bash
POST /auth/login
{
  "email": "juan@example.com",
  "password": "123456789"
}
# Respuesta: { user: {...}, token: "jwt.token.here" }
```

### **3. Crear alimentos** (con JWT token)
```bash
POST /foods
Authorization: Bearer <token>
{
  "name": "Pollo Grillado",
  "calories": 165,
  "proteins": 31,
  "carbs": 0,
  "fats": 4
}
```

### **4. Crear plan diario**
```bash
POST /daily-plan
Authorization: Bearer <token>
{
  "date": "2024-09-24",
  "caloriesMax": 2000
}
```

### **5. Agregar alimentos al plan**
```bash
PATCH /daily-plan/:id/add-food  
Authorization: Bearer <token>
{
  "foodId": 1,
  "quantity": 2
}
```

### **6. Consultar progreso**
```bash
GET /daily-plan/:id
Authorization: Bearer <token>
# Respuesta incluye totales calculados automáticamente
```

## 🔧 Scripts disponibles

```bash
# Desarrollo
npm run start:dev          # Servidor desarrollo
npm run build             # Build producción

# Base de datos
npm run db:generate       # Generar cliente Prisma
npm run db:migrate        # Aplicar migraciones
npm run db:studio         # GUI de base de datos
npm run db:reset          # Reset completo de DB

# Docker
npm run docker:up         # Levantar containers
npm run docker:down       # Parar containers
npm run docker:logs       # Ver logs de la app
npm run docker:restart    # Reiniciar aplicación
```

## 📊 URLs importantes

- **API Base:** `http://localhost:3000`
- **Swagger Docs:** `http://localhost:3000/api`  
- **Base de datos:** `localhost:5434`
- **Prisma Studio:** `npx prisma studio`

## 🔐 Endpoints principales

### **Públicos:**
- `POST /auth/register` - Registro
- `POST /auth/login` - Login

### **Protegidos (requieren JWT):**
- `GET|POST /foods` - Gestión de alimentos
- `GET|POST /daily-plan` - Gestión de planes
- `PATCH /daily-plan/:id/add-food` - Agregar comida
- `GET /daily-plan/date/:date` - Plan por fecha

## 🐳 Docker Commands

```bash
# Primera vez
docker-compose up --build

# Uso normal  
docker-compose up -d        # Levantar en background
docker-compose down         # Parar todo
docker-compose logs app     # Ver logs

# Si cambias código
docker-compose restart app
```

## 🗂️ Estructura del proyecto

```
src/
├── auth/           # Autenticación JWT
├── users/          # Gestión usuarios  
├── foods/          # CRUD alimentos
├── daily-plan/     # CRUD planes diarios
├── config/         # Configuración env
└── main.ts         # Bootstrap + Swagger
```

## ✅ Features implementadas

- [x] Sistema de autenticación completo (JWT)
- [x] CRUD de usuarios, alimentos y planes
- [x] Cálculo automático de macros y calorías  
- [x] Validaciones y guards de seguridad
- [x] Documentación Swagger completa
- [x] Dockerización completa
- [x] Migraciones automáticas
- [x] Logs estructurados

## 🎯 MVP Listo para Demo

Este backend está **100% funcional** para demostrar el flujo completo de un tracker de calorías, incluyendo autenticación, gestión de alimentos y seguimiento de planes diarios.