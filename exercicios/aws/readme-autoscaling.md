

# AWS CLI

https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-services-ec2-instances.html

Script para lançar as máquinas direto sem usar o console.

Somente pegar os IP's publicos.

```sh
# RANCHER-SERVER - ami-0dba2cb6798deb6d8 (64-bit x86)
# CLUSTER -  Processador ARM - ami-0ea142bd244023692

# t3a.micro - 0,0094 USD por hora
# t3.medium	- 0,0416 USD por hora
# curso
# sg-06399c7c14d9800bc
# subnet-xxxxxxxxxx


8 processadores = 1 processador = 1000 milicore = 1 container min 5 cores e max de 10 mili = 1 VPCU = 100 containers
8 VPCU = 800 containers
10 x 8 = 8.000 containers

a1.2xlarge	8	N/D	16 GiB	Somente EBS	0,204 USD por hora
a1.4xlarge	16	N/D	32 GiB	Somente EBS	0,408 USD por hora


# RANCHER SERVER
$ aws ec2 run-instances --image-id ami-0dba2cb6798deb6d8 --count 1 --instance-type t3.medium --key-name curso --security-group-ids sg-06399c7c14d9800bc --subnet-id subnet-adc5a783 --user-data file://rancher.sh --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=rancherserver}]' 'ResourceType=volume,Tags=[{Key=Name,Value=rancherserver}]' 


# MASTER
$ aws ec2 run-instances --image-id ami-0dba2cb6798deb6d8 --count 1 --instance-type t3.medium --key-name curso --security-group-ids sg-06399c7c14d9800bc --subnet-id subnet-adc5a783 --user-data file://k3s.sh --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=k8s-master}]' 'ResourceType=volume,Tags=[{Key=Name,Value=k8s-master}]'

## Entrar na instância pelo console da aws e rodar no shell como sudo:
# cat /var/lib/rancher/k3s/server/node-token
# Pegar o token e fazer a string para rodar no arquivo k3s-node.sh

# NODE X
$ aws ec2 run-instances --image-id ami-0ea142bd244023692 --count 10 --instance-type a1.2xlarge --key-name curso --security-group-ids sg-06399c7c14d9800bc --subnet-id subnet-adc5a783 --user-data file://k3s-node.sh --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=k8s-node}]' 'ResourceType=volume,Tags=[{Key=Name,Value=k8s-node}]'

# Importar o cluster para dentro do Rancher, pegando a string de conexão que é gerada quando importamos o cluster.

$ curl --insecure -sfL https://3.238.150.14/v3/import/gfh8dlj62wsfq6xr4xdjzmrnldfn6jtgzhfv2glhhpxz88nw6thg2b.yaml | k3s kubectl apply -f -

```







# Aula 18 - Autoscaling

### Autoscaling

Iremos executar o tutorial oficial para autoscaling.

https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin

Para isso iremos rodar e expor o php-apache server

Desabilitar o monitoramento com prometheus e Grafana para o Autoscaling poder funcionar.


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




