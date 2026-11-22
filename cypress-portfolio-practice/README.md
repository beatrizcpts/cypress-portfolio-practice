# Cypress Portfolio Practice — QA

Projeto de prática de **testes automatizados End-to-End (E2E)** com Cypress e JavaScript. Foi organizado para você abrir no VS Code, executar, estudar e adaptar para um portfólio de QA.

> **Importante:** os testes usam sites públicos de demonstração. Não use dados reais, cartões reais, senhas pessoais ou sistemas bancários de produção. Os sites podem mudar ou ficar indisponíveis; se um teste falhar por mudança no site, investigue antes de concluir que existe um bug no Cypress ou na aplicação.

## 1. O que você vai praticar

### E-commerce — SauceDemo
Site: https://www.saucedemo.com/

- Login com credenciais válidas.
- Login com senha inválida e validação da mensagem de erro.
- Adicionar produto ao carrinho.
- Verificar conteúdo do carrinho.
- Validar campo obrigatório no checkout.
- Concluir o fluxo de compra de demonstração.

Credenciais públicas de demonstração usadas neste exercício:
- Utilizador: `standard_user`
- Palavra-passe: `secret_sauce`

### Banco demonstrativo — ParaBank
Site: https://parabank.parasoft.com/parabank/index.htm

- Verificar se a página inicial carrega.
- Verificar se os campos de login aparecem.
- Tentar login com credenciais inválidas e validar a mensagem.

O exemplo bancário é intencionalmente limitado a uma tentativa de autenticação inválida. Não automatize transferências ou operações financeiras em bancos reais.

## 2. Preparar o ambiente no VS Code

### Pré-requisitos
1. Instale o **Node.js (versão LTS)**: https://nodejs.org/
2. Instale o **Visual Studio Code**: https://code.visualstudio.com/
3. Extraia este ZIP para uma pasta do computador.
4. Abra o VS Code e escolha **File > Open Folder**. Selecione a pasta `cypress-portfolio-practice`.

### Instalar o Cypress
No VS Code, abra **Terminal > New Terminal**. Confirme que o terminal está na pasta do projeto e execute:

```bash
npm install
```

O comando instala as dependências indicadas no `package.json`, incluindo o Cypress.

## 3. Executar os testes

### Abrir o Cypress com interface visual
```bash
npm run cy:open
```

1. Escolha **E2E Testing**.
2. Escolha um navegador disponível.
3. Clique em **Start E2E Testing**.
4. Na lista de testes, abra `ecommerce-saucedemo.cy.js` ou `banking-parabank.cy.js`.
5. Observe o navegador a executar cada ação e o painel de comandos.

### Executar no terminal (headless)
```bash
npm run cy:run
```

O Cypress executa os testes sem abrir a janela interativa. Os vídeos são guardados em `cypress/videos` e as capturas de falhas em `cypress/screenshots` quando aplicável.

## 4. Entender a estrutura de um teste

Exemplo:

```javascript
it("deve adicionar um produto ao carrinho", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();

  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get(".shopping_cart_badge").should("have.text", "1");
});
```

- `it()` define um cenário de teste.
- `cy.visit()` abre uma página.
- `cy.get()` procura um elemento usando um seletor CSS.
- `.type()` escreve num campo.
- `.click()` clica num elemento.
- `.should()` verifica o resultado esperado.
- `beforeEach()` executa uma preparação antes de cada teste dentro daquele grupo.

Pense no padrão **Arrange – Act – Assert**:
1. **Arrange (preparar):** abrir a página e preencher os dados necessários.
2. **Act (agir):** clicar no botão ou executar uma ação.
3. **Assert (verificar):** confirmar que a aplicação apresentou o resultado esperado.

## 5. Passo a passo para estudar cada cenário

### Teste 1 — Login válido
**Objetivo:** confirmar que um utilizador válido consegue entrar.

1. Abra o site SauceDemo.
2. O teste escreve `standard_user` no campo de utilizador.
3. Escreve `secret_sauce` no campo de palavra-passe.
4. Clica no botão de login.
5. Confirma que a URL contém `/inventory.html` e que o título é `Products`.

**Conceitos:** fluxo positivo, autenticação, navegação e asserções.

### Teste 2 — Login inválido
**Objetivo:** verificar o tratamento de erro.

1. O teste informa um utilizador válido e uma palavra-passe errada.
2. Clica em login.
3. Confirma que a mensagem de erro fica visível e contém o texto esperado.

**Conceitos:** fluxo negativo, validação de mensagens e comportamento esperado.

### Teste 3 — Adicionar produto ao carrinho
**Objetivo:** verificar se a ação altera o estado do carrinho.

1. Faz login.
2. Clica em **Add to cart** no produto selecionado.
3. Confirma que o contador do carrinho mostra `1`.
4. Abre o carrinho.
5. Confirma que existe um item e que é o produto esperado.

**Conceitos:** interação, estado da aplicação e validação de conteúdo.

### Teste 4 — Campo obrigatório no checkout
**Objetivo:** confirmar que o sistema valida dados obrigatórios.

1. Faz login e adiciona um produto.
2. Abre o carrinho e avança para checkout.
3. Clica em continuar sem preencher os dados.
4. Confirma a mensagem `First Name is required`.

**Conceitos:** validação de formulário, fluxo negativo e mensagem de feedback.

### Teste 5 — Checkout completo
**Objetivo:** validar o percurso principal de compra no ambiente de demonstração.

1. Faz login e adiciona um produto.
2. Avança para checkout.
3. Preenche nome, apelido e código postal fictícios.
4. Confirma que o resumo da compra aparece.
5. Finaliza e verifica a mensagem de confirmação.

