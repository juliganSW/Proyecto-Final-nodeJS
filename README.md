## API REST – Gestión de Productos
Esta API REST permite gestionar productos utilizando Node.js, Express y Firebase Firestore como base de datos.
Incluye operaciones CRUD, una autenticación mediante JWT y carga masiva de productos.

## Tecnologías utilizadas
**Node.js**
**Express**
**Firebase Firestore**
**JSON Web Tokens (JWT)**
**dotenv**
**cors**
**Insomnia**

# Ejecución
Crear un archivo .env en la raíz del proyecto:
PORT=3000
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
JWT_SECRET= tu_password_secreto

## Autenticación con JWT
La ruta para crear un producto individual requiere de un token
**Generar token**
GET /products/token

**Respuesta**: 
{
  "msg": "Token generado",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
}

Este Token tendrá una duración de 15 minutos

## Uso correcto del Token 
El Token debe enviarse en el **Headers**
Authorization: Bearer TU_TOKEN_GENERADO

## Endopoints de la Api
Todas las rutas están bajo el prefijo:
/products (o /productos, que es un alias)
Las rutas /products y /productos funcionan igual, ya que están asociadas al mismo router.

**Crear un producto** (requiere token)
POST /products/crear

En el **Headers**:
Authorization: Bearer TU_TOKEN_GENERADO
En el **Body**:

{
  "nombre": "Producto ejemplo",
  "precio": 1000,
  "stock": 10,
  "descripcion": "Descripción no obligatoria",
  "categoria": "Categoria"
}

**Obtener todos los productos**
GET /products
**Actualizar producto por ID**
PUT /products/:id
**Eliminar un producto por ID**
DELETE /products/:id
**Crear varios productos**
POST /products/crear_productos

**Body**: (Se agrega un array de productos)
[
  {
    "nombre": "Producto 1",
    "precio": 500,
    "stock":1000,
    "descripcion": "descripción opcional",
    "categoria": "Categoria 1"
  },
  {
    "nombre": "Producto 2",
    "precio": 800,
    "stock": 1000,
    "descripcion: "descripción opcional",
    "categoria": "Categoria 2"
  }
]
**Nota**: Se usó la función **writeBatch** de Firebase para agregar varios documentos juntos
import { writeBatch } from "firebase/firestore";

##  Autor
**Julián Enrique Piedrabuena**  
Desarrollado como proyecto final para **Talento Tech - Backend/ Node JS**.






