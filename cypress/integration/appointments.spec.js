/* eslint-disable no-undef */
describe("Appointment", () => {
  beforeEach(()=> {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => { 
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Veronika");
    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Veronika");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => { 
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Veronika");
    
    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Veronika");
    cy.contains(".appointment__card--show", "Tori Malcolm")
  });

  it("should cancel an interview", () => { 
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    cy.contains("Confirm")
      .click();

    cy.contains("Deleting");
    cy.contains("Deleting")
      .not("Deleting");
    cy.get(".appointment__card")
      .not(".appointment__card--show", "Archie Cohen") 
  });
});