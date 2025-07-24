# Proyecto Full Stack - Node.js/Express + React/Vite

Este proyecto consiste en una aplicación full stack con un servidor backend desarrollado en Node.js con Express y un cliente frontend desarrollado en React con Vite.

## 📋 Requisitos Previos

- Node.js (versión 20 o superior)
- npm 
- Git

## 🗂️ Estructura del Proyecto

```
proyecto/
├── server/          # Backend Node.js + Express
│   ├── .env.example   # Archivo de ejemplo de variables de entorno
│   ├── package.json
│   └── ...
└── cliente/           # Frontend React + Vite
    ├── package.json
    └── ...

```

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Juan1423/AI-API-with-frontend.git
cd AI-API-WITH-FRONTEND
```

### 2. Configuración del Servidor (Backend)

#### Navegar al directorio del servidor:
```bash
cd server
```

#### Instalar dependencias:
```bash
npm install
```

#### Configurar variables de entorno:

**Importante:** Usa el archivo `.env.example`, como guia para configurar tus API keys.

1. Copia el archivo `.env.example` y cambia el nombre `.env` 
```bash
touch .env
```
2. Configura tus propiasAPi Keys:
3. Copia el contenido de `config.txt` al archivo `.env`

**Nota para el profesor:** La configuración correcta del archivo `.env` se encuentra en el archivo `config.txt` incluido carpeta compartida.

### 3. Configuración del Cliente (Frontend)

#### Navegar al directorio del cliente:
```bash
cd ../frontend
cd terapia-app
```

#### Instalar dependencias:
```bash
npm install
```

## ▶️ Ejecución de la Aplicación

### Ejecutar el Servidor (Backend)

1. Navegar al directorio del servidor:
```bash
cd server
```

2. Iniciar el servidor:
```bash
node .\server.js
```
o si prefieres nodemon:
```bash
nodemon .\server.js
```

El servidor se ejecutará en: `http://localhost:5000` (o el puerto configurado en el .env)

### Ejecutar el Cliente (Frontend)

1. En una nueva terminal, navegar al directorio del cliente:
```bash
cd frontend
cd terapia-app
```

2. Iniciar el servidor de desarrollo de Vite:
```bash
npm run dev
```

El cliente se ejecutará en: `http://localhost:5173` (puerto por defecto de Vite)

## 🔧 Scripts Disponibles

### Servidor (Node.js + Express)
- `node .\server.js` - Ejecuta el servidor en modo producción
- `nodemon .\server.js` - Ejecuta el servidor con nodemon (si lo prefieres)

### Cliente (React + Vite)
- `npm run dev` - Inicia el servidor de desarrollo

## 📝 Notas Importantes

1. **Variables de Entorno**: Asegúrate de usar la configuración del archivo `config.txt` para el archivo `.env` del servidor, no el `.env.example`.

2. **Orden de Ejecución**: Inicia primero el servidor backend y luego el cliente frontend.

3. **Puertos**: Por defecto:
   - Servidor: Puerto 5000 (o el configurado en .env)
   - Cliente: Puerto 5173 (Vite)

4. **Comunicación**: Verifica que la URL del backend esté correctamente configurada en el cliente para las peticiones API.

## 🐛 Solución de Problemas

### Error: "Cannot connect to server"
- Verifica que el servidor backend esté ejecutándose
- Confirma que las variables de entorno estén correctamente configuradas

### Error: "Module not found"
- Ejecuta `npm install` en ambos directorios (servidor y cliente)

### Error de CORS
- Verifica la configuración de CORS en el servidor
- Confirma que la URL del frontend esté permitida en el backend