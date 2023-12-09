import Client from "../models/clients.model.js";

export const GetAllClients = async (req, res) => {
    try {
        const clients = await Client.getAllClients();
        if (!clients) return res.status(404).json({ error: "No se cargaron los datos de los clientes" });
        res.status(200).json({ data: clients });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const GetClient = async (req, res) => {
    try {
        const { idClient } = req.params;
        const client = await Client.getClient(idClient);
        if (!client) return res.status(404).json({ error: "Cliente no encontrado" });
        res.status(200).json({ data: client });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const CreateClient = async (req, res) => {
    try {
        const { name, contact } = req.body;
        const idAuditUser = req.user.id;
        const newClient = await Client.createClient(name, contact, idAuditUser);
        res.status(201).json({ data: newClient });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const UpdateClient = async (req, res) => {
    try {
        const { idClient } = req.params;
        const { name, contact } = req.body;
        const idAuditUser = req.user.id;
        const updatedClient = await Client.updateClient(idClient, name, contact, idAuditUser);
        if (!updatedClient) return res.status(404).json({ error: "Cliente no encontrado" });
        res.status(200).json({ data: updatedClient });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const DeleteClient = async (req, res) => {
    try {
        const { idClient } = req.params;
        const idAuditUser = req.user.id;
        const deletedClient = await Client.deleteClient(idClient, idAuditUser);
        if (!deletedClient) return res.status(404).json({ error: "Cliente no encontrado" });
        res.status(200).json({ data: deletedClient });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};
