describe('Find buttons visibility', () => {
    const { username, password } = Cypress.env();

    beforeEach(() => {
        cy.visit(`https://${username}:${password}@qauto.forstudy.space/`, {
            failOnStatusCode: false,
        });
    });

    it('Find all buttons on the header and check that they are ', () => {
        cy.get('header').within(() => {
            cy.contains('a.header-link', 'Home').should('be.visible');
            cy.contains('button.header-link', 'About').should('be.visible');
            cy.contains('button.header-link', 'Contacts').should('be.visible');
            cy.contains('button.header-link', 'Guest log in').should('be.visible');
            cy.contains('button.btn-outline-white', 'Sign In').should('be.visible');
        });
        cy.contains('Sign up').should('be.visible');
    });

    it('should find and verify all links and buttons in the footer', () => {
        cy.get('[href="https://www.facebook.com/Hillel.IT.School"]').should('be.visible');
        cy.get('[href="https://t.me/ithillel_kyiv"]').should('be.visible');
        cy.get('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]').should('be.visible');
        cy.get('[href="https://www.instagram.com/hillel_itschool/"]').should('be.visible');
        cy.get('[href="https://www.linkedin.com/school/ithillel/"]').should('be.visible');
        cy.get('[href="https://ithillel.ua"]').should('be.visible');
        cy.get('[href="mailto:developer@ithillel.ua"]').should('be.visible');   
    });
});
