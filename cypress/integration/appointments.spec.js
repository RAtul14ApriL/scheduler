/* eslint-disable no-undef */
describe("Appointments", () => {

  beforeEach(() => {

    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {

    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get(".interviewers__item").first().click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Interviewer");

  });

  it("should edit an interview", () => {

    cy.get(".appointment__card--show").first();

    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]").type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Neelormi Srotoshwini");

    cy.get(".interviewers__item").last().click();

    cy.contains("Save").click();

    cy.contains("Saving").should("exist");

    cy.contains("Saving").should("not.exist");

    cy.contains(".appointment__card--show", "Neelormi Srotoshwini");

    cy.contains(".appointment__card--show", "Interviewer");
  });

  it("should cancel an interview", () => {

    cy.get(".appointment__card--show").first();

    cy.get("[alt=Delete]").first().click({ force: true });

    cy.get(".appointment__card--confirm");

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");

    cy.contains("Deleting").should("not.exist");

    cy.get(".appointment__add");

  });

});