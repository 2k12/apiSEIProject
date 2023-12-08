import { pool } from "../db/db.js";

class User {
    static async getDataofUserbyEmail(userEmail) {
        const result = await pool.query(`SELECT
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            u.is_2fa_enabled,
            u.secret_2fa,
            r.name AS role_name,
            p.name AS permission_name
                FROM
            users u
            JOIN usersroles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            JOIN rolespermissions rp ON r.id = rp.role_id
            JOIN permissions p ON rp.permission_id = p.id
                WHERE
            u.email = $1`,[userEmail]);
        return result.rows;

    }
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
