const dayjs = require('dayjs');
const IVA = 0.21;

let nombreCliente = "Tom Smith";
let dirCliente = "Evergreen Terrace 742";
let tlfCliente = "123456789"
let subtotal = 110;
let stock = true;
let porcentDescuento = 0;
let fechaEntrega = dayjs().add(3, 'day').format('DD-MM-YYYY');

const productos = [
    {nombre: "Producto 1", precio: 50, cantidad: 1},
    {nombre: "Producto 2", precio: 10, cantidad: 4},
    {nombre: "Producto 3", precio: 25, cantidad: 2},
    {nombre: "Producto 4", precio: 5, cantidad: 15},
]

let nombreNorm = nombreCliente.toLocaleUpperCase();
let direcNorm = dirCliente.toUpperCase();
let tlfNorm = tlfCliente.replace(/-/g, '');

let esFragil = productos.includes(producto => producto.nombre.toLowerCase().includes("fragil"));

function comprobarStock(productos) {
    if (!stock) {
        console.log("No hay stock disponible");
        return false;
    }

    return productos.every(producto => producto.cantidad > 0);
}

function porcentajeDescuento(subtotal) {
    if (subtotal >= 100) {
        return porcentDescuento = 0.05;
    } else {
        return porcentDescuento = 0;
    }
}

function calcularTotal(subtotal, porcentDescuento) {
    let totalConDesc = subtotal * (1 - porcentDescuento);
    let totalConIVA = totalConDesc * (1 + IVA);

    return totalConIVA;
}

function entregarPedido() {
    if (comprobarStock(productos)) {
        const descAplicado = porcentajeDescuento(subtotal);
        const total = calcularTotal(subtotal, descAplicado);
        const subtotalConDesc = subtotal * (1 - descAplicado);

        const resumenPedido = `
        =========================================
        🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
        =========================================
        👤 Cliente: ${nombreNorm}
        📦 Productos: ${productos.join(", ")}
        ⚠️ ¿Contiene frágiles?: ${esFragil ? "Sí (Se requiere embalaje especial)" : "No"}

        --- Desglose de Facturación ---
        Subtotal inicial: ${subtotal.toFixed(2)}€
        Descuento aplicado: ${descAplicado * 100}%
        Subtotal tras descuento: ${subtotalConDesc.toFixed(2)}€
        Impuestos (IVA 21%): ${(subtotalConDesc * IVA).toFixed(2)}€
        -----------------------------------------
        💶 TOTAL A PAGAR: ${total.toFixed(2)}€
        =========================================
        🚚 Fecha estimada de entrega: ${fechaEntrega}
        =========================================
        `;

        console.log(resumenPedido);
    }
}

entregarPedido();