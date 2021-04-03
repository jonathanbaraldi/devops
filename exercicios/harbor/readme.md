
# Harbor

https://goharbor.io

https://goharbor.io/docs/2.1.0/install-config/installation-prereqs/

Requisitos para o HOST:

1. Docker engine
2. Docker Compose
3. Openssl	Latest

Iremos usar 4 Máquinas

1- Harbor
2- Rancher
3- K8S-1
4- K8S-2


Instalação do Docker - UserData

```sh
#!/bin/bash
curl https://releases.rancher.com/install-docker/19.03.sh | sh
```

URL
harbor.dev-ops-ninja.com


```sh
# harbor   
$ ssh -i arm.pem ubuntu@3.239.163.132
# rancher-server  
$ ssh -i arm.pem ubuntu@3.230.126.202

# k8s-1 
$ ssh -i arm.pem ubuntu@3.230.119.248
# k8s-2
$ ssh -i arm.pem ubuntu@3.223.127.134
```



# HARBOR

Funcionalidade do Harbor

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


```sh

$ curl https://releases.rancher.com/install-docker/19.03.sh | sh
$ ssh -i curso.pem ubuntu@3.239.54.85

# Editar para conectar no registro inseguro:
$ vi /etc/docker/daemon.json
{
	"insecure-registries" : ["harbor.dev-ops-ninja.com"]
}
$ systemctl restart docker
$ docker login harbor.dev-ops-ninja.com
# usando o usuário que criamos anteriormente
Login Succeeded

$ docker pull nginx
$ docker tag nginx harbor.dev-ops-ninja.com/devops/nginx:ninja
$ docker push harbor.dev-ops-ninja.com/devops/nginx:ninja

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

$ docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.5.3 --server https://3.230.126.202 --token d84q9zlt5p6gh4rxzdsqf4g4gx8tqgvhswkwk759ml46qcw6grbc6k --ca-checksum 109f9fd38b2d7fc2d391e0aaa72114dcb5e31fbd1459a81b40616ca79a974714 --etcd --controlplane --worker
```


# LOGAR KUBERNETES
Logar o Kubernetes no Registro privado!

# APP
Assim que o cluster estiver pronto, fazer o deployment de 5 pods da imagem que fizemos o envio:

**harbor.sagemaker.io/devops-ninja/nginx:ninja**



