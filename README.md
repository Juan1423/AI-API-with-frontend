# AI-API-with-frontend

Aqui van todo instruccion necesaria para correr el proyecto.
1. App.jsx – Enrutador de toda la aplicación
 Qué hace:
Administra las rutas (/, /login, /generator, /profile) y protege las rutas internas con login.

Cómo se ejecuta:

Es importado por main.jsx como el componente raíz de la app.

Se ejecuta automáticamente al iniciar la app (npm run dev).

2. Login.jsx – Pantalla de inicio de sesión
Qué hace:
Muestra un formulario para ingresar usuario y contraseña.

Cómo se accede:

Automáticamente si no estás autenticado

Manualmente: ir a http://localhost:5173/login

Login de prueba:

Usuario: admin

Contraseña: 1234

3. Home.jsx – Página principal protegida
Qué hace:
Contenido principal que se muestra solo tras iniciar sesión.

Cómo se accede:

Ir a: http://localhost:5173/

Solo accesible si el login fue exitoso

 4. ActivityGenerator.jsx – Generador de actividades
  Qué hace:
Simula una funcionalidad para generar actividades educativas.

Cómo se accede:

Ir a: http://localhost:5173/generator

Protegido: requiere login previo

5. ChildProfile.jsx – Perfil de niño
Qué hace:
Muestra el perfil de un niño (nombre, progreso, etc.)

 Cómo se accede:

Ir a: http://localhost:5173/profile

Protegido: requiere login

CÓMO LEVANTAR TODO EL PROYECTO

# 1. Instala dependencias
npm install

# 2. Ejecuta el servidor de desarrollo
npm run dev

http://localhost:5173




-------------------Servidor---------------------------