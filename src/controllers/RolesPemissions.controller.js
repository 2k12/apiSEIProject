import RolePermissions from "../models/rolespemissions.model.js";

export const UpdateRolePermission = async (req, res) => {
    try {
        const { idRole } = req.params;
        const { oldPermissionId, newPermissionId } = req.body;

        if (!idRole || !oldPermissionId || !newPermissionId) {
            return res.status(400).json({ error: "Faltan idRole, oldPermissionId o newPermissionId" });
        }

        const updatedRolePermission = await RolePermissions.updateRolePermission(idRole, oldPermissionId, newPermissionId);
        if (!updatedRolePermission) {
            return res.status(404).json({ error: "Relación de permiso no encontrada o no pudo ser actualizada" });
        }
        res.status(200).json({ data: updatedRolePermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const getRolePermission = async (req, res) => {
    try {
        const { idRole } = req.params;
        if (!idRole) {
            return res.status(400).json({ error: "Falta el idRole" });
        }
        const { roleName, permissions } = await RolePermissions.getRolePermission(idRole);
        if (!roleName) {
            return res.status(404).json({ error: "Rol no encontrado" });
        }
        if (permissions.length === 0) {
            return res.status(404).json({ error: "No se encontraron permisos para este rol" });
        }
        res.status(200).json({ [roleName]: permissions });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const setRolePermission = async (req, res) => {
    try {
        const { idRole } = req.params;
        const { permissionId } = req.body;

        if (!idRole || !permissionId) {
            return res.status(400).json({ error: "Faltan idRole o permissionId" });
        }

        const rolePermission = await RolePermissions.setRolePermission(idRole, permissionId);
        res.status(201).json({ data: rolePermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
}; 

export const deleteRolePermission = async (req, res) => {
    try {
        const { idRole } = req.params;
        const { permissionId } = req.body;

        if (!idRole || !permissionId) {
            return res.status(400).json({ error: "Faltan idRole o permissionId" });
        }

        const deletedRolePermission = await RolePermissions.deleteRolePermission(idRole, permissionId);
        if (!deletedRolePermission) {
            return res.status(404).json({ error: "Relación de permiso no encontrada o no pudo ser eliminada" });
        }
        res.status(200).json({ data: deletedRolePermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};