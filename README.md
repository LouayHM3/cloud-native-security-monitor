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

The `k8s`, `infra`, `dashboards`, `data`, and Docker files show the production deployment contracts. In a cluster, the in-memory arrays become scanner exports, admission webhook decisions, and Falco event streams.
