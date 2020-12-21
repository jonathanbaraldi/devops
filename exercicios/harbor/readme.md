
# Harbor

https://goharbor.io/docs/2.1.0/install-config/installation-prereqs/

Requisitos para o HOST:

1. Docker engine
2. Docker Compose
3. Openssl	Latest

Instalação do Docker - UserData

```sh
#!/bin/bash
curl https://releases.rancher.com/install-docker/19.03.sh | sh
```

harbor.sagemaker.io

rancher.sagemaker.io



```sh
# harbor   
$ ssh -i curso.pem ubuntu@34.239.159.86
# rancher-server  
$ ssh -i curso.pem ubuntu@3.238.204.119

# k8s-1 
$ ssh -i curso.pem ubuntu@3.236.241.38
```




# HARBOR

Falar das funcionalidade do Harbor

Download the Harbor Installer
Configure HTTPS Access to Harbor
Configure the Harbor YML File
Configure Enabling Internal TLS
Run the Installer Script


```sh
$ ssh -i curso.pem ubuntu@3.239.91.96


#Instalar Docker
$ sudo su
$ curl https://releases.rancher.com/install-docker/19.03.sh | sh
$ usermod -aG docker ubuntu

#Instalar Docker-Compose
$ apt-get install git -y
$ curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
$ ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose


$ cd /home/ubuntu
$ wget https://github.com/goharbor/harbor/releases/download/v2.1.2/harbor-online-installer-v2.1.2.tgz
$ tar -zxvf harbor-online-installer-v2.1.2.tgz


#
$ cd harbor
# Vamos editar o harbor.yml.tmpl
# ALTERAR O HOSTNAME
# ALTERAR O HTTPS

# https://goharbor.io/docs/2.1.0/install-config/configure-yml-file/


# SCAN DE VULNERABILDIADES
# https://goharbor.io/docs/1.10/administration/vulnerability-scanning/
# https://goharbor.io/docs/1.10/install-config/run-installer-script/

$ ./install.sh --with-clair

# admin
# Harbor12345
```

Entra no harbor, criar um usuário, e um projeto.
Dar permissão para meu usuário enviar imagens para esse projeto.

Habilitar o SCAN de vulnerabilidades.



# K8S-1

Entrar no worker.
Configurar o Docker para usar o registro privado
Configurar o Docker para usar registro não seguro.
Fazer push, criar um nginx com a TAG
Fazer pull, enviar a imagem para o repositório privado.

Rodar template YML para fazer baixar a imagem no cluster.


```sh

$ curl https://releases.rancher.com/install-docker/19.03.sh | sh
$ ssh -i curso.pem ubuntu@3.239.54.85

# Editar para conectar no registro inseguro:
$ vi /etc/docker/daemon.json
{
	"insecure-registries" : ["harbor.sagemaker.io"]
}
$ systemctl restart docker
$ docker login
# usando o usuário que criamos anteriormente
Login Succeeded


$ docker pull nginx
$ docker tag nginx harbor.sagemaker.io/devops/nginx:ninja
$ docker push harbor.sagemaker.io/devops/nginx:ninja

```

Entrar no Harbor e ver a imagem, e pedir para fazer SCAN de vulnerabilidade dela.
Mostrar os níveis de severidade da imagem.


Habilitar o item para não deixar baixar se a imagem tiver muita severidade.
* Depois é preciso remover, para poder rodar o NGINX.


# RANCHER

Já instalado, normalmente.



# CLUSTER K8S
Criar o cluster, e adicionar os nós normalmente.

Entrar nas demais máquinas do cluster, colocar o registro inseguro, e fazer o docker login.

```sh
# Editar para conectar no registro inseguro:
$ vi /etc/docker/daemon.json
{
	"insecure-registries" : ["harbor.sagemaker.io"]
}
$ systemctl restart docker
$ docker login harbor.sagemaker.io
# usando o usuário que criamos anteriormente
Login Succeeded


$ docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.5.3 --server https://rancher.sagemaker.io --token 85b9hkq4lss7gpqpnlz8p6h67wshgbfvtrd45xq87jx7jkb7kpdd2c --ca-checksum 99fdfd00fd534bbf77c7a87e7bcf74adc3dd9c50dfd71ee4c35559918b780a5c --node-name k8s-3 --etcd --controlplane --worker
```


# APP
Assim que o cluster estiver pronto, fazer o deployment de 5 pods da imagem que fizemos o envio:

**harbor.sagemaker.io/devops-ninja/nginx:ninja**



