import { pool } from "../db/db.js";

export const GetAuditData= async (req, res) => {
    try {
        const auditdata = await pool.query(`SELECT * FROM audit`);
        if (!auditdata) return res.status(404).json({ error: "No se cargaron los datos de Auditoria!" });
        res.status(200).json( auditdata.rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
}