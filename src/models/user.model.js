import { pool } from "../db/db.js";

class User {
    static async getDataofUserbyEmail(userEmail) {

        const result = await pool.query(`
            SELECT
                u.id AS user_id,
                u.name AS user_name,
                u.email AS user_email,
                u.password AS user_password,
                u.is_2fa_enabled,
                r.name AS role_name,
                p.name AS permission_name
            FROM
                users u
                JOIN usersroles ur ON u.id = ur.user_id
                JOIN roles r ON ur.role_id = r.id
                JOIN rolespermissions rp ON r.id = rp.role_id
                JOIN permissions p ON rp.permission_id = p.id
            WHERE
                u.email = $1`, [userEmail]);

        // if (!result || result.rowCount === 0) return res.status(404).json({ error: "No se cargaron los datos " });

        const groupedData = result.rows.reduce((acc, row) => {
            if (!acc[row.user_id]) {
                acc[row.user_id] = {
                    user_id: row.user_id,
                    user_name: row.user_name,
                    user_email: row.user_email,
                    user_password: row.user_password,
                    is_2fa_enabled: row.is_2fa_enabled,
                    role_name: row.role_name,
                    permissions: []
                };
            }
            acc[row.user_id].permissions.push(row.permission_name);
            return acc;
        }, {});

        const userData = Object.values(groupedData);

        return userData;

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
    static async updateToken(idUser, secret_2fa) {
        const result = await pool.query(
            `UPDATE users SET secret_2fa=$2 WHERE id=$1 RETURNING *`,
            [idUser, secret_2fa]
        );
        return result.rows[0];
    }

    static async CompareTwoToken (secretInputFront){
        const result = await pool.query(`SELECT  * FROM users WHERE secret_2fa=$1`,[secretInputFront]);
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
