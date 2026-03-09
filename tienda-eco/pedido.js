// Libreria dayjs importada
const dayjs = require('dayjs');
const fs = require('fs/promises');

// ======================================
// 1.Declaracion de variable y constantes
// ======================================
const CONFIG = {
    iva: 0.21,
    descuentoUmbral: 100,
    descuentoPorcentaje: 0.05,
    costeEnvio: 5.99,
    envioGratisUmbral: 50
}

// Datos del cliente
const cliente = {
    nombre: "tom smith",
    email: "tom.smith@email.com"
}

// ======================================
// 2.Funciones modulares
// ======================================

// Verifica que hay stock de cada producto
function validarStock(carrito) {
    return carrito.every(p => p.cantidad <= p.stockDisp);
}

// Calcular el subtotal
function calcularSubtotal(carrito) {
    return carrito.reduce((subTotal, p) => subTotal + (p.precio * p.cantidad), 0);
}

// Determina los gastos de envio
function calcularEnvio(subTotal) {
    return subTotal >= CONFIG.envioGratisUmbral ? 0 : CONFIG.costeEnvio;
}

// Genera la factura final
function generarFactura(datosCliente, productos) {
    console.log("⏳ Procesando pedido...\n");

    // 1. Validar Stock
    if (!validarStock(productos)) {
        throw new Error("No hay stock suficiente de alguno de los productos")
    }

    // 2. Cálculos base
    const subTotal = calcularSubtotal(productos);
    const envioFragil = productos.some(p => p.esFragil);
    
    // 3. Descuentos
    let descuento = subTotal >= CONFIG.descuentoUmbral ? (subTotal * CONFIG.descuentoPorcentaje) : 0;
    const subtotalConDesc = subTotal - descuento;

    // 4. Impuestos y Envío
    const impuestos = subtotalConDesc * CONFIG.iva;
    const gastosEnvio = calcularEnvio(subtotalConDesc);
    const total = subtotalConDesc + impuestos + gastosEnvio;

    // 5. Fecha
    const fechaEntrega = dayjs().add(3, 'day').format('DD/MM/YYYY');

    // 6. Formateo de salida
    const nombresProductos = productos.map(p => `${p.cantidad}x ${p.nombre}`).join("\n - ");

    return `
=========================================
🌱 TIENDA ECO - FACTURA OFICIAL 🌱
=========================================
👤 Cliente: ${datosCliente.nombre.toUpperCase()}
📧 Contacto: ${datosCliente.email}

📦 Productos:
  - ${nombresProductos}
⚠️ Embalaje especial: ${envioFragil ? "SÍ (Precaución: Frágil)" : "No"}

--- Desglose ---
Subtotal: ${subTotal.toFixed(2)}€
Descuento: -${descuento.toFixed(2)}€
Base Imponible: ${subtotalConDesc.toFixed(2)}€
IVA (21%): +${impuestos.toFixed(2)}€
Envío: ${gastosEnvio === 0 ? "GRATIS" : `+${gastosEnvio.toFixed(2)}€`}
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Entrega estimada: ${fechaEntrega}
=========================================
`;
}

// ==========================================
// 3. Ejecución del Programa
// ==========================================
async function procesarCompra() {
    console.log("⏳ Leyendo base de datos e iniciando el procesamiento...\n");

    try {
        const datosCrudos = await fs.readFile('./carrito.json', 'utf-8');
        const carrito = JSON.parse(datosCrudos);

        const recibo = generarFactura(cliente, carrito);
        console.log(recibo);
    } catch (error) {
        console.error("❌ Operacion cancelada:");
        console.error("Motivo:", error.message);
    }
}

// Ejecucion del programa
procesarCompra();