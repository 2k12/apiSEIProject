import { pool } from "../db/db.js";

class Orders {

    static async getAllOrders() {
        const query = `
            SELECT 
                o.id AS "order_id",
                c.name AS "client_name",
                c.contact AS "client_contact",
                p.name AS "product_name",
                p.price AS "product_price",
                o.quantity AS "product_quantity",
                o.subtotal AS "order_subtotal",
                o.iva AS "order_iva",
                (o.subtotal + o.iva) AS "order_total"
            FROM 
                public.orders o
                JOIN public.clients c ON o.client_id = c.id
                JOIN public.products p ON o.product_id = p.id`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async getOrderById(orderId) {
        const query = `
            SELECT 
                o.id AS "order_id",
                c.name AS "client_name",
                c.contact AS "client_contact",
                p.name AS "product_name",
                p.price AS "product_price",
                o.quantity AS "product_quantity",
                o.subtotal AS "order_subtotal",
                o.iva AS "order_iva",
                (o.subtotal + o.iva) AS "order_total"
            FROM 
                public.orders o
                JOIN public.clients c ON o.client_id = c.id
                JOIN public.products p ON o.product_id = p.id
            WHERE o.id = $1`;
        const result = await pool.query(query, [orderId]);
        return result.rows[0];
    }


    static async createOrder(client_id, product_id, quantity, iva, audit_user_id) {
        const query = `
            INSERT INTO orders (client_id, product_id, quantity, iva, audit_user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const result = await pool.query(query, [client_id, product_id, quantity, iva, audit_user_id]);
        return result.rows[0];
    }


    static async deleteOrder(orderId) {
        const query = `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *`;
        const result = await pool.query(query, [orderId]);
        return result.rows[0];
    }

    static async updateOrder(orderId, clientId, productId, quantity, orderDate, subtotal, iva, auditUserId) {
        const total = subtotal + iva;
        const query = `
            UPDATE orders
            SET client_id = $2, product_id = $3, quantity = $4, order_date = $5, subtotal = $6, iva = $7, total = $8, audit_user_id = $9
            WHERE id = $1
            RETURNING *`;
        const result = await pool.query(query, [orderId, clientId, productId, quantity, orderDate, subtotal, iva, total, auditUserId]);
        return result.rows[0];
    }

}
export default Orders;
