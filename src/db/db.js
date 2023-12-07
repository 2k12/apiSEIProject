import pkg from 'pg';
const { Pool } = pkg;

import { db } from "../config.js";


export const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port
});

// Prueba de conexión
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar a la base de datos:', err);
    }
    console.log('Conexión a la base de datos establecida');
    client.release(); // Liberar el cliente para devolverlo al grupo de conexiones
});
