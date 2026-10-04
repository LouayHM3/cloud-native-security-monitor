import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePolicy, parseFalco, parseTrivy } from '../src/collectors.js';

test('normalizes scanner output', () => {
  const rows = parseTrivy({ Results: [{ Target: 'api', Vulnerabilities: [{ VulnerabilityID: 'CVE-1', Severity: 'HIGH' }] }, { Target: 'worker', MisconfSummary: { Failures: 2 } }] });
  assert.equal(rows.length, 2);
  assert.equal(rows[0].issue, 'CVE-1');
});
test('normalizes Falco events', () => assert.equal(parseFalco({ events: [{ rule: 'shell' }] })[0].detector, 'falco'));
test('denies a workload that violates all admission policies', () => {
  const result = evaluatePolicy({ name: 'debug', securityContext: { privileged: true } });
  assert.equal(result.decision, 'deny');
  assert.equal(result.failed.length, 3);
});
