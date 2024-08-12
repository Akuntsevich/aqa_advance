const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    viewportWidth: 1280,
    viewportHeight: 720,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here 
    },
  },
});
