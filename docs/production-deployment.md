# Production deployment

Use `Dockerfile.production` for a non-root image. Apply the deployment, service, network policy, Trivy Job, Falco DaemonSet, OPA policy, and Prometheus/Alertmanager configuration through an environment-specific release process. Keep webhook secrets in Kubernetes Secrets, not YAML committed to Git.
