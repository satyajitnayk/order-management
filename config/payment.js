/**
 * it returns success 70% of time
 * @returns {boolean}
 */
export function checkPayment({txnId, orderId}) {
  return Math.random() < 0.7;
}
