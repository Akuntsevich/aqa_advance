class GaragePage {
    clickLogout() {
        cy.get('span.icon-logout').click();
    }

    clickAddCar() {
        cy.get('button').contains('Add car').click();
    }

    chooseCarBrand(brand) {
        cy.get('#addCarBrand').select(brand);
    }

    chooseCarMpdel(model) {
        cy.get('#addCarModel').select(model);
    }

    typeMileage(mileage) {
        cy.get('#addCarMileage').type(mileage);
    }

    clickAddCarButton() {
        cy.contains('button[type="button"]', 'Add').click();
    }

    fillCarForm(brand, model, mileage) {
        this.chooseCarBrand(brand);
        this.chooseCarMpdel(model);
        this.typeMileage(mileage);
        this.clickAddCarButton();
    }

    clickEditCar() {
        cy.get('.icon icon-edit').click();
    }

    clickRemoveCar() {
        cy.contains('button[type="button"]', 'Remove car').click();
    }

    clickConfirmationRemoveCar() {
        cy.contains('button[type="button"]', 'Remove').click();
    }

    clickFuelExpenses() {
        cy.get('href="/panel/expenses"').click();
    }

}

export default GaragePage;
