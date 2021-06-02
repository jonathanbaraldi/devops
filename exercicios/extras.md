

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

## Federação
https://platform9.com/blog/kubernetes-federation-what-it-is-and-how-to-set-it-up/

https://github.com/kubernetes-sigs/kubefed

## Importação
Para fazermos a Importação do cluster iremos executar os seguintes passos:

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












# Banco de dados em container

https://blogs.oracle.com/cloudnative/running-a-mysql-database-in-containers-the-right-way

https://github.com/oracle/mysql-operator


The MySQL Operator provides the following core features:

Create and delete highly available MySQL InnoDB clusters in Kubernetes with minimal effort
Automate database backups, failure detection, and recovery
Schedule automated backups as part of a cluster definition
Create "on-demand" backups.
Use backups to restore a database


## Pontos a destacar

- Performance
- Gerenciamento - Backup
- Automações



```sh

$ kubectl create ns mysql-operator
$ helm install --name mysql-operator mysql-operator


```










# ISTIO - ServiceMesh - Parte 1

https://istio.io/latest/docs/examples/bookinfo/
Arquitetura do Istio.

Habilitar o Istio no Rancher.

Implantar a aplicação BookInfo e ver a arquitetura dela.


```sh
$ kubectl label namespace default istio-injection=enabled

$ kubectl apply -f bookinfo.yml

$ kubectl get services

$ kubectl get pods

```

Gerar tráfego acessando a URL.

Acessar Kiali e Jaeger e Grafana






# DIND - Docker Inside Docker

https://hub.docker.com/_/docker



```sh
$ docker pull docker

$ docker run --privileged --name dind -d docker:dind
$ docker exec -it dind /bin/sh  


$ docker run --privileged --name dind2 -d docker:dind
$ docker exec -it dind2 /bin/sh  


$ docker run --privileged --name dind3 -d docker:dind
$ docker exec -it dind3 /bin/sh 

```

Gerar tráfego acessando a URL.

Acessar Kiali e Jaeger e Grafana




# Limpeza de cluster

Usar o repositório:

https://github.com/jonathanbaraldi/k8s-cleanup



# Rancher HA - Rancher RKE

Usar o repositório:

https://github.com/jonathanbaraldi/rancher-ha.git


# Kubernetes HA 

https://github.com/jonathanbaraldi/rancher-ha.git


# Traefik 2.2

https://blog.tomarrell.com/post/traefik_v2_on_kubernetes

https://traefik.io/blog/traefik-2-2-ingress/


Ubuntu 20.04 LTS

Docker 19.03

Kubernetes 1.19.2

Rancher 2.5

Traefik 2.2


```sh
$ cd traefik22
# Alterar o ingress, colocar o host do seu endereço
# Alerar o email e o comentário de staging no deamon-set
$ kubectl apply -k .

# Acessar o dashboard

# trocar o ingress da Aplicação
$ kubectl apply -f app2.yml

```









# K3S - Kubernetes on the Edge / Kubernetes Lightweight

https://k3s.io

https://rancher.com/docs/k3s/latest/en/

https://www.youtube.com/watch?v=WYPd7i15XOg&t=

https://www.slideshare.net/ShannonWilliams14/introducing-k3s-a-lightweight-kubernetes-distribution

PDF

