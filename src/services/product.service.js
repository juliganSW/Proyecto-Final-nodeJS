import { db } from "../firebase/config.js";
import { ProductModel } from "../models/products.model.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, writeBatch } from "firebase/firestore";

const collectionName = "productos"

export const getAllProducts = async () => {
    const prodCollection = collection(db, collectionName);
    const snapshot = await getDocs(prodCollection);

    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => new ProductModel({ id: doc.id, ...doc.data() }))

}

export const getProductById = async (id) => {
    const documentRef = doc(db, collectionName, id);
    const documentSnap = await getDoc(documentRef);

    if (!documentSnap.exists()) return null;
    return new ProductModel({ id: documentSnap.id, ...documentSnap.data() })

}

export const createProduct = async (data) => {
    // Validaciones
    if (!data.nombre || !data.precio || !data.categoria) {
        throw new Error("nombre, precio y categoria son campos obligatorios");
    }

    const prodCollection = collection(db, collectionName);

    const documentRef = await addDoc(prodCollection, {
        nombre: data.nombre,
        precio: Number(data.precio),
        stock: Number(data.stock || 0),
        descripcion: data.descripcion || "",
        categoria: data.categoria
    });
    return new ProductModel({
        id: documentRef.id,
        ...data
    });
};

export const deleteProduct = async (id) => {
    const documentRef = doc(db, collectionName, id);
    const documentSnap =  await getDoc(documentRef);

    if (!documentSnap.exists()) return null;
    await deleteDoc(documentRef);
    return true;
}

export const updateProduct = async (id, data)=> {
    const documentRef = doc(db, collectionName, id);
    const documentSnap = await getDoc(documentRef);
    
    if (!documentSnap.exists()) return null;

     await updateDoc(documentRef, data);
     return {id, ...documentSnap.data(), ...data};

}

// Función que carga un varios productos
export const createProducts = async (products) => {
    const batch = writeBatch(db);
    const prodCollection = collection(db, collectionName);

    const result = [];

    products.forEach((data) => {
        const documentRef = doc(prodCollection);
        const newData = {
            nombre: data.nombre,
            precio: Number(data.precio),
            stock: Number(data.stock || 0),
            descripcion: data.descripcion || "",
            categoria: data.categoria
        };

        batch.set(documentRef, newData);
        result.push(new ProductModel({ id: documentRef.id, ...newData }));
    });

    await batch.commit();
    return result;
};

