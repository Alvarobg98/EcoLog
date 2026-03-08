// Libreria dayjs importada
const dayjs = require('dayjs');

// ======================================
// 1.Declaracion de variable y constantes
// ======================================
const IVA = 0.21;
let nombreCliente = "Tom Smith";
let stock = true;

// Array de objetos para el carrito
const carrito = [
    {nombre: "Huevos Eco", precio: 50, cantidad: 1, esFragil: true},
    {nombre: "AOVE", precio: 80, cantidad: 4, esFragil: true},
    {nombre: "Miel Eco", precio: 25, cantidad: 2, esFragil: true},
    {nombre: "Manzanas Eco", precio: 15, cantidad: 2, esFragil: false}
]

// ======================================
// 2.Manipulacion de datos
// ======================================

// Normalizar el nombre a maysuculas
let nombreNorm = nombreCliente.toLocaleUpperCase();

// Calcular el subtotal recorriendo el carrito
let subtotal = 0;
carrito.forEach( producto => {subtotal += producto.cantidad * producto.precio} );

// Comprobamos si algun producto es fragil
let envioFragil = carrito.some( producto => producto.esFragil === true);

// ======================================
// 3.Control de flujo (Validacion y Descuento)
// ======================================
if (!stock) {
    console.log("Error: Hay productos en el carrito que no estan en stock");
    process.exit(); 
}

// Comrobar si hay descuento
let porcentajeDescuento = 0;
if (subtotal >= 100) {
    porcentajeDescuento = 0.05;
}

// ==========================================
// 4. Cálculos Aritméticos
// ==========================================
let descuentoAplicado = subtotal * porcentajeDescuento;
let subtotalDescontado = subtotal - descuentoAplicado;

// Calculo del total aplicando el IVA
let total = subtotalDescontado * (1 + IVA);

// ==========================================
// 5. Fechas con dayjs
// ==========================================

// Sumamos 3 días a la fecha actual para la entrega
let fechaEntrega = dayjs().add(3, 'day').format('DD/MM/YYYY');

// ==========================================
// 6. Template Literals (Resumen en consola)
// ==========================================

// Creamos una lista de string para mostrar los productos del carrito
let listaCarrito = carrito.map(p => `${p.cantidad}x ${p.nombre}`).join("\n - ");

const resumenPedido = `
=========================================
🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
=========================================
👤 Cliente: ${nombreNorm}
📦 Productos en el carrito:
  - ${listaCarrito}

⚠️ Embalaje especial por productos frágiles: ${envioFragil ? "SÍ REQUERIDO" : "No necesario"}

--- Desglose de Facturación ---
Subtotal inicial: ${subtotal.toFixed(2)}€
Descuento aplicado (${porcentajeDescuento * 100}%): -${descuentoAplicado.toFixed(2)}€
Subtotal tras descuento: ${subtotalDescontado.toFixed(2)}€
Impuestos (IVA 21%): ${(subtotalDescontado * IVA).toFixed(2)}€
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Fecha estimada de entrega: ${fechaEntrega}
=========================================
`;

// Mostrar en consola
console.log(resumenPedido);