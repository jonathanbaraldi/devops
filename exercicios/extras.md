

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
$ kubectl create -f nginx-policy.yml
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























# Configuração de CPU por namespace

## Configure Minimum and Maximum CPU Constraints for a Namespace

https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace/

### Criar Namespace com configuração

```sh
$ kubectl create namespace constraints-cpu-example

$ kubectl apply -f cpu-constraints.yml

# Ver as informações detalhadas
$ kubectl get limitrange cpu-min-max-demo-lr --output=yaml --namespace=constraints-cpu-example
```

Agora, sempre que um container é criado no namespace constraints-cpu-example, o Kubernetes irá executar esses passos:

SE não for especificado CPU request e limit para o container, irá definir o padrão de CPU request e limit para o container.

Verificar que o container especificou CPU request que é maior ou igual a 200 milicpu.

Verificar que o container especificou um limit de CPU que é menor ou igual a 800 milicpu.


### Criar POD

```sh

$ kubectl apply -f cpu-constraints-pod.yml

$ kubectl get pod constraints-cpu-demo --namespace=constraints-cpu-example
# Ver as informações detalhadas
$ kubectl get limitrange cpu-min-max-demo-lr --output=yaml --namespace=constraints-cpu-example

$ kubectl get pod constraints-cpu-demo --output=yaml --namespace=constraints-cpu-example

resources:
  limits:
    cpu: 800m
  requests:
    cpu: 500m


```
### Deletar POD

```sh
$ kubectl delete pod constraints-cpu-demo --namespace=constraints-cpu-example
```

### Criar um POD que ultrapasse o limite de CPU

```sh

$ kubectl apply -f cpu-constraints-pod-2.yml

Error from server (Forbidden): error when creating "examples/admin/resource/cpu-constraints-pod-2.yaml":
pods "constraints-cpu-demo-2" is forbidden: maximum cpu usage per Container is 800m, but limit is 1500m.

```









# RANCHER-UI











# PERMISSÕES - IAM

## Nível do Rancher
	Criar e gerenciar clusters, usuários, etc,

## Nível do Cluster
	Criar e gerenciar objetos, deployments, etc


ADMIN - pode tudo
DEV - esse usuário , permissão para quase tudo, exceto ver o secrets.






# Certificado SSL - AWS Cert-manager

1) Criação do certificado

2) Criação do ELB, registrando as máquinas e usando o certificado criado anteriormente
	- Success codes - 404

3) Alteração do DNS     * .rancher.<dominio>    para apontar para o ELB - somente https

4) Testar aplicações

```sh
$ kubectl apply -f app.yml
```












# Importação de cluster


Para fazermos a Federação do cluster iremos executar os seguintes passos:

1) Criação de outro cluster. Criar outro cluster, usando uma máquina UBUNTU na AWS, e iremos instalar esse novo cluster usando o K3S.

https://k3s.io

```sh
$ sudo su
$ curl -sfL https://get.k3s.io | sh -
  # Check for Ready node, 
  takes maybe 30 seconds
$ k3s kubectl get node
```

2) Depois do novo cluster instalado, iremos fazer a importação do cluster dentro do nosso Rancher atual.











# ISTIO - ServiceMesh

```sh
$ kubectl label namespace default istio-injection=enabled

$ kubectl apply -f bookinfo.yml

$ kubectl get services

$ kubectl get pods

$ kubectl exec -it "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

$ kubectl apply -f bookinfo-gateway.yml

```

















# PRODUCAO

## Segurança
	- Camas de segunraça
	- CSI Scans
	- imagens
	- Portas das máquinas
	- Usuarios e namespaces


## Administração e gerenciamento do cluster
	- Limpeza do clsuter
	- Limites dos PODS e NAMESPACES
	- Serviços para os desenvolvedores

	- Logs
	- monitoramento
	- Registro
	- Pipeline

