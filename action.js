const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const jobStatus = core.getInput('job_status');
    const testReportConclusion = core.getInput('test_report_conclusion');
    const ignoreTestReport = core.getInput('ignore_test_report') === 'true';
    const colorStable = core.getInput('color_stable');
    const colorUnstable = core.getInput('color_unstable');
    const colorFailed = core.getInput('color_failed');
    const colorCancelled = core.getInput('color_cancelled');
    const colorError = core.getInput('color_error');

    console.log('Input:');
    console.log('Job Status: ' + jobStatus);
    console.log('Test Report Conclusion: ' + testReportConclusion);
    console.log('Ignore Test Report: ' + ignoreTestReport);

    try {
        if (!ignoreTestReport && (testReportConclusion === undefined || testReportConclusion === '')) {
            throw {
                status: 'Execution Error: Unknown test conclusion',
                message: 'Provided test report conclusion is empty'
            }
        }

        if (jobStatus !== 'cancelled' && jobStatus !== 'success' && jobStatus !== 'failure') {
            throw {
                status: 'Execution Error: Unknown job status',
                message: 'Provided job status (' + jobStatus + ') is not correct.'
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
    }
    catch (error) {
        core.setOutput('overall_status', error.status);
        core.setOutput('overall_status_color', colorError);
        core.setFailed(error.message);
    }
}

run();
