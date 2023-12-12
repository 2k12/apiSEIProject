import { pool } from "../db/db.js";

class usersroles {

    static async getAllUserRoles() {
        const query = `
            SELECT u.name AS "USER_NAME", r.name AS "USER_ROLE"
            FROM users u
            LEFT JOIN usersroles ur ON u.id = ur.user_id
            LEFT JOIN roles r ON ur.role_id = r.id`;
        const result = await pool.query(query);
        return result.rows;
    }


    static async getUserRoles(userId) {
        const query = `
        SELECT u.name AS "USER_NAME", r.name AS "USER_ROLE"
        FROM users u
        LEFT JOIN usersroles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = $1`;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    static async assignRoleToUser(userId, roleId) {
        const query = `
            INSERT INTO usersroles (user_id, role_id)
            VALUES ($1, $2)
            RETURNING *`;
        const result = await pool.query(query, [userId, roleId]);
        return result.rows[0];
    }


    static async updateUserRole(userId, oldRoleId, newRoleId) {
        let query;
        if (oldRoleId === null) {
            query = `
                UPDATE usersroles
                SET role_id = $2
                WHERE user_id = $1 AND role_id IS NULL
                RETURNING *`;
            const result = await pool.query(query, [userId, newRoleId]);
            return result.rows[0];
        } else {
            query = `
                UPDATE usersroles
                SET role_id = $3
                WHERE user_id = $1 AND role_id = $2
                RETURNING *`;
            const result = await pool.query(query, [userId, oldRoleId, newRoleId]);
            return result.rows[0];
        }
    }


    static async removeUserRole(userId, roleId) {
        const query = `
            DELETE FROM usersroles
            WHERE user_id = $1 AND role_id = $2
            RETURNING *`;
        const result = await pool.query(query, [userId, roleId]);
        return result.rows[0];
    }

    static async removeRole(userId, roleId) {
        const query = `
            UPDATE usersroles
            SET role_id = NULL
            WHERE user_id = $1 AND role_id = $2
            RETURNING *`;
        const result = await pool.query(query, [userId, roleId]);
        return result.rows[0];
    }

}
export default usersroles;
