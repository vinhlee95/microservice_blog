# Blog app
A simpler blog app built following microservice pattern.

## Installation
### Prerequisite
- Docker
- Node
- Kubernetes
	- Ingress-nginx
- Skaffold
- Minikube
- Virtualbox (if you want to run the cluster inside a virtualbox VM)

### Run the cluster locally
```shell
skaffold dev
```

### Without skaffold
```shell
kubectl apply -f k8s
```

