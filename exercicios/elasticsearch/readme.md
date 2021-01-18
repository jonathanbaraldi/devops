
# 1 - Fazer o deployment do ElastiSearch

Provisionar ElasticSearch

Etapa 1 - Escolha o tipo de implantação
	Escolha o tipo de implantação
		Desenvolvimento e testes

Etapa 2 - Configurar domínio
	
	Configurar domínio
		Nome do domínio do Elasticsearch

	Nós de dados
		Tipo de instância
			c5.xlarge.elasticsearch

Etapa 3 - Configurar acesso ao domínio
	Acesso público

	Configuração de rede
		Acesso público

	Controle de acesso refinado, desenvolvido pelo Open Distro for Elasticsearch
		Habilitar controle de acesso refinado
		Criar usuário mestre

	Política de acesso
		Permitir acesso aberto ao domínio


# Deployment do Rancher e do Cluster

Se você ainda não fez o deployment do seu Rancher e do seu Cluster, esse é o momento

# Configurar o ElasticSearch

Entrar no ElasticSeach e começar a configurar

1) Pegar o Endpoint
	
Endpoint https://search-devopsninja-ncyrb5g2zimu62eywarql3d6ye.us-east-1.es.amazonaws.com

Kibana	https://search-devopsninja-ncyrb5g2zimu62eywarql3d6ye.us-east-1.es.amazonaws.com/_plugin/kibana/

2) Criar um INDEX PATTERN para pegar a configuração vinda do cluster.

Simples pesquisa

kubernetes.namespace_name=default