**Conceitos:** teste End-to-End, fluxo positivo e confirmação de conclusão.

### Teste 6 — Login inválido no ParaBank
**Objetivo:** verificar a resposta do formulário de autenticação do banco demonstrativo.

1. Abre a página inicial do ParaBank.
2. Confirma que os campos de utilizador e palavra-passe estão visíveis.
3. Preenche credenciais fictícias inválidas.
4. Clica em **Log In**.
5. Confirma que a mensagem de erro aparece.

**Conceitos:** validação de formulário, autenticação negativa e feedback ao utilizador.

## 6. Como investigar uma falha

Um teste vermelho não significa automaticamente que existe um bug na aplicação.

1. Leia a mensagem de erro do Cypress e identifique o comando que falhou.
2. Veja se a página abriu corretamente.
3. Confirme se o seletor ainda existe no site.
4. Verifique se o texto ou comportamento da aplicação mudou.
5. Execute novamente para perceber se a falha é consistente.
6. Só depois conclua se é defeito da aplicação, instabilidade externa ou problema no próprio teste.

**Dica:** prefira seletores estáveis, como `data-test` ou `data-testid`, quando a aplicação os disponibilizar. Seletores baseados em classes de estilo ou na posição de um elemento podem quebrar com alterações visuais.

## 7. Desafios para evoluir o portfólio

Depois de executar os exemplos, tente implementar estes cenários por conta própria:

1. Remover um produto do carrinho e confirmar que o contador atualiza.
2. Adicionar dois produtos e validar a quantidade.
3. Ordenar os produtos por preço crescente e confirmar a ordem.
4. Validar que o botão de checkout não avança com o formulário incompleto.
5. Criar um teste para o utilizador bloqueado `locked_out_user` no SauceDemo.
6. Fazer um teste que confirme que o carrinho está vazio no início de uma sessão.
7. Criar um caso de teste para validar mensagens de erro com diferentes entradas.

Para cada desafio, escreva primeiro:
- **Pré-condições:** o que precisa estar preparado?
- **Passos:** o que o utilizador faz?
- **Resultado esperado:** o que deve acontecer?
- **Resultado obtido:** o que aconteceu ao executar?

## 8. Como transformar isto em portfólio

1. Crie um repositório público no GitHub com um nome como `cypress-qa-automation-portfolio`.
2. Adicione o projeto, o README e os testes.
3. Não publique credenciais pessoais, tokens, cookies ou dados reais.
4. Acrescente uma secção com os cenários cobertos e, se possível, um pequeno relatório de execução.
5. Grave um vídeo curto do Cypress a executar um dos fluxos, sem expor dados privados.
6. No LinkedIn, apresente o objetivo, os cenários, as ferramentas e o que aprendeu. Identifique claramente que são aplicações demonstrativas e um projeto de estudo.

### Exemplo de texto para LinkedIn

**Praticando automação de testes com Cypress e JavaScript!**

Estou a desenvolver um pequeno projeto de portfólio para aprofundar os meus conhecimentos em testes End-to-End (E2E), utilizando Cypress e Visual Studio Code.

Neste exercício, automatizei cenários em aplicações de demonstração de e-commerce e banca, incluindo:
- Login com credenciais válidas e inválidas;
- Validação de mensagens de erro;
- Adição de produtos ao carrinho;
- Validação de campos obrigatórios;
- Fluxo de checkout.

O objetivo foi praticar a estrutura dos testes, seletores, interações e asserções, além de observar a execução automatizada no browser.

Continuo a aprender e a desenvolver as minhas competências em QA e automação de testes.

#QA #QualityAssurance #Cypress #TestAutomation #JavaScript #SoftwareTesting

## 9. Ideias para uma sequência de publicações

- **Post 1 — Primeiro contacto com Cypress:** mostrar o Cypress aberto no VS Code e explicar o que é um teste E2E.
- **Post 2 — Testes de login:** mostrar um cenário positivo e um negativo, explicando a diferença entre eles.
- **Post 3 — Testes de e-commerce:** mostrar o produto a ser adicionado ao carrinho e a validação do contador.
- **Post 4 — Validação de formulários:** explicar por que testar campos obrigatórios é importante para a experiência do utilizador.
- **Post 5 — O que aprendi:** falar sobre seletores, `cy.get()`, `cy.contains()`, `.click()`, `.type()` e `.should()`.

**Boa prática de portfólio:** não publique apenas uma captura com “teste passou”. Explique o risco que o cenário cobre, o resultado esperado e o que aprendeu ao automatizá-lo.

## 10. Referências oficiais

- Instalação e abertura do Cypress: https://docs.cypress.io/app/get-started/install-cypress
- Primeiro teste E2E: https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
- Organização de testes: https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests
- Integração com VS Code: https://docs.cypress.io/app/tooling/IDE-integration
- SauceDemo: https://www.saucedemo.com/
- ParaBank: https://parabank.parasoft.com/parabank/index.htm


## Bugs encontrados

### BUG-001: Login aceita utilizador inexistente

- **Ambiente:** Parabank (site de demonstração), Chrome, Cypress 15.21.2
- **Passos para reproduzir:**
  1. Abrir https://parabank.parasoft.com/parabank/index.htm
  2. Escrever um utilizador que não existe e uma password qualquer
  3. Clicar em Log In
- **Resultado esperado:** mensagem de erro de credenciais inválidas
- **Resultado obtido:** o site redireciona para a página "Accounts Overview"
- **Confirmação:** reproduzido manualmente no browser
- **Evidência:** `evidencias/bug-001.png`
- **Teste automatizado:** `cypress/e2e/banking-parabank.cy.js` (teste "deve apresentar uma mensagem ao usar credenciais inválidas")