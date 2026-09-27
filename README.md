🎓 Sistema de Gestão de Treinamentos e Capacitações (SGTC)

📖 Sobre o Projeto

O Sistema de Gestão de Treinamentos e Capacitações (SGTC) é uma solução corporativa voltada para o registro, acompanhamento e avaliação do desenvolvimento profissional dos colaboradores de uma organização. O foco deste repositório é a aplicação Front-end, construída para oferecer uma interface de usuário (UI) moderna, responsiva e focada na experiência do usuário (UX), adotando um perfil visual corporativo e um modo escuro (Dark Theme) sofisticado.

O sistema permite o controle de objetivos de aprendizado, desempenho, envio de evidências de certificações e análise de indicadores através de dashboards intuitivos.

🎯 Perfis de Acesso (Atores)

A interface se adapta dinamicamente com base no perfil do usuário logado:

🧑‍💻 Funcionário(a): Participa de treinamentos, inscreve-se em cursos, acompanha metas e faz upload de suas certificações.

👔 Gestor(a) Direto(a): Aprova/reprova inscrições de sua equipe e acompanha os indicadores e lacunas de desenvolvimento.

🏢 RH / Universidade Corporativa: Gerencia trilhas de aprendizado, valida certificações e extrai relatórios globais de horas treinadas e desempenho.

👨‍🏫 Instrutor(a) / Fornecedor: Ministra os treinamentos, registra frequência e insere as notas/desempenho.

⚙️ Administrador(a) do Sistema: Gerencia o catálogo de cursos, controla os acessos e realiza parametrizações.

✨ Principais Funcionalidades

De acordo com as regras de negócio e diagrama de entidade-relacionamento (DER), o front-end consome as seguintes funcionalidades principais:

Autenticação e Painel: Login seguro e direcionamento para dashboards personalizados (Métricas, Gráficos e Status).

Gestão de Pessoas: Interface de cadastro de funcionários, vinculando área, cargo e gestores diretos (cadastro.tbPessoas).

Catálogo e Inscrições: Busca e filtragem avançada de treinamentos e envio de solicitações de inscrição.

Aprovação: Painel de aprovação/reprovação de turmas e orçamentos para gestores e RH.

Acompanhamento de Capacitações: Registro de frequência, definição de objetivos alcançados e avaliação de desempenho (tbCapacitacao).

Portfólio e Certificados: Upload de certificados (anexos), validação pelo RH e controle de vencimentos/reciclagens.

💻 Tecnologias Utilizadas

O projeto foi construído primando por alta performance, acessibilidade e controle absoluto do DOM, sem a dependência inicial de frameworks pesados:

HTML5: Estrutura semântica rigorosa, utilização de tabelas complexas para relatórios.

CSS3: Estilização com base em Dark Theme corporativo, Flexbox/Grid Layout e variáveis CSS para paleta de cores.

Vanilla JavaScript (ES6+): Manipulação do DOM, controle de estado da interface, validação de formulários e consumo de APIs simuladas do back-end.

Figma: Utilizado para a prototipação prévia das interfaces de Dashboard e Login.

🚀 Como Executar o Projeto

Como o projeto é construído em tecnologias fundamentais da web, a execução é simples e direta.

Pré-requisitos

Um navegador web moderno (Google Chrome, Firefox, Edge, Safari).

Recomendado: Extensão Live Server no VS Code para auto-reload durante o desenvolvimento.