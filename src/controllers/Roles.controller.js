import Role from "../models/roles.model.js";

export const GetAllRoles = async (req, res) => {
    try {
        const roles = await Role.getAllRoles();
        if (!roles) return res.status(404).json({ error: "No se cargaron los datos de los roles" });
        res.status(200).json({ data: roles });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const GetRole = async (req, res) => {
    try {
        const { idRole } = req.params;
        const role = await Role.getRole(idRole);
        if (!role) return res.status(404).json({ error: "Rol no encontrado" });
        res.status(200).json({ data: role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const CreateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.createRole(name);
        res.status(201).json({ data: role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const UpdateRole = async (req, res) => {
    try {
        const { idRole } = req.params;
        const { name } = req.body;
        const role = await Role.updateRole(idRole, name);
        if (!role) return res.status(404).json({ error: "Rol no encontrado" });
        res.status(200).json({ data: role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const DeleteRole = async (req, res) => {
    try {
        const { idRole } = req.params;
        const role = await Role.deleteRole(idRole);
        if (!role) return res.status(404).json({ error: "Rol no encontrado" });
        res.status(200).json({ data: role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};
