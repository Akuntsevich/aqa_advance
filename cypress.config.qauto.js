const { defineConfig } = require('cypress');
const mochawesome = require('mochawesome');
const marge = require('mochawesome-report-generator');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      nameP: 'guest',
      passwordP: 'welcome2qauto',
      userEmail: 'alex_k_12@test.com',
      userPassword: 'P@ssword123',
    },
    setupNodeEvents(on, config) {
        on('after:run', async (results) => {
          const { merge } = require('mochawesome-merge');
          const report = await merge({ files: ['./cypress/results/*.json'] });
          await marge.create(report);
        });
      },
      reporter: 'mochawesome',
      reporterOptions: {
        reportDir: 'cypress/results',
        overwrite: false,
        html: false,
        json: true,
      },
    },
  });
