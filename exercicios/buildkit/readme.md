

# Alternativas ao Docker

## kaniko, buildah, docker, buildkit, e mais

https://events19.linuxfoundation.org/wp-content/uploads/2017/11/Comparing-Next-Generation-Container-Image-Building-Tools-OSS-Akihiro-Suda.pdf

https://www.docker.com/blog/advanced-dockerfiles-faster-builds-and-smaller-images-using-buildkit-and-multistage-builds/

## BuildKit

https://github.com/moby/buildkit

https://brianchristner.io/what-is-docker-buildkit/


## AWS re:Invent 2020 - 

Vídeo do Werner Vogels sobre os processadores ARM.

https://www.youtube.com/watch?v=jt-gV1YwmnI

Minuto 28:11

Até o 29:56, muito detalhado. 

É de suma importância que você ajude a espalhar essa informação. 
Precisamos trocar TODAS nossas aplicações que hoje estão em x86, para ARM.

***Passe para seus amigos, para seus colegas da TI, vamos nos ajudar!***

"Eu vejo a migração para Gravitron e ARM um investimento nos negócios a longo prazo."

"Gravitron2 tem 20% menor preço, mais 40% mais performance."

"Quando que nós vimos uma melhora tão grande apenas trocando de processador?"

Ele explica que binários e arquivos devem ser tratados e mantidos de maneiras separadas.

"ARM é a plataforma definitiva com um futuro significante pela frente."

Vale a pena fazer o investimento de migrar!


## Instância EC2 ARM

Fazer o provisionamento de um ubuntu 20, t4g.small
Mostrar o preço de comparativo entre as instâncias ARM e X86 na AWS

Somente a AWS tem esses processadores.


t4g.small	2	N/A	2 GiB	EBS Only	        $0.0168 per Hour
t3.small	2	Variable	2 GiB	EBS Only	$0.0208 per Hour

## Ambiente

```sh

$ ssh -i arm.pem ubuntu@3.231.3.116

$ sudo su
$ curl https://releases.rancher.com/install-docker/19.03.sh | sh
$ usermod -aG docker ubuntu

# Habilitar BUILDKIT 
$ vi /etc/docker/daemon.json
# { "features": { "buildkit": true } }
$ systemctl restart docker


$ cd /home/ubuntu
$ git clone https://github.com/jonathanbaraldi/devops.git
$ cd devops/exercicios/buildkit/app

```


#### Container=REDIS
Iremos fazer o build da imagem do Redis para a nossa aplicação.
```sh
$ cd redis
$ docker build -t <dockerhub-user>/redis-arm:devops --progress=plain .

$ docker images   

$ docker run -d --name redis -p 6379:6379 <dockerhub-user>/redis-arm:devops
$ docker ps
$ docker logs redis
```
Com isso temos o container do Redis rodando na porta 6379.


#### Container=NODE
Iremos fazer o build do container do NodeJs, que contém a nossa aplicação.
```sh
$ cd ../node
$ docker build -t <dockerhub-user>/node-arm:devops --progress=plain .
```
Agora iremos rodar a imagem do node, fazendo a ligação dela com o container do Redis.
```sh
$ docker run -d --name node -p 8080:8080 --link redis <dockerhub-user>/node-arm:devops
$ docker ps 
$ docker logs node
```
Com isso temos nossa aplicação rodando, e conectada no Redis. A api para verificação pode ser acessada em /redis.




## VERIFICAR ARQUITETURA ARM E 

COMO VER SE A IMAGEM DO CONTAINER É ARM e SE ELA É OCI/container - e não mais uma imagem do Docker.

Inspecionar ARM
Inspecionar IMAGEM CONTAINER E VERIFICAR QUE NÃO É DOCKER.

```sh

$ docker inspect <dockerhub-user>/node-arm:devops

# Encontrar o item  "Architecture": 
# Encontrar o item "DockerVersion": 

```


Com isso podemos fazer o push para o registro e usar nos nodes arm do nosso cluster kubernetes.
