const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const jobStatus = core.getInput('job_status');
    const testReportConclusion = core.getInput('test_report_conclusion');
    const ignoreTestReport = core.getInput('ignore_test_report') === 'true';
    const failOnFailedTests = core.getInput('fail_on_failed_tests') === 'true';
    const colorStable = core.getInput('color_stable');
    const colorUnstable = core.getInput('color_unstable');
    const colorFailed = core.getInput('color_failed');
    const colorCancelled = core.getInput('color_cancelled');
    const colorError = core.getInput('color_error');

    console.log('Input:');
    console.log('Job Status: ' + jobStatus);
    console.log('Test Report Conclusion: ' + testReportConclusion);
    console.log('Ignore Test Report: ' + ignoreTestReport);
    console.log('Fail on Failed Tests: ' + failOnFailedTests);

    try {
        if (jobStatus !== 'cancelled' && jobStatus !== 'success' && jobStatus !== 'failure') {
            throw {
                status: 'Execution Error: Unknown job status',
                message: 'Provided job status (' + jobStatus + ') is not correct.'
            }
        }

        if (jobStatus !== 'cancelled' && !ignoreTestReport && testReportConclusion !== 'success' && testReportConclusion !== 'failure') {
            throw {
                status: 'Execution Error: Unknown test conclusion',
                message: 'Provided test report conclusion is empty'
            }
        }

        let outputStatus = 'Cancelled';
        let outputStatusColor = colorCancelled;
        if (jobStatus !== 'cancelled') {
            if (jobStatus === 'success') {
                if (testReportConclusion === "success" || ignoreTestReport) {
                    outputStatus = 'Stable';
                    outputStatusColor = colorStable;
                }
                else {
                    outputStatus = 'Unstable (Failed Tests)';
                    outputStatusColor = colorUnstable;
                }
            }
            else {
                outputStatus = 'Failed';
                outputStatusColor = colorFailed;
            }
        }

        core.setOutput('overall_status', outputStatus);
        core.setOutput('overall_status_color', outputStatusColor);
        if (failOnFailedTests && outputStatusColor === colorUnstable) {
            core.setFailed('Failed due to failed tests');
        }

        console.log('Output:');
        console.log('Overall Status: ' + outputStatus);
        console.log('Overall Status color: ' + outputStatusColor);
    }
    catch (error) {
        core.setOutput('overall_status', error.status);
        core.setOutput('overall_status_color', colorError);
        core.setFailed(error.message);
    }
}

run();
