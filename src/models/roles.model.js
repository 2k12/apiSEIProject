import { pool } from "../db/db.js"; 

class Role {
    static async getAllRoles() {
        const result = await pool.query(`SELECT * FROM roles`);
        return result.rows;
    }

    static async getRole(idRole) {
        const result = await pool.query(`SELECT * FROM roles WHERE id=$1`, [idRole]);
        return result.rows;
    }

    static async createRole(name) {
        const result = await pool.query(
            `INSERT INTO roles (name) VALUES ($1) RETURNING *`,
            [name]
        );
        return result.rows[0];
    }

    static async updateRole(idRole, name) {
        const result = await pool.query(
            `UPDATE roles SET name=$2 WHERE id=$1 RETURNING *`,
            [idRole, name]
        );
        return result.rows[0];
    }

    static async deleteRole(idRole) {
        const result = await pool.query(
            `DELETE FROM roles WHERE id=$1 RETURNING *`,
            [idRole]
        );
        return result.rows[0];
    }
}

export default Role;