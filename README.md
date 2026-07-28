# NetEvent

NetEvent es una plataforma web de eventos de networking
empresarial desarrollada como proyecto final de Programación III.

La aplicación permite que organizadores publiquen eventos con
agenda de charlas y que los participantes puedan descubrir eventos,
inscribirse e interactuar mediante comentarios.

## Funcionalidades

### Organizador

- Registro e inicio de sesión.
- Publicación de eventos.
- Creación de agenda de charlas.
- Consulta de eventos publicados.
- Descarga en PDF del listado de inscriptos.

### Participante

- Registro e inicio de sesión.
- Búsqueda y consulta de eventos.
- Visualización de agendas.
- Inscripción a eventos.
- Consulta de inscripciones.
- Recomendaciones de eventos según categorías relacionadas.
- Interacción mediante comentarios.

## Tecnologías

### Frontend

- React
- TypeScript
- Vite
- React Router
- Ant Design

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- PDFKit
- migrate-mongo

## Requisitos previos

- Node.js 20 o superior.
- npm.
- MongoDB instalado y en ejecución.

## Instalación

Clonar el repositorio e instalar dependecias del frontend:

```bash
git clone https://github.com/Rokklet/NetEvent.git
cd NetEvent
npm install
```
Instalar dependecias del backend:

```bash
cd backend
npm install
```

## Variables de entorno

Renombrar el archivo *.env.example*, ubicado en "NetEvent/backend", por *.env*

## Migraciones y datos iniciales

Desde la carpeta "backend" consolutar el estado de las migraciones

```bash
npm run migrate:status
```

Ejecutar las migraciones pendientes

```bash
npm run migrate:up
```

Revertir la ultima migracion

```bash
npm run migrate:down
```

### Credenciales Demo

#### Organizador

```bash
Correo: organizador@netevent.demo
Contraseña: Demo1234!
```

#### Participantes

```bash
Correo: participante1@netevent.demo
Contraseña: Demo1234!

Correo: participante2@netevent.demo
Contraseña: Demo1234!
```

## Ejecución

Se necesitan 2 terminales para correr NetEvent

### Backend

Desde la carpeta *backend*:

```bash
npm run dev
```
Disponible en:

```bash
http://localhost:5000
```

### Frontend

Desde la raiz del proyecto:

```bash
npm run dev
```
Disponible normalmente en:

```bash
http://localhost:5173
```

