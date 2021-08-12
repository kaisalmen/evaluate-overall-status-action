# Evaluate Overall Status Action

This action evaluate the overall status of a job considering the job status and the test results. The output provides a status as string and color.

## Inputs

**Required**:
* `job_status`: Provide the current job status (default: `${{ job.status }`)
* `test_report_conclusion`: Conclusion drawn by the test report action (default: `''`)

**Optional**:
* `ignore_test_report`: Ignore the test report in evaluation (default: `false`)
* `color_stable`: Color for stable notification (default: `#007E1C`)
* `color_unstable`: Color for unstable notification (default: `#E29C00`)
* `color_failed`: Color for failed notification (default: `#AC0003`)
* `color_cancelled`: Color for cancelled notification (default: `#666666`)
* `color_error`: Color for error notification (default: `#660086`)

## Outputs

* `overall_status`: The status as string
* `overall_status_color`: Color describing the status

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
