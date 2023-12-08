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

    static async createProduct(name, price, quantity, audit_user_id) {
        const result = await pool.query(
            `INSERT INTO products (name, price, quantity, audit_user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, price, quantity, audit_user_id]
        );
        return result.rows[0];
    }

    static async updateProduct(idProduct, name, price, quantity, audit_user_id) {
        const result = await pool.query(
            `UPDATE products SET name=$2, price=$3, quantity=$4, audit_user_id=$5 WHERE id=$1 RETURNING *`,
            [idProduct, name, price, quantity, audit_user_id]
        );
        return result.rows[0];
    }

    static async deleteProduct(idProduct, audit_user_id) {
        const result = await pool.query(
            `DELETE FROM products WHERE id=$1 RETURNING *, $2 AS audit_user_id`, 
            [idProduct, audit_user_id]
        );
        return result.rows[0];
    }
    
}


export default Product;