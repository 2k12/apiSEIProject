import { pool } from "../db/db.js";

class User {
    static async getAllUsers() {
        const result = await pool.query(`SELECT * FROM users`);
        return result.rows;
    }

    static async getUser(idUser) {
        const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [idUser]);
        return result.rows[0];
    }

    static async createUser(name, email, password, is_2fa_enabled = false, secret_2fa = null) {
        const result = await pool.query(
            `INSERT INTO users (name, email, password, is_2fa_enabled, secret_2fa) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, password, is_2fa_enabled, secret_2fa]
        );
        return result.rows[0];
    }

    static async updateUser(idUser, name, email, password, is_2fa_enabled, secret_2fa) {
        const result = await pool.query(
            `UPDATE users SET name=$2, email=$3, password=$4, is_2fa_enabled=$5, secret_2fa=$6 WHERE id=$1 RETURNING *`,
            [idUser, name, email, password, is_2fa_enabled, secret_2fa]
        );
        return result.rows[0];
    }

    static async deleteUser(idUser) {
        const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [idUser]);
        return result.rows[0];
    }

    static async getUserbyEmail(email) {
        const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
        return result.rows[0];
    }
}

export default User;
