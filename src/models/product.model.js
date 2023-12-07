import { pool } from "../db/db.js";


class Product {
    static async getAllProducts(){
        const result = await pool.query(`SELECT * FROM products`);
        return result.rows;
    }

    static async getProduct (idProduct){
        const result = await pool.query(`SELECT * FROM products WHERE id=$1`,[idProduct]);
        return result.rows;
    }

    static async createProduct(name, price, quantity) {
        const result = await pool.query(
            `INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *`,
            [name, price, quantity]
        );
        return result.rows[0]; // Devuelve el producto recién creado
    }
    

    static async updateProduct(idProduct, name, price, quantity) {
        const result = await pool.query(
            `UPDATE products SET name=$2, price=$3, quantity=$4 WHERE id=$1 RETURNING *`,
            [idProduct, name, price, quantity]
        );
        return result.rows[0]; // Devuelve el producto actualizado
    }

    
    static async deleteProduct(idProduct) {
        const result = await pool.query(`DELETE FROM products WHERE id=$1 RETURNING *`, [idProduct]);
        return result.rows[0]; // Devuelve el producto eliminado
    }
    
}


export default Product;