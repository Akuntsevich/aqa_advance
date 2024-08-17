  /*Cypress.Commands.add('typePassword', {precSubject: 'element'}, (subject, password) => {
    cy.wrap(subject).type(password, {log: false});
  });*/


Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
});
  