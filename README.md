# Cloud-Native Security Monitor

A complete deterministic implementation of a Kubernetes security observability loop: Trivy findings before deployment, OPA policy decisions at admission, and Falco runtime events exported as Prometheus metrics.

## Run

```bash
npm test
npm start
curl http://localhost:3002/
curl http://localhost:3002/metrics
curl http://localhost:3002/health
```

The `k8s`, `infra`, `dashboards`, `data`, `.github`, and Docker files show the production deployment contracts. `docs/integration-map.md` maps each local adapter to Trivy, OPA, Falco, Prometheus, Grafana, and Alertmanager.