```sh
# Rancher Server - 

$ ssh -i devops-ninja.pem ubuntu@

# K3S
$ ssh -i devops-ninja.pem ubuntu@
$ ssh -i devops-ninja.pem ubuntu@
$ ssh -i devops-ninja.pem ubuntu@


# Instalacao do Rancher
$ curl https://releases.rancher.com/install-docker/19.03.sh | sh
$ docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  --privileged \
  rancher/rancher:latest


# K3S - MASTER
$ sudo su
$ curl -sfL https://get.k3s.io | sh -

# Kubeconfig é escrito em  /etc/rancher/k3s/k3s.yaml
$ k3s kubectl get node

# Em um nó diferente, rode o código abaixo. NODE_TOKEN está em  /var/lib/rancher/k3s/server/node-token
	
	# K10feb7a2655de1631f87e50d2a4015a5fb4810dea253327da6c29a6c7d48004e4d::server:c3627e8c3b3a29c281daabb8311a3b44

	K10046df90fbfde67353f94d2ea625d6ea1e478591568b30f47a84aed3d5ba58d4a::server:b8577bbd3e7a56b4377d11a3a8bbecd6
	18.215.188.122

	curl -sfL https://get.k3s.io | K3S_URL=https://18.215.188.122:6443 K3S_TOKEN=K10046df90fbfde67353f94d2ea625d6ea1e478591568b30f47a84aed3d5ba58d4a::server:b8577bbd3e7a56b4377d11a3a8bbecd6 sh -

# NODE
# Logar no node1 - 
	curl -sfL https://get.k3s.io | K3S_URL=https://52.3.235.1:6443 K3S_TOKEN=K10b46e09ab152ef6b307c3cf52ce2fae56cf6054492404a55c3edddfcaba382b50::server:965b7b181d6193cc1593fd8b5babb9b3 sh -
	
	


$ curl -sfL https://get.k3s.io | K3S_URL=https://3.223.140.79:6443 K3S_TOKEN=K10feb7a2655de1631f87e50d2a4015a5fb4810dea253327da6c29a6c7d48004e4d::server:c3627e8c3b3a29c281daabb8311a3b44 sh -

# Logar no node2 - 
$ curl -sfL https://get.k3s.io | K3S_URL=https://3.223.140.79:6443 K3S_TOKEN=K10feb7a2655de1631f87e50d2a4015a5fb4810dea253327da6c29a6c7d48004e4d::server:c3627e8c3b3a29c281daabb8311a3b44 sh -


# IMPORTAR CLUSTER PARA RANCHER
$ curl --insecure -sfL https://3.235.94.249/v3/import/l4nclrvdm4w5cp5f4lglt6g2gcjxmgkxg59hm6w7646kqvc7slq89p.yaml | k3s kubectl apply -f -


# Executar o Kubectl no mac ou integrador
$ kubectl get nodes

```





# Cluster Explorer

https://rancher.com/docs/rancher/v2.x/en/k8s-in-rancher/


Cluster Explorer: 
	New dashboard to provide a deeper look into clusters under management.
	Manage all Kubernetes cluster resources including custom resources from the Kubernetes operator ecosystem
	Deploy and manage Helm charts from our new Apps & Marketplace
	View logs and interact with kubectl shell in a new IDE-like viewer

Ambiente com o mesmo processo de instalação do exercício anterior:

- Ubuntu 20.04 LTS
- Docker 19.03
- Kubernetes 1.18.9 -  K3S
- Rancher 2.5.1







# CUSTOS

https://aws.amazon.com/pt/ec2/pricing/on-demand/

## INICIO CURSO

Rancher server - t3.medium - 0,0416
k8s-1 - t3.medium - 0,0416
k8s-2 - t3.medium - 0,0416
k8s-3 - t3.medium - 0,0416

t3.medium	2	Variável	4 GiB	Somente EBS	0,0416 USD por hora

TOTAL USD 0,1664 x 6 = R$ 0,9984


## NOVO RANCHER

RancherServer - t3.medium - 0,0416
Master - t3.medium- 0,0416
Node-1 - t3a.micro - 0,0094
Node-2 - t3a.micro - 0,0094

t3a.micro	2	Variável	1 GiB	Somente EBS	0,0094 USD por hora
t3.medium	2	Variável	4 GiB	Somente EBS	0,0416 USD por hora

TOTAL = USD 0,102 x 6 = R$ 0,612













# Autoscaling

Mesmo ambiente do exercício anterior, com o Prometheus e Grafana instalados.


```sh
$ kubectl apply -f php-apache.yml
```

Agora iremos fazer a criação do Pod Autoscaler

```sh
$ kubectl apply -f hpa.yml
```

Iremos pegar o HPA

```sh
$ kubectl get hpa
```

### Autoscaling - Aumentar a carga

Agora iremos aumentar a carga no pod contendo o apache em php.

```sh
$ kubectl run -i --tty load-generator --image=busybox /bin/sh
# Hit enter for command prompt
$ while true; do wget -q -O- http://php-apache.default.svc.cluster.local; done
```

Agora iremos em outro terminal, com o kubectl, verificar como está o HPA, e também no painel do Rancher. 

```sh 
$ kubectl get hpa
$ kubectl get deployment php-apache
```









# Kubernetes Dia 2

## Iniciando o dia....

