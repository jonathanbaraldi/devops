kubernetes-orquestrator.md




https://rancher.com/beyond-kubernetes


kops, eksctl
kubeadmin


What is Kops? 
Kops is designed for those who want complete control over their Kubernetes environment but without the usual headaches.


Kops stands for Kubernetes operations. The tagline for the project is that it’s “the easiest way to get a production-grade Kubernetes cluster up and running”. Kops is sometimes referred to as the ‘kubectl’ for spinning up clusters.

Kops lets you create, destroy and upgrade Kubernetes clusters and is supported on AWS (Amazon Web Services, we cover more of this on our Kubernetes on AWS - what you need to know page) with GKE in beta support, and VMware vSphere in alpha.

Features include:

Highly Available (HA) Kubernetes Masters
A state-sync model for dry-runs and automatic idempotency
Can generate Terraform
Support for custom Kubernetes add-ons
Command line auto-completion
YAML Manifest Based API Configuration
Templating and dry-run modes for creating Manifests
Out-of-the-box support from eight different CNI Networking providers, including Weave Net
Support for kube-up upgrades
Ability to add containers, as hooks, and files to nodes via a cluster manifest



What is Kubeadm?

Lucas Kaldstrom one of the Kubernetes maintainers for kubeadm talked about some of the internals of Kubeadm and also future plans for its ongoing improvements.

Kubeadm is a toolkit for bootstrapping a best-practises Kubernetes cluster on existing infrastructure. Kubeadm cannot provision your infrastructure which is one of the main differences to kops. Another differentiator is that Kubeadm can be used not only as an installer but also as a building block.

Kubeadm sets up a minimal viable cluster. It is designed to have all the components you need in one place in one cluster regardless of where you are running them.

An advantage of kubeadm is that it can be used anywhere —even Raspberry Pi— to set up a cluster and try it out before committing to something like kops.



Kubeadm vs kops

We briefly touched on the differences between the tools earlier. But more specifically these are the differences between the two tools:

Kubeadm is in the middle of the stack and it runs on each node, and basically creates and then talks to the Kubernetes API.
Kops on the other hand is responsible for the entire lifecycle of the cluster, from infrastructure provisioning to upgrading to deleting, and it knows about everything: nodes, masters, load balancers, cloud providers, monitoring, networking, logging etc.
The projects are not direct competitors, but instead complement each other.





https://www.weave.works/blog/kops-vs-kubeadm






https://medium.com/faun/kops-eks-79a267f58d81



https://caylent.com/kops-vs-eks-a-comparison-guide