import Permissions from "../models/permissions.model.js";

export const GetPermissions = async (req, res) => {
    try {
        const permissions = await Permissions.getAllPermissions();
        if (!permissions) return res.status(404).json({ error: "No se cargaron los datos de permisos" });
        res.status(200).json({ data: permissions });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const GetPermission = async (req, res) => {
    try {
        const { idPermission } = req.params;
        const permission = await Permissions.getPermission(idPermission);
        if (!permission) return res.status(404).json({ error: "Permiso no encontrado" });
        res.status(200).json({ data: permission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const CreatePermission = async (req, res) => {
    try {
        const { name } = req.body;
        const newPermission = await Permissions.createPermission(name);
        if (!newPermission) return res.status(404).json({ error: "No se pudo crear el permiso" });
        res.status(200).json({ data: newPermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const UpdatePermission = async (req, res) => {
    try {
        const { idPermission } = req.params;
        const { name } = req.body;
        const updatedPermission = await Permissions.updatePermission(idPermission, name);
        if (!updatedPermission) return res.status(404).json({ error: "Permiso no encontrado" });
        res.status(200).json({ data: updatedPermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const DeletePermission = async (req, res) => {
    try {
        const { idPermission } = req.params;
        const deletedPermission = await Permissions.deletePermission(idPermission);
        if (!deletedPermission) return res.status(404).json({ error: "Permiso no encontrado" });
        res.status(200).json({ data: deletedPermission });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};
