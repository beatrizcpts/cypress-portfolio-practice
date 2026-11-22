describe("E-commerce | SauceDemo", () => {
  const username = "standard_user";
  const password = "secret_sauce";

  beforeEach(() => {
    cy.visit("/");
  });

  it("deve permitir login com credenciais válidas", () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

  it("deve apresentar mensagem ao tentar login com senha inválida", () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type("senha-errada");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("deve adicionar um produto ao carrinho", () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("have.length", 1);
    cy.contains(".inventory_item_name", "Sauce Labs Backpack").should("be.visible");
  });

  it("deve impedir avanço no checkout sem preencher os dados obrigatórios", () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "First Name is required");
  });

  it("deve concluir o fluxo de checkout com dados válidos", () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("QA");
    cy.get('[data-test="lastName"]').type("Tester");
    cy.get('[data-test="postalCode"]').type("1000-001");
    cy.get('[data-test="continue"]').click();

    cy.get(".summary_info").should("be.visible");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("contain", "Thank you for your order");
  });
});
