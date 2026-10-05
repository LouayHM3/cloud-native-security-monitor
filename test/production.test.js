import test from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig, verifyWebhook } from '../src/config.js';

test('requires a webhook secret in production', () => {
  const config = loadConfig({ NODE_ENV: 'production', ALERT_WEBHOOK_SECRET: 'secret' });
  assert.equal(verifyWebhook({ 'x-alert-secret': 'secret' }, '{}', config), true);
  assert.equal(verifyWebhook({}, '{}', config), false);
});
test('development accepts local webhook fixtures', () => assert.equal(verifyWebhook({}, '{}', loadConfig({ NODE_ENV: 'development' })), true));
