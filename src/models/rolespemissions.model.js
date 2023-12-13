import { pool } from "../db/db.js";

class RolesPermissions{


    static async getRolePermission(idRole) {
        try {
            // Consultar el nombre del rol
            const roleResult = await pool.query(`SELECT name FROM roles WHERE id = $1`, [idRole]);
            const roleName = roleResult.rows[0]?.name;

            if (!roleName) {
                return { roleName: null, permissions: [] };
            }

            // Consultar los permisos asociados al idRole
            const permissionsResult = await pool.query(`
                SELECT p.name 
                FROM permissions p 
                JOIN rolespermissions rp ON p.id = rp.permission_id 
                WHERE rp.role_id = $1
            `, [idRole]);

            // Extraer los nombres de los permisos
            const permissions = permissionsResult.rows.map(row => row.name);

            return { roleName, permissions };
        } catch (error) {
            throw error;
        }
    }

    static async setRolePermission(idRole, permissionId) {
        try {
            // Insertar la relación entre el rol y el permiso en la tabla rolespermissions
            const result = await pool.query(
                `INSERT INTO rolespermissions (role_id, permission_id) VALUES ($1, $2) RETURNING *`,
                [idRole, permissionId]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateRolePermission(idRole, oldPermissionId, newPermissionId) {
        try {
            // Actualizar la entrada en la tabla rolespermissions
            const result = await pool.query(
                `UPDATE rolespermissions SET permission_id = $3 WHERE role_id = $1 AND permission_id = $2 RETURNING *`,
                [idRole, oldPermissionId, newPermissionId]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    } 

    static async deleteRolePermission(idRole, permissionId) {
        try {
            // Eliminar la relación entre el rol y el permiso en la tabla rolespermissions
            const result = await pool.query(
                `DELETE FROM rolespermissions WHERE role_id = $1 AND permission_id = $2 RETURNING *`,
                [idRole, permissionId]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

}

export default RolesPermissions;