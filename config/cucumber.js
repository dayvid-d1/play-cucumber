module.exports = {
    default: {
        tags: process.env.TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/tests/**/*.feature"
        ],
        dryRun: false,
        require: [
            "src/tests/**/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "html:test-results/cucumber-report-"+process.env.BROWSER+".html",
            "json:test-results/cucumber-report-"+process.env.BROWSER+".json",
            "rerun:@failedScenarios.txt"
        ],
        parallel: 2
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        dryRun: false,
        require: [
            "src/tests/**/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@failedScenarios.txt"
        ],
        parallel: 2
    }
}