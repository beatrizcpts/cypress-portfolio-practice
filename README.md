# Cypress Portfolio Practice | QA

Projeto de estudo de **automação de testes E2E com Cypress (JavaScript)**, criado para praticar e documentar o meu percurso em QA.

Os testes correm em dois sites de demonstração, feitos para treino:

- **SauceDemo** (loja online): https://www.saucedemo.com
- **ParaBank** (banco online): https://parabank.parasoft.com

> Todos os testes usam apenas sites de demonstração e dados fictícios.

## Ferramentas

- [Cypress](https://www.cypress.io/) 15
- JavaScript
- Node.js e npm
- Visual Studio Code

## Como correr o projeto

**Pré-requisito:** ter o [Node.js](https://nodejs.org) instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Abrir o Cypress (modo interativo)
npm run cy:open

# 3. Ou correr todos os testes no terminal
npm run cy:run
```

No modo interativo, escolhe **E2E Testing**, depois o browser, e clica no ficheiro de teste que queres executar.

## Estrutura

```
cypress/
  e2e/
    ecommerce-saucedemo.cy.js   # testes da loja (SauceDemo)
    banking-parabank.cy.js      # testes do banco (ParaBank)
  support/
    e2e.js                      # ficheiro de suporte do Cypress
evidencias/
  bug-001.png                   # captura do BUG-001
cypress.config.js
package.json
```

## Casos de teste

### SauceDemo (e-commerce)

| # | Cenário | Resultado |
|---|---|---|
| 1 | Login com credenciais válidas | ✅ Passa |
| 2 | Mensagem de erro com password inválida | ✅ Passa |
| 3 | Adicionar um produto ao carrinho | ✅ Passa |
| 4 | Impedir checkout sem preencher os dados obrigatórios | ✅ Passa |
| 5 | Concluir o checkout com dados válidos | ✅ Passa |

### ParaBank (banca)

| # | Cenário | Resultado |
|---|---|---|
| 1 | Carregar a página inicial e mostrar o formulário de login | ✅ Passa |
| 2 | Mensagem de erro com credenciais inválidas | ❌ Falha (ver BUG-001) |
| 3 | Mensagem de erro com o campo username vazio | ✅ Passa |
| 4 | Mensagem de erro com o campo password vazio | ✅ Passa |

## Bugs encontrados

### BUG-001: Login aceita utilizador inexistente

- **Ambiente:** ParaBank (site de demonstração), Chrome, Cypress 15
- **Passos para reproduzir:**
  1. Abrir https://parabank.parasoft.com/parabank/index.htm
  2. Escrever um utilizador que não existe e uma password qualquer
  3. Clicar em Log In
- **Resultado esperado:** mensagem de erro de credenciais inválidas
- **Resultado obtido:** o site redireciona para a página "Accounts Overview"
- **Confirmação:** reproduzido manualmente no browser
- **Evidência:** `evidencias/bug-001.png`
- **Teste automatizado:** `cypress/e2e/banking-parabank.cy.js` (teste "deve apresentar uma mensagem ao usar credenciais inválidas")

O teste foi mantido a falhar de propósito, porque documenta o comportamento inesperado observado no site.

## O que aprendi

- Escrever casos de teste com `describe`, `it` e `beforeEach`
- Localizar elementos com seletores (`data-test`, `name`, classes)
- Validar resultados com `.should()` e `.and()`
- Investigar uma falha: confirmar manualmente se o problema é do teste, do ambiente ou do sistema
- Documentar um bug com passos, resultado esperado, resultado obtido e evidência

## Próximos passos

- Escrever os cenários em Gherkin (Cucumber)
- Mais testes de API
- Executar os testes automaticamente com GitHub Actions