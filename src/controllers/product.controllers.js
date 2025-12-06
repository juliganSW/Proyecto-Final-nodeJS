import * as productService from "../services/product.service.js"

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener productos", error: err.message })

    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);

        if (!product) {
            res.status(404).json({ msg: "No se encontró el producto" })

        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener el producto", error: err.message })

    }
}

export const createNewProduct = async (req, res) => {
    try {
        const newProduct =  await productService.createProduct(req.body);
        res.status(201).json({ msg: "producto creado exitosamente", producto: newProduct });
    } catch (err) {
        res.status(400).json({ msg: "Error al crear nuevo producto", error: err.message })

    }

}

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct =  await productService.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "No se encontró el producto a eliminar" })

        }
        res.status(200).json({ msg: "producto eliminado exitosamente" });
    } catch (err) {
        res.status(500).json({ msg: "Error al eliminar producto", error: err.message })

    }

}

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct =  await productService.updateProduct(id, req.body)

        if (!updatedProduct) {
            return res.status(404).json({ msg: "No se encontró el producto a actualizar" })

        }
        res.status(200).json({ msg: "producto actualizado exitosamente" });
    } catch (err) {
        res.status(500).json({ msg: "Error al actualizar producto", error: err.message })

    }

}

export const createNewProducts = async (req, res) => {
    try {
        const products = req.body;

        
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ msg: "Debes enviar un array con productos"
            });
        }

       const newProducts = await productService.createProducts(products);
       return res.status(201).json({ msg: "Productos creados exitosamente", productos: newProducts
        });

    } catch (err) {
        return res.status(500).json({ msg: "Error al crear productos", error: err.message
        });
    }
};
