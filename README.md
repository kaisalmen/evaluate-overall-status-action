# Evaluate Overall Status Action

This action evaluate the overall status of a job considering the job status and the test results. The output provides a status as string and color.

## Inputs

**Required**:
* `job_status`: Provide the current job status (default: `${{ job.status }`)
* `test_report_conclusion`: Conclusion drawn by the test report action (default: `''`)

**Optional**:
* `ignore_test_report`: Ignore the test report in evaluation (default: `false`)
* `fail_on_failed_tests`: Fail on failed tests (default: `false`)
* `color_stable`: Color for stable notification (default: `#007E1C`)
* `color_unstable`: Color for unstable notification (default: `#E29C00`)
* `color_failed`: Color for failed notification (default: `#AC0003`)
* `color_cancelled`: Color for cancelled notification (default: `#666666`)
* `color_error`: Color for error notification (default: `#660086`)

## Outputs

* `overall_status`: The status as string
* `overall_status_color`: Color describing the status

### What outputs are possible?
 * **Stable** (Color: #007E1C): Build successful and Tests successful (if test are not ignored)
 * **Unstable** (Color: #E29C00): Build successful, but some Tests failed (if test are not ignored)
 * **Failed** (Color: #AC0003): Build failed
 * **Cancelled** (Color: #666666): Workflow was cancelled
 * **Execution Error: Unknown job status** (Color: #660086): Illegal value in `job_status`
 * **Execution Error: Unknown test conclusion** (Color: #660086): Illegal value in `test_report_conclusion`

**Unstable** will only occur if `ignore_test_report`is configured to `false` what currently is the default.

## Example usage

```yaml
uses: kaisalmen/evaluate-overall-status-action@v1
with:
  job_status: ${{ job.status }}
  test_report_conclusion: ${{ steps.test_report.outputs.conclusion }}
```

## Rebuild Action

If not yet available install `vercel/ncc` by running this command in your terminal:
```shell
npm i -g @vercel/ncc
```

Afterwards use the following command to regenerate `dist/index.js`:
```shell
ncc build action.js --license license.txt
```
