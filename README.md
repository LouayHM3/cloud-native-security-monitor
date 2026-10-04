# Cloud-Native Security Monitor

A dependency-free simulation of a Kubernetes security observability loop: Trivy findings before deployment, OPA policy decisions at admission, and Falco runtime events exported as Prometheus metrics.

## Run

```bash
npm test
npm start
curl http://localhost:3002/
curl http://localhost:3002/metrics
```

The same data contract can feed Grafana panels for blocked workloads, vulnerable images, and runtime behavior. In a cluster, the in-memory arrays become scanner exports, admission webhook decisions, and Falco event streams.
