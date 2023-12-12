import usersroles from "../models/usersroles.model.js";

export const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await usersroles.getAllUserRoles();
        if (!userRoles) return res.status(404).json({ error: "No se encontraron roles de usuario" });
        res.status(200).json({ data: userRoles });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const getUserRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        const roles = await usersroles.getUserRoles(userId);
        if (!roles) return res.status(404).json({ error: "Roles de usuario no encontrados" });
        res.status(200).json({ data: roles });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};


export const assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const newRole = await usersroles.assignRoleToUser(userId, roleId);
        res.status(201).json({ data: newRole });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { userId, oldRoleId, newRoleId } = req.body;
        const updatedRole = await usersroles.updateUserRole(userId, oldRoleId, newRoleId);
        if (!updatedRole) return res.status(404).json({ error: "Rol de usuario no encontrado" });
        res.status(200).json({ data: updatedRole });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const removeUserRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const deletedRole = await usersroles.removeUserRole(userId, roleId);
        if (!deletedRole) return res.status(404).json({ error: "Rol de usuario no encontrado" });
        res.status(200).json({ data: deletedRole });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }


};


export const removeRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const deletedRole = await usersroles.removeRole(userId, roleId);
        if (!deletedRole) return res.status(404).json({ error: "Rol de usuario no encontrado 2" });
        res.status(200).json({ data: deletedRole });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }


};

