const core = require('@actions/core');
const github = require('@actions/github');

try {
    const jobStatus = core.job.status;
    const testReportConclusion = core.getInput('test_report_conclusion');
    let outputStatus = 'Cancelled';
    let outputStatusColor = '#666666';

    console.log('Job Status: ' + jobStatus);

    if (testReportConclusion === undefined || testReportConclusion === '') {
        throw {
            message: 'Provided test report conclusion is empty'
        }
    }

    if (jobStatus !== 'cancelled') {
        if (jobStatus === 'success') {
            if (testReportConclusion === "success") {
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
    core.setFailed(error.message);
}
