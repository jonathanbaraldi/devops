
### Limpar o host
Algumas vezes é preciso sanitizar o host, e deixar ele apto para receber carga novamente. Para isso, muitas vezes é preciso remover o docker, suas dependências, arquivos do kubernetes, entre outros.

Não itemos limpar o host nesse passo, mas os comandos estão aqui como referência.
```sh
$ docker rm -f $(docker ps -qa)
$ docker rmi -f $(docker images -q)
$ docker volume rm $(docker volume ls)
$ systemctl stop docker
$ for mount in $(mount | grep tmpfs | grep '/var/lib/kubelet' | awk '{ print $3 }') /var/lib/kubelet /var/lib/rancher; do umount $mount; done
$ rm -rf /etc/ceph /etc/cni /etc/kubernetes /opt/cni /opt/rke /run/secrets/kubernetes.io /run/calico /run/flannel /var/lib/calico /var/lib/etcd /var/lib/cni /var/lib/kubelet /var/lib/rancher/rke/log /var/log/containers /var/log/pods /var/run/calico /opt/rancher
$ systemctl start docker
```


### FirewallD
Talvez o firewall esteja ativado nos host's, será preciso desativar.
```sh
$ iptables -L -n -v
$ systemctl stop firewalld
$ systemctl disable firewalld


$ iptables -F
$ vi /etc/selinux/config
```
