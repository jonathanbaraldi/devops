# CANARY DEPLOYMENT no KUBERNETES

```sh
$ kubectl apply -f nginx-deployment.yaml

$ kubectl get pods -o wide

$ kubect apply -f nginx-deployment.service.yaml

$ kubectl get service

$ kubectl apply -f nginx-canary-deployment.yaml

# Ir no SERVICE e comentar o 1.0

# version: "1.0"

$ kubectl apply -f nginx-deployment.service.yaml

```

# MONITORAR O CANARY DEPLOYMENT

Com os 2 deployments rodando, iremos monitorar o comportamento do novo deployment. 


Com ambas as implantações instaladas e em execução, monitore o comportamento da nova implantação. Dependendo dos resultados, você pode reverter a implantação ou atualizar para a versão mais recente.

## Roll Back Canary Deployment

Se você notar que o canário não está funcionando conforme o esperado, você pode reverter a implantação e excluir os pods atualizados com:

```sh
$ kubectl delete deployment.apps / nginx-canary-deployment
```

O serviço continua fazendo o balanceamento de carga do tráfego para os pods iniciais (versão 1).

## Lançamento da implantação atualizada

Se você concluir que a implantação do canário está funcionando conforme o esperado, você pode rotear todo o tráfego de entrada para a versão atualizada. Existem três maneiras de fazer isso:

1. Atualize a primeira versão modificando a imagem Docker e construindo uma nova implantação. Em seguida, remova os canários com:
```sh
$ kubectl delete deployment.apps / nginx-canary-deployment
```

2. Você pode manter os pods atualizados e remover aqueles com o rótulo da versão 1:

```sh
$ kubectl delete deployment.apps / nginx
```

3. Como alternativa, você pode até mesmo modificar o arquivo service.yaml e adicionar o especificador de versão ao rótulo do seletor. Isso instrui o balanceador de carga a rotear o tráfego apenas para pods da versão 2.




