import test from 'node:test';
import assert from 'node:assert/strict';
import { metrics, securitySummary } from '../src/index.js';

test('summary includes the three control layers', () => {
  const result = securitySummary();
  assert.ok(result.imageFindings.length && result.policyDecisions.length && result.runtimeEvents.length);
});

test('metrics expose actionable denial and runtime counts', () => {
  const output = metrics();
  assert.match(output, /security_policy_denials 1/);
  assert.match(output, /security_runtime_events\{priority="warning"\} 3/);
});
