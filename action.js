const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const jobStatus = core.getInput('job_status');
        const testReportConclusion = core.getInput('test_report_conclusion');
        const ignoreTestReport = core.getInput('ignore_test_report') === 'true';

        console.log('Input:');
        console.log('Job Status: ' + jobStatus);
        console.log('Test Report Conclusion: ' + testReportConclusion);
        console.log('Ignore Test Report: ' + ignoreTestReport);

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
        let outputStatusColor = '#666666';
        if (jobStatus !== 'cancelled') {
            if (jobStatus === 'success') {
                if (testReportConclusion === "success" || ignoreTestReport) {
                    outputStatus = 'Stable';
                    outputStatusColor = '#00FF00';
                }
                else {
                    outputStatus = 'Unstable (Failed Tests)';
                    outputStatusColor = '#FFFF00';
                }
            }
            else {
                outputStatus = 'Failed';
                outputStatusColor = '#FF0000';
            }
        }

        core.setOutput('overall_status', outputStatus);
        core.setOutput('overall_status_color', outputStatusColor);
    }
    catch (error) {
        core.setOutput('overall_status', error.status);
        core.setOutput('overall_status_color', '#4E0066');
        core.setFailed(error.message);
    }
}

run();
