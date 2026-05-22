# 🦷 Sistema de Controle CAD/CAM Odontológico

[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-apps-script&logoColor=white)](https://developers.google.com/apps-script)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Sistema interno e responsivo para controle de produção laboratorial e odontológica integrado via arquitetura Client-Server à API do Google Sheets. A aplicação provê um painel moderno para lançamento de novos procedimentos, auditoria de produção e motor de busca global multi-abas.

## 🚀 Funcionalidades Chave

* **Dashboard em Tempo Real:** Consolidação de métricas volumétricas com contagem automática de elementos/unidades produzidas.
* **Formulário Inteligente de Lançamento:** Cadastro rápido parametrizado com persistência estruturada nas colunas da planilha (Paciente, Material, Qtd, Cadista, Doutor, Dente, Cor).
* **Buscador Global Indexado:** Varredura algorítmica textual que pesquisa por termos em **todas** as abas da planilha simultaneamente.
* **Módulo de Impressão nativo:** Geração dinâmica de relatórios em folha limpa formatados para PDFs físicos ou virtuais.

## 📁 Estrutura de Arquivos

```text
├── src/
│   ├── codigo.js              # Motor de Backend (Google Apps Script)
│   └── ControleCAD.html       # Interface visual do usuário (HTML5/Tailwind)
├── .gitignore                 # Filtros de arquivos ignorados no repositório
└── README.md                  # Documentação do projeto
