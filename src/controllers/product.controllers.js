// Importacion de todas las funciones del servicio de productos
// El service se encarga de "hablar" con la base de datos
import * as productService from "../services/product.service.js";

// Importacion jsonwebtoken para generar tokens JWT
import jwt from "jsonwebtoken";


//Obtener todos los productos  
export const getProducts = async (req, res) => {
    try {
        //Se llama al service para obtener todos los productos
        const products = await productService.getAllProducts();

        // Respuesta con status 200 (OK) y la lista de productos
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener productos",
            error: err.message
        });
    }
};

//Obtener producto por ID   
  export const getProduct = async (req, res) => {
    try {
        //Se obtiene el id enviado por parámetro en la URL
        const { id } = req.params;
       //Busca el producto en la base de datos
        const product = await productService.getProductById(id);

        //Devuelve un error 404 si no existe el producto
        if (!product) {
            return res.status(404).json({
                msg: "No se encontró el producto"
            });
        }

       res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener el producto",
            error: err.message
        });
    }
};

//Crear nuevo producto 
export const createNewProduct = async (req, res) => {
    try {
        // Enviamos los datos del body al service para crear el producto
        const newProduct = await productService.createProduct(req.body);

        // Producto creado correctamente
        res.status(201).json({
            msg: "Producto creado exitosamente",
            producto: newProduct
        });
    } catch (err) {
       
        res.status(400).json({
            msg: "Error al crear nuevo producto",
            error: err.message
        });
    }
};

//Eliminar producto por ID
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productService.deleteProduct(id);

       if (!deletedProduct) {
            return res.status(404).json({
                msg: "No se encontró el producto a eliminar"
            });
        }
       // Eliminación exitosa
        res.status(200).json({
            msg: "Producto eliminado exitosamente"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al eliminar producto",
            error: err.message
        });
    }
};

//Actualizar producto por ID 
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;

        //Envia el id y los nuevos datos al service
        const updatedProduct = await productService.updateProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({
                msg: "No se encontró el producto a actualizar"
            });
        }
        // Actualización exitosa
        res.status(200).json({
            msg: "Producto actualizado exitosamente"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al actualizar producto",
            error: err.message
        });
    }
};

//Crear varios productos de una sola vez
export const createNewProducts = async (req, res) => {
    try {
        //Se espera recibir un array de productos en el body
        const products = req.body;

        // Valida que no sea array vacío
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                msg: "Debes enviar un array con productos"
            });
        }

        // Crea todos los productos de una vez
        const newProducts = await productService.createProducts(products);

        res.status(201).json({
            msg: "Productos creados exitosamente",
            productos: newProducts
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error al crear productos",
            error: err.message
        });
    }
};

//Generar Token para crear un producto
export const generateProductToken = (req, res) => {
    //datos que va dentro del token
    const payload = {
        action: "create_product"
    };

    //Se crea un token que expira en 15 minutos
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.status(200).json({
        msg: "Token generado",
        token
    });
};
