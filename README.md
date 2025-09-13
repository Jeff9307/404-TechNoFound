# 404 TECH NO FOUND - E-commerce

Este es el proyecto base para una tienda e-commerce de tecnología moderna, construida con Next.js para el frontend y Node.js/Express para el backend.

## Características

- **Frontend:** Next.js, React, TailwindCSS.
- **Backend:** Node.js, Express.
- **Base de Datos:** Base de datos simulada con un archivo `db.json`.
- **Autenticación:** Sistema de login/registro con JWT (JSON Web Tokens).
- **Funcionalidades:** Catálogo de productos, filtros, carrito de compras, y más.

## Requisitos Previos

- Node.js (v18 o superior)
- npm

## Estructura del Proyecto

El proyecto está organizado en dos carpetas principales:

- `/frontend`: Contiene la aplicación de Next.js.
- `/backend`: Contiene el servidor de Express.

## Cómo Empezar

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Configuración del Backend

Primero, instala las dependencias y corre el servidor del backend.

```bash
# Navega a la carpeta del backend
cd backend

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm start
```

El servidor del backend estará corriendo en `http://localhost:3001`.

### 2. Configuración del Frontend

Ahora, en una **nueva terminal**, instala las dependencias y corre la aplicación del frontend.

```bash
# Navega a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo de Next.js
npm run dev
```

La tienda estará disponible en `http://localhost:3000`.

## Scripts Disponibles

### Backend (`/backend`)

- `npm start`: Inicia el servidor de Express.

### Frontend (`/frontend`)

- `npm run dev`: Inicia el servidor de desarrollo de Next.js.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia un servidor de producción.
- `npm run lint`: Ejecuta el linter de Next.js.
