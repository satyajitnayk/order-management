const {delay} = require("../utility");

async function createShipment(order) {
  if (!order || !order.orderId || !order.txnId || !order?.items || order?.items?.length === 0) {
    console.error("Invalid order details. Shipment creation failed.");
    return null;
  }
  await delay(1000);
  return {
    shipmentId: "SHIP" + Math.floor(Math.random() * 10000),
    orderId: order.orderId,
    items: order.items,
    shippingAddress: order.shippingAddress || null,
    shipmentDate: new Date(),
    status: "Pending",
  };
}

module.exports = {
  createShipment
}
