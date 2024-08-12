import RegistrationPage from '../page_objects/registrationPage';
import LoginPage from '../page_objects/loginPage';
import GaragePage from '../page_objects/garagePage';

describe('Registration flow test suits', () => {
    const login_page = new LoginPage();
    const registration_page = new RegistrationPage();
    const garage_page = new GaragePage();
    const baseEmail = Cypress.env('loginEmail');
    const timestamp = Date.now();
    const uniqueEmail = baseEmail.replace('@', `+${timestamp}@`);
    const loginPassword = Cypress.env('loginPassword');

    beforeEach(() => {
        login_page.visit();
    });

    it('Successful registration with valid data', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().type('Alex');
        registration_page.getLastNameField().type('Kun');
        registration_page.getEmailField().type(uniqueEmail);
        registration_page.getPasswordField().type(loginPassword, { sensitive: true });
        registration_page.getReenterPasswordField().type(loginPassword, { sensitive: true });
        registration_page.getRegisterButton().should('not.be.disabled');
        registration_page.clickRegisterButton();

        cy.url().should('include', '/panel/garage');
        garage_page.clickLogout();

        login_page.login(uniqueEmail, loginPassword);
        cy.url().should('include', '/panel/garage');

    });

    it('Should show error for empty fields', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().click();
        registration_page.getLastNameField().click();
        registration_page.getEmailField().click();
        registration_page.getPasswordField().click();
        registration_page.getReenterPasswordField().click();
        registration_page.getNameField().click();
        registration_page.getNameRequiredError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getLastNameRequiredError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getEmailRequiredError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getPasswordRequiredError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getReenterPasswordRequiredError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getRegisterButton().should('be.disabled');
    });

    it('Should show error for wrong data', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().type('a1');
        registration_page.getLastNameField().type('b2');
        registration_page.getEmailField().type('1');
        registration_page.getPasswordField().type('1');
        registration_page.getReenterPasswordField().type('1');
        registration_page.getNameField().click();
        registration_page.getNameInvalidError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getLastNameInvalidError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getEmailIncorrectError().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getPasswordValidationErrors().should('be.visible').should('exist');
        registration_page.getPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getReenterPasswordValidationErrors().should('be.visible').should('exist');
        registration_page.getReenterPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getRegisterButton().should('be.disabled');
    });

    it('Should show error for wrong length in name and last name fields', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().type('a').click();
        registration_page.getLastNameField().type('b').click();
        registration_page.getNameValidationErrors().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getNameField().clear().type('a'.repeat(21));
        registration_page.getLastNameValidationErrors().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getNameValidationErrors().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getLastNameField().clear().type('b'.repeat(21));
        registration_page.getNameField().click();
        registration_page.getLastNameValidationErrors().should('be.visible').should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Should show error when passwords do not match', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getPasswordField().type(loginPassword, { sensitive: true });
        registration_page.getReenterPasswordField().type('D1fferentP@ss', { sensitive: true });
        registration_page.getNameField().click();
        registration_page.getPasswordMatchError().should('be.visible').should('exist');
        registration_page.getReenterPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registration_page.getRegisterButton().should('be.disabled');
    });

    it('Register button should be disabled with incorrect data', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().type('J');
        registration_page.getLastNameField().type('D');
        registration_page.getEmailField().type('john.doe@');
        registration_page.getPasswordField().type('123', { sensitive: true });
        registration_page.getReenterPasswordField().type('123', { sensitive: true });
        registration_page.getRegisterButton().should('be.disabled');
    });

    it('Trims spaces in name and last name fields', () => {
        login_page.clickSignInButton();
        login_page.clickRegistrationButton();
        registration_page.getNameField().type('   John   '.trim());
        registration_page.getLastNameField().type('   Doe   '.trim());
        registration_page.getNameField().should('have.value', 'John');
        registration_page.getLastNameField().should('have.value', 'Doe');
    });

});
