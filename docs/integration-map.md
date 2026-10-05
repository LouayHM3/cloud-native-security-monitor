# Integration map

| Layer | Local contract | Production component |
| --- | --- | --- |
| Build time | `data/trivy.json`, `parseTrivy` | Trivy image/config scan in CI |
| Admission | `evaluatePolicy`, `k8s/policy.rego` | OPA/Gatekeeper admission webhook |
| Runtime | `data/falco.json`, `parseFalco` | Falco DaemonSet and event stream |
| Metrics | `/metrics`, `infra/prometheus.yml` | Prometheus scrape and alert rules |
| Visualization | `dashboards/security-overview.json` | Grafana dashboard provisioning |
| Response | `infra/alertmanager.yml` | Alertmanager routing to on-call |
