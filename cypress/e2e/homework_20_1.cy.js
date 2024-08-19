import moment from 'moment';
import LoginPage from '../page_objects/loginPage';
import GaragePage from '../page_objects/garagePage';
import ExpensesPage from '../page_objects/expensesPage';

describe('Add car to garage and fuel to car', () => {
    const login_page = new LoginPage();
    const garage_page = new GaragePage();
    const expenses_page = new ExpensesPage();
    const carBrand = 'Audi';
    const carModel = 'TT';
    const carMileage = '10000';
    const formattedDate = moment().format('DD.MM.YYYY');
    const numberOfLiters = '50';
    const editCarMileage = '10500';
    const totalCost = '2000';

    beforeEach(() => {
        login_page.visit();
    });

    it('Add car to garage)', () => {
        login_page.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
        cy.url().should('include', '/panel/garage');
        garage_page.clickAddCar();
        garage_page.chooseCarBrand(carBrand);
        garage_page.chooseCarMpdel(carModel);
        garage_page.typeMileage(carMileage);
        garage_page.clickAddCarButton();
        cy.contains(`${carBrand} ${carModel}`).should('exist').should('be.visible');
        cy.contains(`Update mileage • ${formattedDate}`).should('exist').should('be.visible');
        garage_page.clickEditCar();
        garage_page.clickRemoveCar();
        garage_page.clickConfirmationRemoveCar();
        cy.contains(`${carBrand} ${carModel}`).should('not.exist');
    });

    it('Add fuel to car', () => {
        login_page.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
        cy.url().should('include', '/panel/garage');
        garage_page.clickAddCar();
        garage_page.fillCarForm(carBrand, carModel, carMileage);
        garage_page.clickFuelExpenses();
        cy.url().should('include', '/panel/expenses');
        expenses_page.clickAddAnExpense();
        expenses_page.typeEditMileage(editCarMileage);
        expenses_page.typeNumberOfLiters(numberOfLiters);
        expenses_page.typeTotalCost(totalCost);
        expenses_page.clickAddAnExpenseOnWindow();

        cy.get('tr').within(() => {
            cy.get('td').eq(0).should('contain', formattedDate);
            cy.get('td').eq(1).should('contain', editCarMileage);
            cy.get('td').eq(2).should('contain', numberOfLiters+'L');
            cy.get('td').eq(3).should('contain', totalCost+' USD');
        });
            
    });
});