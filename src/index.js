export const imageFindings = [
  { image: 'payments/api:2.4.1', scanner: 'trivy', severity: 'HIGH', issue: 'CVE-2024-21626', target: 'container image' },
  { image: 'payments/worker:2.4.1', scanner: 'trivy', severity: 'MEDIUM', issue: 'runAsRoot', target: 'deployment manifest' }
];

export const policyDecisions = [
  { workload: 'payments-api', policy: 'require-resource-limits', decision: 'allow', reason: 'cpu and memory limits present' },
  { workload: 'debug-shell', policy: 'disallow-privileged', decision: 'deny', reason: 'privileged=true' }
];

export const runtimeEvents = [
  { pod: 'payments-api-7d8f', detector: 'falco', rule: 'Terminal shell in container', priority: 'Warning', count: 3 },
  { pod: 'payments-db-0', detector: 'falco', rule: 'Unexpected outbound connection', priority: 'Notice', count: 8 }
];

export function metrics() {
  return [
    `security_image_findings{severity="high"} ${imageFindings.filter(x => x.severity === 'HIGH').length}`,
    `security_policy_denials ${policyDecisions.filter(x => x.decision === 'deny').length}`,
    `security_runtime_events{priority="warning"} ${runtimeEvents.filter(x => x.priority === 'Warning').reduce((n, x) => n + x.count, 0)}`
  ].join('\n') + '\n';
}

export function securitySummary() {
  return { imageFindings, policyDecisions, runtimeEvents, metrics: metrics() };
}