Estes são os itens que ao sentar na cadeira de devops, nós iremos fazer um checklist e verificar TODOS:

* Máquinas estão online no virtualizador ou na nuvem?
* RancherServer está online e acessível?
* Cluster's kubernetes estão todos online e com seus nodes funcionando?
* Monitoramento dos clusters está habilitado e funcionando?
* Sistema de log dos cluster's está habilitado e funcionando?
* Sistema de DNS dos cluster's está habilitado e funcionando?
* Sistema de volumes dos clusters está habilitado e funcionando?
* Ferramenta de Registro de imagens está online e funcionando?
* Revisão dos backups se estão sendo executados.
* Aplicações que fazem a limpeza no cluster estão rodando sem problemas? Verificar os logs.
* Comandos de kubectl respondem normalmente?

Ferramentas periféricas
* Ferramenta de integração contínua, online e funcionando? Se for o pipeline do Rancher, é na lista anterior.
* Ferramenta de repositório de código, git, online e funcionando?

Itens para ficar atento
* Quantidade de espaço em disco disponível nos worker's
* Consumo excessivo de recursos como CPU ou MEMÓRIO por algum container, pois significa que não foi aplicada a política controle de recursos.

CASO todos os itens acima tenham sido revisados e estejam OK, dai então podemos ir para as aplicações rodando dentro do cluster.


## Principais problemas

* Meu cluster não sobe
	* Verificar portas abertas
	* Verificar logs dos containers nos nós
	* DNS, propagação de domínio
* Minha aplicação na sobe
* Os nós do cluster não se comunicam
* Meu pod está online, mas minha aplicação não
* Não consigo acessar minha aplicação
* Onde vejo os logs
* Onde vejo o monitormento?
* Onde acompanho os deployment's?
* Pipeline com problema, como resolvo?

## Referências

