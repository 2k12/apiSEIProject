import Orders from "../models/orders.model.js";
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.getAllOrders();
        if (!orders.length) return res.status(404).json({ error: "No se encontraron pedidos" });


        const formattedResponse = orders.map(order => ({
            id: order.order_id.toString(),
            cliente: {
                nombre: order.client_name,
                contacto: order.client_contact
            },
            detalle: {
                nombre_de_producto: order.product_name,
                precio: order.product_price,
                cantidad: order.product_quantity.toString(),
                subtotal: order.order_subtotal,
                iva: order.order_iva,
                total: (parseFloat(order.order_subtotal) + parseFloat(order.order_iva)).toFixed(2)
            }
        }));
        res.status(200).json(formattedResponse);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.getOrderById(orderId);

        // Comprobamos si el pedido existe antes de intentar acceder a sus propiedades
        if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

        // Transformamos la respuesta a la estructura deseada para un pedido específico
        const formattedResponse = {
            id: order.order_id.toString(),
            cliente: {
                nombre: order.client_name,
                contacto: order.client_contact
            },
            detalle: {
                nombre_de_producto: order.product_name,
                precio: order.product_price,
                cantidad: order.product_quantity.toString(),
                subtotal: order.order_subtotal,
                iva: order.order_iva,
                total: (parseFloat(order.order_subtotal) + parseFloat(order.order_iva)).toFixed(2)
            }
        };
        res.status(200).json(formattedResponse);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const createOrder = async (req, res) => {
    try {
        const { client_id, product_id, quantity, iva, audit_user_id } = req.body;
        const newOrder = await Orders.createOrder(client_id, product_id, quantity, iva, audit_user_id);
        res.status(201).json({ data: "Producto creado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await Orders.deleteOrder(orderId);
        if (!deletedOrder) return res.status(404).json({ error: "Pedido no encontrado para eliminar" });
        res.status(200).json({ data: "se borro correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { clientId, productId, quantity, orderDate, subtotal, iva, auditUserId } = req.body;
        const updatedOrder = await Orders.updateOrder(orderId, clientId, productId, quantity, orderDate, subtotal, iva, auditUserId);

        if (!updatedOrder) return res.status(404).json({ error: "Pedido no encontrado para actualizar" });
        res.status(200).json({ data: "Producto Actualizado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


