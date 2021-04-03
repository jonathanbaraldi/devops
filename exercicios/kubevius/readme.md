
# Kubevious

https://github.com/kubevious
https://github.com/kubevious/helm

https://www.youtube.com/watch?v=YVBjt-9ugTg

## K3S

REMOVER o Traefik original do K3S

E instalar o Traefik 2.2 conforme a aula dele.

Entrar no Master e rodar:

```sh
$ mv /var/lib/rancher/k3s/server/manifests/traefik.yaml /tmp/traefik.yaml
$ kubectl -n kube-system delete helmcharts.helm.cattle.io traefik
$ kubectl delete -n kube-system service traefik-dashboard
$ kubectl delete -n kube-system ingress traefik-dashboard
```

## Instalação

```sh
$ kubectl create namespace kubevious
$ helm repo add kubevious https://helm.kubevious.io
$ helm upgrade --atomic -i kubevious kubevious/kubevious --version 0.7.26 -n kubevious 

$ helm upgrade --atomic -i -n kubevious \
    --version 0.7.26 \
    --set ingress.enabled=true \
    kubevious kubevious/kubevious
```
Depois dele instalado, iremos aplicar o ingress.

```sh
$ kubectl apply -f ingress.yaml
```




