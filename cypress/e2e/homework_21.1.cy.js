describe('API testing suite', () => {
    const baseUrl = 'https://qauto.forstudy.space/api';
    const signinEndpoint = '/auth/signin';
    const carsEndpoint = '/cars';
    const expensesEndpoint = '/expenses';
    const username = 'guest';
    const password = 'welcome2qauto';

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${signinEndpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            },
            body: {
              email: 'john2.doe@example.com',
              password: 'Password123!',
              remember: false
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
            cy.getCookie('sid').then((cookie) => {
              if (cookie) {
                cy.log('SID Value:', cookie.value);
                cy.setCookie('sid', cookie.value);
              } else {
                cy.log('SID cookie not found');
                throw new Error('SID cookie not found');
              }
            });
        });
    });

    it('Should successfully create a new car (POST: 200)', () => {
        cy.getCookie('sid').then((cookie) => {
          if (cookie) {
            cy.request({
              method: 'POST',
              url: `${baseUrl}${carsEndpoint}`,
              headers: {
                'Content-Type': 'application/json',
              },
              cookies: {
                'sid': cookie.value
              },
              body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 122
              }
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body.status).to.eq('ok');
              expect(response.body.data).to.have.property('id');
              expect(response.body.data).to.have.property('carBrandId', 1);
              expect(response.body.data).to.have.property('carModelId', 1);
              expect(response.body.data).to.have.property('mileage', 122);
            });
        } else {
            cy.log('SID cookie not found in test');
            throw new Error('SID cookie not found in test');
            }
        });
    });

    it('Should return 400 for a bad request (POST: 400)' , () => {
        cy.getCookie('sid').then((cookie) => {
          if (cookie) {
            cy.request({
              method: 'POST',
              url: `${baseUrl}${carsEndpoint}`,
              headers: {
                'Content-Type': 'application/json',
              },
              cookies: {
                'sid': cookie.value
              },
              body: {
              },
              failOnStatusCode: false
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq('error');
              expect(response.body.message).to.eq('Car brand id is required');
            });
          } else {
            throw new Error('SID cookie not found in test');
          }
        });
    });

    it('Should successfully retrieve the list of cars (GET: 200)', () => {
        cy.getCookie('sid').then((cookie) => {
            if (cookie) {
              cy.request({
                method: 'GET',
                url: `${baseUrl}/cars`,
                headers: {
                  'Content-Type': 'application/json',
                },
                cookies: {
                  'sid': cookie.value
                }
              }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('ok');
                expect(response.body.data).to.be.an('array');
                expect(response.body.data.length).to.be.greaterThan(0);
                response.body.data.forEach((car) => {
                  expect(car).to.have.property('id');
                  expect(car).to.have.property('carBrandId');
                  expect(car).to.have.property('carModelId');
                  expect(car).to.have.property('initialMileage');
                  expect(car).to.have.property('mileage');
                  expect(car).to.have.property('brand');
                  expect(car).to.have.property('model');
                  expect(car).to.have.property('logo');
                });
              });
            } else {
              throw new Error('SID cookie not found in test');
            }
        });
    });
      
    it('Should successfully create an expense (POST: 200)', () => {
        cy.getCookie('sid').then((cookie) => {
          if (cookie) {
            cy.request({
              method: 'POST',
              url: `${baseUrl}${expensesEndpoint}`,
              headers: {
                'Content-Type': 'application/json',
              },
              cookies: {
                'sid': cookie.value
              },
              body: {
                carId: 189297,
                reportedAt: "2024-08-23",
                mileage: 190000,
                liters: 210,
                totalCost: 30000,
                forceMileage: false
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.status).to.eq('ok');
              expect(response.body.data).to.have.property('id');
              expect(response.body.data).to.include({
                carId: 189297,
                reportedAt: "2024-08-23",
                mileage: 190000,
                liters: 210,
                totalCost: 30000
              });
            });
          } else {
            throw new Error('SID cookie not found in test');
          }
        });
      });

    it('Should successfully retrieve all expenses (GET: 200)', () => {
        cy.getCookie('sid').then((cookie) => {
          if (cookie) {
            cy.request({
              method: 'GET',
              url: `${baseUrl}/expenses`,
              qs: {
                carId: 189297,
                page: 1
              },
              headers: {
                'Content-Type': 'application/json',
              },
              cookies: {
                'sid': cookie.value
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.status).to.eq('ok');
              expect(response.body.data).to.be.an('array');
              expect(response.body.data.length).to.be.greaterThan(0);
              expect(response.body.data[0]).to.have.all.keys('id', 'carId', 'reportedAt', 'mileage', 'liters', 'totalCost');
              expect(response.body.currentPage).to.eq(1);
              expect(response.body.totalItems).to.be.greaterThan(0);
            });
          } else {
            throw new Error('SID cookie not found in test');
          }
        });
    });        
});
