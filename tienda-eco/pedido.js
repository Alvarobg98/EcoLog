// Libreria dayjs importada
const dayjs = require('dayjs');

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

// Array de objetos para el carrito
const carrito = [
    {nombre: "Huevos Eco", precio: 50, cantidad: 1, esFragil: true, stockDisp: 10},
    {nombre: "AOVE", precio: 80, cantidad: 4, esFragil: true, stockDisp: 5},
    {nombre: "Miel Eco", precio: 25, cantidad: 2, esFragil: true, stockDisp: 0},
    {nombre: "Manzanas Eco", precio: 15, cantidad: 2, esFragil: false, stockDisp: 5}
]

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
function procesarPedido(datosCliente, productos) {
    console.log("⏳ Procesando pedido...\n");

    // 1. Validar Stock
    if (!validarStock(productos)) {
        console.log("❌Error. No hay stock suficiente de alguno de los productos")
    }

    // 2. Cálculos base
    const subTotal = calcularSubtotal(productos);
    const envioFragil = productos.some(p => p.esFragil === true);
    
    // 3. Descuentos
    let descuento = 0;
    if (subTotal >= CONFIG.descuentoUmbral) {
        descuento = subTotal * CONFIG.descuentoPorcentaje;
    }
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
const resultado = procesarPedido(cliente, carrito);
console.log(resultado);