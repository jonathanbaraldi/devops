

# Engenharia do Chaos - Parte 1 - Introdução

O que é?

Quais ferramentas temos a disposição?
https://en.wikipedia.org/wiki/Chaos_engineering

Instalando o Chaos Mesh no kubernetes
https://chaos-mesh.org



```sh
$ curl -sSL https://mirrors.chaos-mesh.org/v1.2.1/install.sh | bash
$ kubectl get pod -n chaos-testing

$ kubectl delete ns chaos-testing
```


```sh
$ kubectl apply -f nginx.yml
```




# Engenharia do Chaos - Parte 2 - Experimento 1 - POD KILL

Aplicar
```sh
$ kubectl apply -f podkill-chaos.yml
```
Acompanhar no dashboard




# Engenharia do Chaos - Parte 3 - Experimento 2 - CPU Stress

Fazer o deployment do nginx e testar o pod kill

Aplicar
```sh
$ kubectl apply -f stress-chaos.yml
```
Acompanhar no dashboard






# Engenharia do Chaos - Parte 4 - Experimento 2 - CPU Stress

Fazer o deployment do nginx e testar o pod kill

Aplicar
```sh
$ kubectl apply -f stress-chaos-2.yml


$ kubectl apply -f stress-chaos-3.yml
$ kubectl apply -f stress-chaos-4.yml

```
Acompanhar no dashboard







# IO TESTE


dd if=/dev/zero of=/root/testfile bs=1G count=1 oflag=direct













