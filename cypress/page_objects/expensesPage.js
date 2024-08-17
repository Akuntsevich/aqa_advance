class ExpensesPage {
    clickAddAnExpense() {
        cy.get('button').contains('Add an expense').click();
    }

    typeEditMileage(mileage) {
        cy.get('#editCarMileage').type(mileage);
    }

    typeNumberOfLiters(number) {
        cy.get('#addExpenseCar').type(number);
    }

    typeTotalCost(cost) {
        cy.get('#addExpenseTotalCost').type(cost);
    }

    clickAddAnExpenseOnWindow() {
        cy.contains('button[type="button"]', 'Add').click();
    }

}

export default ExpensesPage;