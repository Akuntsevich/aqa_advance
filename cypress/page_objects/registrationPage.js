class RegistrationPage {
    getNameField() {
        return cy.get('input#signupName');
    }

    getLastNameField() {
        return cy.get('input#signupLastName');
    }

    getEmailField() {
        return cy.get('input#signupEmail');
    }

    getPasswordField() {
        return cy.get('input#signupPassword');
    }

    getReenterPasswordField() {
        return cy.get('input#signupRepeatPassword');
    }

    getRegisterButton() {
        return cy.contains('Register');
    }

    clickRegisterButton() {
        this.getRegisterButton().click();
    }

    getNameRequiredError() {
        return cy.contains('Name required');
    }

    getNameInvalidError() {
        return cy.contains('Name is invalid');
    }

    getNameValidationErrors() {
        return cy.contains('Name has to be from 2 to 20 characters long');
    }

    getLastNameRequiredError() {
        return cy.contains('Last name required');
    }

    getLastNameInvalidError() {
        return cy.contains('Last name is invalid');
    }

    getLastNameValidationErrors() {
        return cy.contains('Last name has to be from 2 to 20 characters long');
    }
    
    getEmailRequiredError() {
        return cy.contains('Email required');
    }
    
    getEmailIncorrectError() {
        return cy.contains('Email is incorrect');
    }

    getPasswordRequiredError() {
        return cy.contains('Password required');
    }

    getPasswordValidationErrors() {
        return cy.get('input#signupPassword')
                    .parents('.form-group')
                    .within(() => {
                        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                    });
    }

    getReenterPasswordRequiredError() {
        return cy.contains('Re-enter password required');
    }

    getReenterPasswordValidationErrors() {
        return cy.get('input#signupRepeatPassword')
                    .parents('.form-group')
                    .within(() => {
                        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                    });
    }

    getPasswordMatchError() {
        return cy.contains('Passwords do not match');
    }
}

export default RegistrationPage;
