//Import para la conexión a Firebase (Firestore)
import { db } from "../firebase/config.js";

//Importación del modelo de Producto
import { ProductModel } from "../models/products.model.js";

//Importación de funciones de Firestore para trabajar con la base de datos
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    writeBatch
} from "firebase/firestore";

// Nombre de la colección en Firestore
const collectionName = "productos";

//Obtener todos los productos
export const getAllProducts = async () => {
    
    const prodCollection = collection(db, collectionName);

    //Se obtienen todos los documentos de la colección
    const snapshot = await getDocs(prodCollection);

    // Si no hay documentos, devuelve un array vacío
    if (snapshot.empty) return [];

    // Se convierte cada documento en un productModel
    return snapshot.docs.map(doc =>
        new ProductModel({
            id: doc.id,
            ...doc.data()
        })
    );
};

//Obtener producto por ID
export const getProductById = async (id) => {
    
    const documentRef = doc(db, collectionName, id);

    //Se obtiene el documento
    const documentSnap = await getDoc(documentRef);

    //Si el documento no existe, se devuelve null
    if (!documentSnap.exists()) return null;

    //Si existe, se devuelve como ProductModel
    return new ProductModel({
        id: documentSnap.id,
        ...documentSnap.data()
    });
};

//Crear producto
export const createProduct = async (data) => {
    // Validacion  de campos obligatorios
    if (!data.nombre || !data.precio || !data.categoria) {
        throw new Error(
            "nombre, precio y categoria son campos obligatorios"
        );
    }

   const prodCollection = collection(db, collectionName);

    //Se crea el documento en Firestore
    const documentRef = await addDoc(prodCollection, {
        nombre: data.nombre,
        precio: Number(data.precio),
        stock: Number(data.stock || 0),
        descripcion: data.descripcion || "",
        categoria: data.categoria
    });

    // Devuelve el producto creado
    return new ProductModel({
        id: documentRef.id,
        ...data
    });
};

//Eliminar producto por ID
export const deleteProduct = async (id) => {
   
    const documentRef = doc(db, collectionName, id);

    //Verifica que exista el documento
    const documentSnap = await getDoc(documentRef);

    //Si no existe, devuelve null
    if (!documentSnap.exists()) return null;

    //Se elimina el documento 
    await deleteDoc(documentRef);
    return true;
};

//Actualizar producto por ID
export const updateProduct = async (id, data) => {
    // Referencia al documento
    const documentRef = doc(db, collectionName, id);

    const documentSnap = await getDoc(documentRef);

    if (!documentSnap.exists()) return null;

    //Se actualizan los campos
    await updateDoc(documentRef, data);

    // Devuelve el producto actualizado
    return {
        id,
        ...documentSnap.data(),
        ...data
    };
};

//Función que permite crear varios productos de una sola vez
export const createProducts = async (products) => {
    //Se crea un batch para operaciones múltiples
    const batch = writeBatch(db);

    const prodCollection = collection(db, collectionName);

    const result = [];

    //Se recorre el array de productos
    products.forEach((data) => {
       
        const documentRef = doc(prodCollection);

        const newData = {
            nombre: data.nombre,
            precio: Number(data.precio),
            stock: Number(data.stock || 0),
            descripcion: data.descripcion || "",
            categoria: data.categoria
        };

        //Agrega la operación al batch
        batch.set(documentRef, newData);

        //Se guarda el producto
        result.push(
            new ProductModel({
                id: documentRef.id,
                ...newData
            })
        );
    });

    //Se ejecutan las operaciones
    await batch.commit();

    return result;
};
