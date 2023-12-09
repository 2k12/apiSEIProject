import { pool } from "../db/db.js";

class Client {
    static async getAllClients() {
        const result = await pool.query(`SELECT * FROM clients`);
        return result.rows;
    }

    static async getClient(idClient) {
        const result = await pool.query(`SELECT * FROM clients WHERE id=$1`, [idClient]);
        return result.rows;
    }

    static async createClient(name, contact, audit_user_id) {
        const result = await pool.query(
            `INSERT INTO clients (name, contact,  audit_user_id) VALUES ($1, $2, $3) RETURNING *`,
            [name, contact, audit_user_id]
        );
        return result.rows[0];
    }

    static async updateClient(idClient, name, contact, audit_user_id) {
        const result = await pool.query(
            `UPDATE clients SET name=$2, contact=$3,  audit_user_id=$4 WHERE id=$1 RETURNING *`,
            [idClient, name, contact, audit_user_id]
        );
        return result.rows[0];
    }

    static async deleteClient(idClient, audit_user_id) {
        const result = await pool.query(
            `DELETE FROM clients WHERE id=$1 RETURNING *, $2 AS  audit_user_id `,
            [idClient, audit_user_id]
        );
        return result.rows[0];
    }
}

export default Client;
