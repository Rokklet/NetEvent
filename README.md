"# NetEvent" 
"NetEvent es un plataforma de eventos de networking empresarial. Permite que usuarios organizadores publiquen eventos con agendas de charlas, y permite que usuarios participantes se inscriban a los eventos, reciban recomendaciones en base a sus gustos y que interactuen con otros participantes"
"## Roles del Sistema"
"El sistema tiene 2 tipo de usuario:
- Organizador: Puede registrarse, iniciar sesión, publicar eventos, ver sus eventos publicados y descargar un listado de inscriptos.
- Participante: Puede registratse, iniciar sesión, inscribirse a eventos, dar su opinion sobre el mismo."
"## Tecnologías utilizadas"
"Frontend:
- React
- TypeScript
- Vite
- React Router
- Ant Design

Backend:
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT para autenticación
- bcryptjs para encriptar contraseñas
- pdfkit para generar PDF de inscriptos"

"## Instalación y ejecución local"

"### Requisitos previos

- Node.js instalado
- MongoDB local o una URI de MongoDB Atlas
- npm instalado

### Frontend

Desde la raíz del proyecto:

```bash
npm install
npm run dev"

Después agregás variables de entorno.

```md
## Variables de entorno del backend

Crear un archivo `.env` dentro de la carpeta `backend` con:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/netevent
JWT_SECRET=clave_secreta_para_desarrollo


### Backend

Desde la carpeta "backend", ejecutar:

cd backend
npm install
npm run dev

