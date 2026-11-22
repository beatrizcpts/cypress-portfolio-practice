describe("Banco demonstrativo | ParaBank", () => {
  const bankUrl = "https://parabank.parasoft.com/parabank/index.htm";

  it("deve carregar a página inicial e apresentar o formulário de login", () => {
    cy.visit(bankUrl);

    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[value="Log In"]').should("be.visible");
  });
  
// BUG-001: o site aceita login com utilizador inexistente
  it("deve apresentar uma mensagem ao usar credenciais inválidas", () => {
    cy.visit(bankUrl);

    cy.get('input[name="username"]').type("usuario_que_nao_existe");
    cy.get('input[name="password"]').type("senha_incorreta");
    cy.get('input[value="Log In"]').click();

    cy.get("#rightPanel .error")
      .should("be.visible")
      .and("contain", "could not be verified");
  });

  it("deve apresentar uma mensagem ao deixar campo username vazio", () => {
    cy.visit(bankUrl);

    cy.get('input[name="password"]').type("12345");
    cy.get('input[value="Log In"]').click();

    cy.get("#rightPanel .error")
      .should("be.visible")
      .and("contain", "Please enter a username");
  });

  it("deve apresentar uma mensagem ao deixar campo password vazio", () => {
    cy.visit(bankUrl);

    cy.get('input[name="username"]').type("naoexiste123");
    cy.get('input[value="Log In"]').click();

    cy.get("#rightPanel .error")
      .should("be.visible")
      .and("contain", "Please enter a username and password");
  });
    });
