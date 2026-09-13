# Landing Page — Suporte de TI

Landing page institucional para empresa de suporte técnico de TI, construída em HTML, CSS e JavaScript puros — sem frameworks e sem etapa de build.

## 📁 Estrutura do projeto

```
.
├── index.html              # Página principal (estrutura e conteúdo)
├── styles.css              # Estilos (design system com CSS custom properties)
├── main.js                 # Interações (menu, scroll, validação do formulário)
├── config.js               # Configuração local (NÃO versionado — ver .gitignore)
├── config.example.js       # Modelo de configuração (versionado)
├── .gitignore              # Arquivos ignorados pelo Git
├── logo.jpg                # Logotipo
├── fto.jpg                 # Foto do hero
└── suporteinformatica.jpg  # Foto da seção "Sobre nós"
```

## 🚀 Como rodar localmente

O projeto é estático. Basta abrir o `index.html` no navegador ou servi-lo via HTTP:

```bash
# Python 3
python -m http.server 8000

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8000`.

## ⚙️ Configuração

O formulário de contato utiliza a API do [Web3Forms](https://web3forms.com) para envio de e-mail sem backend.

### Primeira configuração

1. Copie o arquivo de exemplo:
   ```bash
   cp config.example.js config.js
   ```
2. Edite o `config.js` e insira sua chave:
   ```js
   window.APP_CONFIG = {
     web3formsKey: "sua-chave-aqui",
   };
   ```
3. O `config.js` está no `.gitignore` e **não será commitado**.

### 🔒 Nota sobre segurança

A chave do Web3Forms é uma *access key* pública — ela é enviada pelo navegador do visitante e, portanto, visível no DevTools. Para proteção efetiva, ative a **Domain Restriction** no painel do Web3Forms, limitando a chave ao domínio onde o site está publicado.

## 🎨 Design System

As cores e tokens estão definidos como CSS custom properties no topo do `styles.css`:

| Token | Uso |
|---|---|
| `--navy-900` | Fundo escuro principal |
| `--navy-800` | Fundo de seções |
| `--red-500` | Cor de destaque (CTA, ícones) |
| `--red-600` | Hover do destaque |

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
- Máscara de telefone `(00) 00000-0000`
- Botão flutuante do WhatsApp
- Acessibilidade: `prefers-reduced-motion`, `aria-*`, foco visível

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, custom properties, animações)
- JavaScript vanilla (IIFE, `"use strict"`)
- [Web3Forms](https://web3forms.com) para envio do formulário

## 📄 Licença

Todos os direitos reservados.