[Nirmata - Day 2 Kubernetes!](https://nirmata.com/2020/06/15/what-is-day-2-kubernetes/)

[ITOPS Times - Gerenciando Kubernetes no 2](https://www.itopstimes.com/contain/managing-day-2-kubernetes/)


O Kubernetes passou do Dia 0 e do Dia 1 e agora está na fase do **Dia 2** para a maioria das empresas. De acordo com Tobi Knaup, co-CEO e cofundador da empresa de gerenciamento nativo da nuvem D2IQ, o Dia 0 é a fase de design e prova de conceito, o Dia 1 é a fase de instalação e implantação e o Dia 2 é quando coisas como monitoramento, manutenção e a solução de problemas entram em jogo. O dia 2 também é quando um aplicativo passa de apenas um projeto de desenvolvimento para uma vantagem estratégica real para o negócio.

A **capacidade de monitoramento** também é importante por causa de todas as tecnologias que interagem com o Kubernetes. Quando você está executando clusters do Kubernetes, muitas vezes ele está sendo implantado junto com uma série de outras tecnologias. De acordo com Knaup, você precisa ser capaz de ter **dados de telemetria ao vivo em todas as partes do sistema** e ser capaz de depurar e diagnosticar problemas e encontrar sua causa raiz. “Todas essas são preocupações que, na verdade, o próprio Kubernetes não resolve”, disse Knaup. “Portanto, você precisa reunir uma pilha inteira de outras tecnologias de código aberto no ecossistema nativo da nuvem, para construir, por exemplo, uma pilha de monitoramento ou para construir uma história de segurança forte.”

Existem várias ferramentas que podem ajudar no monitoramento do Kubernetes, como **Prometheus, Jaeger ou Fluentd**, apenas para citar alguns. Pemmaraju recomenda que os administradores de TI não apenas obtenham treinamento no Kubernetes, mas também se familiarizem com o que está acontecendo no ecossistema Kubernetes. “Não se trata apenas do Kubernetes, **mas dos serviços em torno dele**, seja rede, armazenamento, monitoramento, alerta. Todas essas são coisas com as quais você precisa se familiarizar rapidamente ”, disse Pemmaraju.

Outra consideração no Dia 2 é a **escalabilidade**. Quando as empresas começam a usar o Kubernetes, podem ter alguns clusters em execução. Mas, de acordo com Knaup, o uso do Kubernetes pode se espalhar rapidamente por toda a organização depois que esses primeiros projetos forem implantados, portanto, ter a capacidade de escalonar é importante.

Freqüentemente, o Kubernetes é adotado de baixo para cima, o que significa que as equipes adotam o Kubernetes **separadamente**. Eventualmente, as organizações precisam consolidar tudo isso de forma consistente.

### Os operadores do Kubernetes ajudam na automação

Depois que uma empresa aborda essas preocupações gerais, que tipo de ferramenta a ajudará no Dia 2? De acordo com Knaup, os operadores tornam-se essenciais nesta fase. Os operadores do Kubernetes são ferramentas que basicamente automatizam a operação de cargas de trabalho complexas do segundo dia. Mais especificamente, de acordo com OperatorHub, os operadores implementam e automatizam atividades comuns do Dia 1, como instalação e configuração, e atividades do Dia 2, como reconfiguração, atualizações, backups, failovers, etc.

OperatorHub é um índice de operadores da comunidade que são empacotados para implantação em clusters Kubernetes. OperatorHub foi lançado pela Red Hat, os criadores do Operator Framework. Amazon, Microsoft e Google também estavam no grupo inicial de suporte ao OperatorHub.

[Operator Hub](https://operatorhub.io)

**GitOps** surge como uma metodologia poderosa para os desenvolvedores interagirem com o Kubernetes

Outra coisa que Knaup recomenda que as empresas examinem ao entrar no Dia 2 é o GitOps. Por causa da atual pandemia global, a KubeCon EU foi cancelada, mas de acordo com Knaup, cerca de **20%** das negociações programadas eram sobre GitOps.

GitOps é uma metodologia iniciada em 2017 na Weaveworks. De acordo com a Weaveworks, GitOps usa **“Git como uma única fonte de verdade para infraestrutura declarativa e aplicativos. Com o Git no centro de seus canais de entrega, os desenvolvedores podem fazer solicitações pull para acelerar e simplificar as implantações de aplicativos e tarefas operacionais para o Kubernetes.”**

Fleet
[Fleet](https://fleet.rancher.io)




 
# ARM - A morte do X86

## ARM vs X86

Diferenças e arquiteturas

1983 - Empresa chamada Acorn - pensou diferente. Ao inves de fazer mais e mais complicado, porque não usar uma abordagem mais simples? 

RISC - Reduced INSTRUCTION SET COMPUTING
Simple instruction set, faster- A idéia é não adicionar complexidade na máquina, a não ser que ela pague por ela mesma.

Projeto - Acorn RISC - Nascimento de todos os processadores dos smartphones de hoje em dia

ARM - mobile phones - ARM, originalmente Acorn RISC Machine, e depois Advanced RISC Machine, é uma família de arquiteturas RISC desenvolvida pela empresa britânica ARM Holdings. Tais arquiteturas são licenciadas pela ARM para outras empresas, que implementam-nas em seus próprios produtos.

**RISC = SIMPLE CPU** 
**CISC = COMPLEX CPU**

Coldfusion
[Coldfusion](https://www.youtube.com/watch?v=OuF9weSkS68)

Professor que criou o ARM - depoimento
* RISC era tão óbvio - Queriam saber o que seria ruim.

8:00
>> A DESCOBERTA DAS PROPRIEDADES DE BAIXO CONSUMO DE ENERGIA DO ARM
	Eles desenharam um chip para ser de muito baixo consumo, mas 0 era inesperado.

8:24
>> Mesmo desconectado da fonte de energia, o chip continuava rodando.

Basicamente o Chip estava rodando com energia residual.
Sem power supply e continuava rodando....

1985 - primeiros protótipos

1987 - Primeiro computador ARM produzido
		nao foi muito bem
		mas para mobile....

Como é tão eficiente???

ARM - one simple instruction per clock cycle
X86 - multiple cycles per instruction - Mais gasto de energia para computar

Durante os anos 90, ambos estavam florescendo.

2001 - arm no iPod

CEO Intel- Paul Otelini
12:43 - Dono da Intel não acredito que o iPhone venderia,por isso a Intel não queria fazer chips mobile.

Ledo engano.

X86 - PC e servidores

The “classic” formulation of the x86 versus ARM debate goes back to two different methods for building instruction set architectures (ISAs): CISC and RISC. Decades ago, CISC (Complex Instruction Set Computer) designs like x86 focused on relatively complicated, variable-length instructions that could encode more than one operation. CISC-style CPU designs dominated the industry when memory was extremely expensive, both in terms of absolute cost per bit and in access latencies. Complex instruction sets allowed for denser code and fewer memory accesses.

ARM, in contrast, is a RISC (Reduced Instruction Set Computer) ISA, meaning it uses fixed-length instructions that each perform exactly one operation. RISC-style computing became practical in the 1980s when memory costs became lower. RISC designs won out over CISC designs because CPU designers realized it was better to build simple architectures at higher clock speeds than to take the performance and power hits required by CISC-style computing.

[extremetech](https://www.extremetech.com/mobile/312076-what-kind-of-performance-should-we-expect-from-arm-based-macs)

[Comparativo Tecmundo](https://www.tecmundo.com.br/produto/119693-diferenca-processador-arm-um-x86.htm)

[AWS Gratitron](https://aws.amazon.com/pt/ec2/graviton/)

[scylladb](https://www.scylladb.com/2019/12/05/is-arm-ready-for-server-dominance/)

Apple para de usar processadores da Intel e usa ARM em Desktops
E o M1 é o mais rápido processador, não gastando quase nada de energia

Goodbye X86
https://www.youtube.com/watch?v=67KW4t42SZk





# A MORTE DO DOCKER

https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/





# Fleet - Multi-cluster deployment

http://fleet.rancher.io/

Mostrar e explicar os componentes do Fleet.io

Fazer o deployment do Rancher
Fazer o deployment de 3 clusters, sendo 1 máquina cada. No exemplo eu uso uma c4.xlarge.

```sh
$ docker run -d --name rancher -v /opt/rancher:/var/lib/rancher --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher:stable
```


Nossa simulação tem o objetivo de fazer o seguinte:

- prod-1 - DC Região São Paulo | Cliente A
- prod-2 - DC Região Sul       | Cliente B
- prod-3 - DC Região Norte	   | Cliente C

Abrir o Explorer e ir no Fleet.

Estudar a estrutura do GIT para poder entender o que faz cada coisa, bem como a documentação do Fleet.

https://github.com/jonathanbaraldi/fleet

Criar o Workspace.
Colocar os clusters no workspapce -  colocando o label certo.

env: prod-1
env: prod-2
env: prod-3

Configurar o repositório do Git para conectar

Esperar o deployment

Fazer alterações no deployment e comitar e monitorar.





# Além do Kubernetes

https://rancher.com/beyond-kubernetes




# Upgrade Rancher - SingleNode

Fazer o deployment do Rancher Single Node, versão 2.4.3, salvando o volume local. 

Rancher    2.4.3 - 2.5.5
Kubernetes 1.17.5 - 1.19.7


```sh
#!/bin/bash
curl https://releases.rancher.com/install-docker/19.03.sh | sh
docker run -d --name rancher --restart=unless-stopped -v /opt/rancher:/var/lib/rancher -p 80:80 -p 443:443 rancher/rancher:v2.4.3

```

Fazer o deployment do cluster Kubernetes.

```sh
#!/bin/bash
curl https://releases.rancher.com/install-docker/19.03.sh | sh
docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.4.3 --server https://3.231.24.217 --token xd5qrv45jcblq2sdffsxvkkbwxfq2ls9zhzdwq4rp6ggbplt9tsnl4 --ca-checksum ba99499c86927047107b28492a255d133546138d72e013fe98e8c7c6f7f2e62a --etcd --controlplane --worker

```


Acessar o Rancher, e criar um usuário, ou alguma coisa para podermos ver que é o mesmo Rancher após o upgrade.


```sh
$ docker pull rancher/rancher:stable

$ docker stop rancher

$ docker ps

$ docker run -d --name rancher-2-5 -v /opt/rancher:/var/lib/rancher --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher:stable

Rancher Upgraded!!

# Acessar o Rancher e ver como ficou
# Upgrade Kubernetes

# Acessar a UI do Rancher, trocar a versão do Kubernetes e aguardar.

# Kubernetes Upgraded!!


```
# CANARY DEPLOYMENT

Pasta do Canary

../canary


# SEGURANÇA NA AWS

## Parte 1
- Inspector - OK
- GuardDuty - OK
- Config - OK


## Parte 2
- SecurityHub
- Detective
- WAF






# Engenharia do Chaos - Chaos Engineering - Parte 1 - Introdução

Pasta ../chaos-engineering













