import { Router } from "express";
import { 
  getProduct, 
  getProducts, 
  createNewProduct, 
  deleteProductById, 
  updateProductById,
  createNewProducts,
  generateProductToken
} from "../controllers/product.controllers.js";
import { authToken } from "../middlewares/authToken.js";

const router = Router();
router.post("/token", generateProductToken);          
router.post("/crear", authToken, createNewProduct); 
router.get('/:id', getProduct ); 
router.get('/', getProducts );    
router.post('/crear_productos', createNewProducts);
router.put('/:id', updateProductById);   
router.delete('/:id', deleteProductById); 

export default router;
