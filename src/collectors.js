export function parseTrivy(report) {
  const results = report.Results ?? [];
  return results.flatMap(result => {
    if (result.Vulnerabilities?.length) return result.Vulnerabilities.map(vulnerability => ({ image: result.Target, scanner: 'trivy', severity: vulnerability.Severity, issue: vulnerability.VulnerabilityID, title: vulnerability.Title ?? 'Vulnerability', target: result.Class }));
    return result.MisconfSummary?.Failures ? [{ image: result.Target, scanner: 'trivy', severity: 'MEDIUM', issue: 'configuration-failures', title: `${result.MisconfSummary.Failures} configuration failures`, target: result.Class }] : [];
  });
}

export function parseFalco(report) {
  return (report.events ?? []).map(event => ({ ...event, detector: 'falco' }));
}

export function evaluatePolicy(workload) {
  const checks = [
    ['require-resource-limits', Boolean(workload.resources?.limits)],
    ['disallow-privileged', workload.securityContext?.privileged !== true],
    ['require-run-as-non-root', workload.securityContext?.runAsNonRoot === true]
  ];
  const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);
  return { workload: workload.name, decision: failed.length ? 'deny' : 'allow', failed, reason: failed.length ? `failed policies: ${failed.join(', ')}` : 'all policies passed' };
}
