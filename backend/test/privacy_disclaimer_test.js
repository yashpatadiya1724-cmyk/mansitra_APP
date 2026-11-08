/**
 * Test Suite: Manasitra Privacy, DPDP Act 2023 Consent & Clinical Disclaimer Engine
 * Verifies:
 * 1. Zero-PII Regex redaction for student phone, email, Aadhaar, and enrollment IDs
 * 2. Immutable cryptographic DPDP consent receipt generation
 * 3. Statutory clinical disclaimer and crisis helpline presence
 */

const assert = require('assert');
const {
  redactPII,
  generateDPDPConsentReceipt,
  getClinicalDisclaimer,
  STATUTORY_CLINICAL_DISCLAIMER,
} = require('../services/privacyService');

console.log('--- Running Manasitra Privacy & Clinical Disclaimer Tests ---');

// 1. Test Phone Number Redaction
const rawTextWithPhone = 'Hello dost, please call me on 9876543210 or +91-9123456789 if you are free';
const phoneRedaction = redactPII(rawTextWithPhone);
assert.strictEqual(
  phoneRedaction.sanitizedText.includes('9876543210'),
  false,
  'Phone number 1 must be redacted'
);
assert.strictEqual(
  phoneRedaction.sanitizedText.includes('9123456789'),
  false,
  'Phone number 2 must be redacted'
);
assert.strictEqual(phoneRedaction.detectedTypes.includes('PHONE_NUMBER'), true);
console.log('✅ Student mobile phone numbers successfully redacted');

// 2. Test Email Redaction
const rawTextWithEmail = 'My student email is rahul.sharma2024@gmail.com, I am feeling overwhelmed';
const emailRedaction = redactPII(rawTextWithEmail);
assert.strictEqual(
  emailRedaction.sanitizedText.includes('rahul.sharma2024@gmail.com'),
  false,
  'Email address must be redacted'
);
assert.strictEqual(emailRedaction.detectedTypes.includes('EMAIL_ADDRESS'), true);
console.log('✅ Student personal email addresses successfully redacted');

// 3. Test Aadhaar Redaction
const rawTextWithAadhaar = 'My verification id is 1234 5678 9012 for the campus hostel';
const aadhaarRedaction = redactPII(rawTextWithAadhaar);
assert.strictEqual(
  aadhaarRedaction.sanitizedText.includes('1234 5678 9012'),
  false,
  'Aadhaar number must be redacted'
);
assert.strictEqual(aadhaarRedaction.detectedTypes.includes('AADHAAR_NUMBER'), true);
console.log('✅ Indian 12-digit Aadhaar numbers successfully redacted');

// 4. Test Student ID Redaction
const rawTextWithRoll = 'My enrollment is SOU-BCA-2024-042 and I failed my semester';
const rollRedaction = redactPII(rawTextWithRoll);
assert.strictEqual(
  rollRedaction.sanitizedText.includes('SOU-BCA-2024-042'),
  false,
  'Roll number must be redacted'
);
console.log('✅ University roll & enrollment numbers successfully redacted');

// 5. Test DPDP Act 2023 Consent Receipt Generation
const studentHash = 'sha256_mock_student_session_abc123';
const receipt = generateDPDPConsentReceipt(studentHash, ['EMOTIONAL_PEER_SUPPORT']);
assert.strictEqual(typeof receipt.consentId, 'string');
assert.strictEqual(receipt.consentId.startsWith('DPDP-'), true);
assert.strictEqual(receipt.dataPrincipal, studentHash);
assert.strictEqual(receipt.complianceStandard.includes('DPDP'), true);
assert.strictEqual(typeof receipt.cryptographicSignature, 'string');
assert.strictEqual(receipt.cryptographicSignature.length, 64);
assert.strictEqual(receipt.rightsGranted.length, 4);
console.log('✅ DPDP Act 2023 cryptographic consent receipt validated');

// 6. Test Clinical Disclaimer Presence
const disclaimer = getClinicalDisclaimer();
assert.strictEqual(typeof disclaimer.short, 'string');
assert.strictEqual(disclaimer.short.includes('not a licensed medical doctor'), true);
assert.ok(disclaimer.emergencyHelplines.length >= 3, 'Must have at least 3 helplines');
const teleManas = disclaimer.emergencyHelplines.find(h => h.name === 'Tele-MANAS');
assert.strictEqual(teleManas.dial, '14416');
console.log('✅ Statutory clinical disclaimer and Tele-MANAS (14416) verified');

console.log('--- Privacy & Clinical Disclaimer Tests: ALL PASSED ---');
