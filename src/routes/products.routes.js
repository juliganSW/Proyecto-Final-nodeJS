import { Router } from "express";
import { 
  getProduct, 
  getProducts, 
  createNewProduct, 
  deleteProductById, 
  updateProductById,
  createNewProducts
} from "../controllers/product.controllers.js";

const router = Router();
router.get('/:id', getProduct ); 
router.get('/', getProducts );    
router.post('/crear', createNewProduct); 
router.post('/crear_productos', createNewProducts);
router.put('/:id', updateProductById);   
router.delete('/:id', deleteProductById); 

export default router;
