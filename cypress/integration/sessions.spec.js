/// <reference types="cypress" />

describe("Sessions page", () => {
  //
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
    cy.get("[data-cy=Wednesday]").as("WednesdayBtn");
    cy.get("[data-cy=Thursday]").as("ThursdayBtn");
    cy.get("[data-cy=Friday]").as("FridayBtn");
  });

  it("should navigate to sessions page and view day filter buttons", () => {
    cy.get("@AllSessionsBtn");
    cy.get("@WednesdayBtn");
    cy.get("@ThursdayBtn");
    cy.get("@FridayBtn");
  });

  it("should filter sessions and only display wednesday sessions when wednesday button is clicked", () => {
    cy.get("@WednesdayBtn").click();

    cy.get("[data-cy=day]").should("have.length.above", 20);
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
    cy.get("@AllSessionsBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });
});
