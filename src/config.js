export function loadConfig(env = process.env) {
  return { nodeEnv: env.NODE_ENV ?? 'development', port: Number(env.PORT ?? 3002), metricsPrefix: env.METRICS_PREFIX ?? 'security_', webhookSecret: env.ALERT_WEBHOOK_SECRET ?? '' };
}

export function verifyWebhook(headers, body, config = loadConfig()) {
  if (!config.webhookSecret) return config.nodeEnv !== 'production';
  return headers['x-alert-secret'] === config.webhookSecret && Boolean(body);
}
