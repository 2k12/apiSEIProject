import Product from "../models/product.model.js";


export const GetProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        if (!products) return res.status(404).json({ error: "No se cargaron los datos" });
        res.status(200).json( products );
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
}
export const GetProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await Product.getProduct(idProduct);
        if (!product) return res.status(404).json({ error: "No se encontro el Producto" });
        res.status(200).json({ data: product });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
}

export const CreateProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const audit_user_id = req.user.id; 
        const newProduct = await Product.createProduct(name, price, quantity, audit_user_id);
        res.status(201).json({ data: newProduct });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};


export const UpdateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const { name, price, quantity } = req.body;
        const audit_user_id = req.user.id; 
        const updatedProduct = await Product.updateProduct(idProduct, name, price, quantity, audit_user_id);
        if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const DeleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const audit_user_id = req.user.id; 
        const deletedProduct = await Product.deleteProduct(idProduct, audit_user_id);
        if (!deletedProduct) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json({ data: deletedProduct });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};
