package kubernetes.admission

deny[msg] {
  input.request.object.spec.template.spec.containers[_].securityContext.privileged == true
  msg := "privileged containers are not allowed"
}

deny[msg] {
  not input.request.object.spec.template.spec.containers[_].resources.limits
  msg := "container resource limits are required"
}
