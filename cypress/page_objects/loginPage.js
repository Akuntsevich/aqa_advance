class LoginPage {
    visit() {
        const namep = Cypress.env('nameP');
        const passwordP = Cypress.env('passwordP');
        cy.visit(`https://${namep}:${passwordP}@qauto.forstudy.space/`, {
            failOnStatusCode: false,
        });
    }//+

    visitWithoutForStudy(url) {
        cy.visit(url);
    }//

    clickSignInButton() {
        cy.get('button.header_signin').first().click();
    }//+

    fillEmail(email) {
        cy.get('input#signinEmail').type(email);
    }//+

    fillPassword(password) {
        cy.get('input#signinPassword').type(password, { sensitive: true });
    }//+

    clickLoginButton() {
        cy.get('div.modal-footer').within(() => {
            cy.get('button.btn-primary').contains('Login').click();
        });
    }//+

    clickRegistrationButton() {
        cy.get('button.btn.btn-link').contains('Registration').click();
    }//+

    login(email, password) {
        this.clickSignInButton();
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickLoginButton();
    }//+

}

export default LoginPage;
