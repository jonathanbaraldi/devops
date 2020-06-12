

# Políticas de Rede

### Declarar políticas de rede

https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/

https://github.com/ahmetb/kubernetes-network-policy-recipes/

https://ahmet.im/blog/kubernetes-network-policy/

Para ver como funciona as policies de rede do kubernetes, iremos criar um deployment do nginx e expor ele via serviço.

```sh
$ kubectl create deployment nginx --image=nginx

$ kubectl expose deployment nginx --port=80

$ kubectl get svc,pod

```

Iremos ter 2 pods no namespace default rodando o nginx e expondo atraves do serviço chamado nginx.


#### Testando o serviço

Iremos agora testar o acesso do nosso pod no nginx para os outros pods. Para acessar o serviço iremos rodar um prompt de dentro de um container busybox e iremos acessar o nginx

```sh
$ kubectl run busybox --rm -ti --image=busybox /bin/sh
	Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

	Hit enter for command prompt

$ wget --spider --timeout=1 nginx
	Connecting to nginx (10.100.0.16:80)
$ exit
```

Vendo o IP do POD do nginx respondendo, conseguimos ver que existe a conexão.

Agora iremos aplicar as regras no arquivo **nginx-policy.yml**.

```sh
$ kubectl create -f nginx-policy.yaml
```

Após as regras aplicadas, iremos testar novamente a conexão do pod busybox com o nginx.

```sh
$ kubectl run busybox --rm -ti --image=busybox /bin/sh
	Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

	Hit enter for command prompt

$ wget --spider --timeout=1 nginx
	Connecting to nginx (10.100.0.16:80)
	wget: download timed out
$ exit
```

Podemos perceber que está dando timeout na conexão, o container do busybox não consegue conectar no nginx

Agora iremos criar novamente o container do busybox , mas iremos colocar o label de access=true para que o POD possa se conectar.

```sh
$ kubectl run busybox --rm -ti --labels="access=true" --image=busybox /bin/sh
	Waiting for pod default/busybox-472357175-y0m47 to be running, status is Pending, pod ready: false

	Hit enter for command prompt

$ wget --spider --timeout=1 nginx
	Connecting to nginx (10.100.0.16:80)
$ exit
```














kubectl create deployment nginx --image=nginx

kubectl expose deployment nginx --port=80

kubectl get svc,pod





kubectl run busybox --rm -ti --image=busybox -- /bin/sh
	wget --spider --timeout=1 nginx


kubectl apply -f nginx-policy.yml

---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: access-nginx
spec:
  podSelector:
    matchLabels:
      app: nginx
  ingress:
  - from:
    - podSelector:
        matchLabels:
          access: "true"

ACESSAR SEM TER O LABEL

kubectl run busybox --rm -ti --image=busybox -- /bin/sh
	wget --spider --timeout=1 nginx


ACESSAR COM O LABEL

kubectl run busybox --rm -ti --labels="access=true" --image=busybox -- /bin/sh
	wget --spider --timeout=1 nginx