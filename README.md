# EcoLog
Sistema de Registro y Seguimiento de Pedidos para Comercio Local

## Descripción:

El alumno actuará como desarrollador backend para una tienda de productos ecológicos. El objetivo es crear un script de Node.js (``pedido.js``) que procese la información de una compra, realice cálculos de impuestos y determine la fecha estimada de entrega.

## Requisitos técnicos:

1. **Entorno:** El script debe ejecutarse mediante el comando ``node`` en la terminal.
2. **Variables y Lógica:** Utilizar ``const`` para valores fijos (como el IVA del **21%**) y ``let`` para valores mutables (como el total del carrito).
3. **Manipulación de Datos:** * Normalizar el nombre del cliente (convertir a mayúsculas).
    - Verificar si el pedido incluye productos frágiles usando ``.includes()``.
4. **Cálculos:** Aplicar operadores aritméticos para calcular el precio final con la fórmula:
$$Total = Subtotal \times (1 + \text{IVA})$$
5. **Fechas:** Utilizar la librería **dayjs** para calcular la fecha de entrega, sumando 3 días a la fecha actual.
6. **Control de Flujo:** Implementar un ``if/else`` para aplicar un descuento del **5%** si la compra supera los 100€.