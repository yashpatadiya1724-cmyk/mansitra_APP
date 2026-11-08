const express = require('express');
const router = express.Router();
const {
  redactPII,
  generateDPDPConsentReceipt,
  getClinicalDisclaimer,
} = require('../services/privacyService');

/**
 * GET /api/privacy/disclaimer
 * Returns clinical disclaimer & statutory limitations
 */
router.get('/disclaimer', (req, res) => {
  res.json({
    status: 'ok',
    data: getClinicalDisclaimer(),
  });
});

/**
 * POST /api/privacy/consent/record
 * Generates an immutable DPDP Act 2023 consent receipt
 */
router.post('/consent/record', (req, res) => {
  const { studentHash, purposes } = req.body;
  const receipt = generateDPDPConsentReceipt(studentHash, purposes);
  res.status(201).json({
    status: 'ok',
    consentReceipt: receipt,
  });
});

/**
 * POST /api/privacy/sanitize-preview
 * Tests PII redaction without executing LLM inference
 */
router.post('/sanitize-preview', (req, res) => {
  const { text } = req.body;
  const result = redactPII(text);
  res.json({
    status: 'ok',
    ...result,
  });
});

module.exports = router;
