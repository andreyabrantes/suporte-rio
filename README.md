# Suporte Informática — Landing Page

Landing page institucional da **Suporte Informática** (suporte técnico de TI para empresas), construída em HTML, CSS e JavaScript puros — sem frameworks e sem etapa de build.

## 🌐 Site em produção

- **Domínio:** [www.suporterio.com.br](https://www.suporterio.com.br)
- **Hospedagem:** HostGator (cPanel)

## 📁 Estrutura do projeto

```
suporte-rio/
├── index.html              # Página principal (estrutura e conteúdo)
├── styles.css              # Estilos (design system com CSS custom properties)
├── main.js                 # Interações (menu, scroll, validação do formulário)
├── config.js               # ⚠️ Chave do Web3Forms (NÃO versionado — ver .gitignore)
├── config.example.js       # Modelo de configuração (versionado)
├── .htaccess               # Configuração Apache (HTTPS, cache, GZIP, segurança)
├── .gitignore              # Arquivos ignorados pelo Git
├── logo.jpg                # Logotipo (cabeçalho e rodapé)
├── fto.jpg                 # Foto do hero
└── suporteinformatica.jpg  # Foto da seção "Sobre nós"
```

## 🚀 Como rodar localmente

Como o projeto é estático, basta abrir o `index.html` no navegador. Para evitar problemas de CORS com o formulário, recomenda-se servir via HTTP:

```bash
# Python 3
python -m http.server 8000

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8000`.

## ⚙️ Configuração do formulário (Web3Forms)

O formulário de contato usa a API do [Web3Forms](https://web3forms.com) (envio de e-mail sem backend).

### Primeira configuração

1. Copie o arquivo de exemplo:
   ```bash
   cp config.example.js config.js
   ```
2. Edite o `config.js` e insira sua chave real:
   ```js
   window.APP_CONFIG = {
     web3formsKey: "sua-chave-aqui",
   };
   ```
3. O `config.js` já está no `.gitignore` e **não será commitado**.

### 🔒 Segurança da chave

A chave do Web3Forms é uma *access key* pública — ela é enviada pelo navegador do visitante e, portanto, visível no DevTools. Para proteção real:

- **Ative a "Domain Restriction"** no painel do Web3Forms, limitando a chave ao domínio `suporterio.com.br`. Assim, mesmo que alguém copie a chave, ela só funcionará no seu domínio.

## 📦 Deploy na HostGator

Envie para a **raiz do site** (`public_html`) os seguintes arquivos:

| Arquivo | Obrigatório | Observação |
|---|---|---|
| `index.html` | ✅ | Página principal |
| `styles.css` | ✅ | Estilos |
| `main.js` | ✅ | Interações |
| `config.js` | ✅ | Contém a chave do Web3Forms |
| `.htaccess` | ✅ | HTTPS, cache e segurança (ative "Show Hidden Files" no cPanel) |
| `logo.jpg` | ✅ | Logotipo |
| `fto.jpg` | ✅ | Foto do hero |
| `suporteinformatica.jpg` | ✅ | Foto da seção "Sobre" |

> **Importante:** o `config.js` **não** está no Git, então ele precisa ser enviado manualmente para o servidor.

### Cache do navegador

O `.htaccess` define:
- `.html` → **nunca cacheado** (sempre busca a versão mais recente)
- `.css` / `.js` → cache de 1 dia (use `?v=N` para forçar atualização)
- Imagens / fontes → cache de 30 dias

Ao alterar `styles.css`, `main.js` ou imagens, incremente o parâmetro de versão no `index.html` (ex.: `?v=2` → `?v=3`).

## 🎨 Design System

As cores e tokens estão definidos como CSS custom properties no topo do `styles.css`:

| Token | Valor | Uso |
|---|---|---|
| `--navy-900` | `#0B132B` | Fundo escuro principal |
| `--navy-800` | — | Fundo de seções |
| `--red-500` | `#E60000` | Cor de destaque (CTA, ícones) |
| `--red-600` | — | Hover do destaque |

## ✨ Funcionalidades

- Menu mobile responsivo com toggle
- Header dinâmico (muda ao rolar)
- Scroll suave entre seções
- Link ativo conforme a seção visível
- Animação "reveal on scroll"
- Botão "voltar ao topo"
- Animação de batimento cardíaco (ECG) no hero
- Carrossel infinito de logos de clientes
- Formulário com validação (nome, e-mail, telefone com DDD + 9, assunto, mensagem)
- Máscara de telefone `(21) 97737-7664`
- Botão flutuante do WhatsApp
- Acessibilidade: `prefers-reduced-motion`, `aria-*`, foco visível

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, custom properties, animações)
- JavaScript vanilla (IIFE, `"use strict"`)
- [Web3Forms](https://web3forms.com) para envio do formulário

## 📄 Licença

Projeto privado — todos os direitos reservados à Suporte Informática.
