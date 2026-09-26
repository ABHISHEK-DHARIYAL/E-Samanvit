/**
 * Address controller.
 *
 * Responsibility: validate a pincode and return the enrichment
 * result from AddressEnrichmentAdapter — this is a thin pass-through,
 * all fetch/fallback logic lives in the adapter itself.
 */
const { InvalidRequestError } = require('../utils/errors');
const { lookupByPincode } = require('../adapters/utilities/address/AddressEnrichmentAdapter');

const PINCODE_RE = /^\d{6}$/;

async function getAddressByPincode(req, res) {
  const { pincode } = req.params;

  if (!pincode || !PINCODE_RE.test(pincode)) {
    throw new InvalidRequestError('pincode must be a 6-digit Indian PIN code');
  }

  const result = await lookupByPincode(pincode);
  res.status(200).json({ success: true, address: result });
}

module.exports = { getAddressByPincode };
