import { pool } from "../db/db.js";

class Permissions {
    static async getAllPermissions() {
        const result = await pool.query(`SELECT * FROM permissions`);
        return result.rows;
    }

    static async getPermission(idPermission) {
        const result = await pool.query(`SELECT * FROM permissions WHERE id=$1`, [idPermission]);
        return result.rows;
    }

    static async createPermission(name) {
        const result = await pool.query(
            `INSERT INTO permissions (name) VALUES ($1) RETURNING *`,[name]);
        return result.rows[0];
    }

    static async updatePermission(idPermission, name) {
        const result = await pool.query(
            `UPDATE permissions SET name=$2 WHERE id=$1 RETURNING *`,
            [idPermission, name]
        );
        return result.rows[0];
    }

    static async deletePermission(idPermission) {
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN'); 
            await client.query('DELETE FROM rolespermissions WHERE permission_id = $1', [idPermission]);
            const result = await client.query('DELETE FROM permissions WHERE id = $1 RETURNING *', [idPermission]);
            await client.query('COMMIT'); 
            return result.rows[0]; 
        } catch (error) {
            await client.query('ROLLBACK'); 
            throw error; 
        } finally {
            client.release(); 
        }
    }
    
}

export default Permissions;
