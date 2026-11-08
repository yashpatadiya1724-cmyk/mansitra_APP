/**
 * Manasitra Automated Test Runner
 */

const { execSync } = require('child_process');

console.log('====================================================');
console.log('🧠 MANASITRA AI BACKEND: AUTOMATED TEST SUITE');
console.log('====================================================');

const tests = [
  'test/vector_memory_test.js',
  'test/crisis_escalation_test.js',
  'test/privacy_disclaimer_test.js',
];

let allPassed = true;

for (const testFile of tests) {
  try {
    console.log(`\n▶ Running ${testFile}...`);
    const output = execSync(`node ${testFile}`, { encoding: 'utf-8' });
    console.log(output.trim());
  } catch (err) {
    console.error(`❌ FAILED: ${testFile}`);
    console.error(err.stdout || err.message);
    allPassed = false;
    process.exit(1);
  }
}

console.log('\n====================================================');
console.log('🏆 ALL MANASITRA AI BACKEND TESTS PASSED (100%)');
console.log('====================================================');
