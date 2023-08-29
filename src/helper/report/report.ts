const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName: "Open Access Automation Report",
  pageTitle: "Automation Report",
  customfield_13100: "SLIMS",
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Open Access" },
      { label: "Release", value: "7.0.0" },
      { label: "Cycle", value: "Integration Test" }
    ],
  },
});