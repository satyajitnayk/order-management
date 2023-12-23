const {delay} = require("../utility");

/**
 * it returns success 70% of time
 * @returns {boolean}
 */
async function checkPayment({ txnId, orderId }) {
  await delay(2000)
  return Math.random() < 0.7;
}
module.exports = {checkPayment}
