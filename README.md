# Evaluate Overall Status Action

This action evaluate the overall status of a job considering the job status and the test results. The output provides a status as string and color.

## Inputs

* `test_report_conclusion`: Conclusion drawn by the test report action. (**Required**)

## Outputs

* `overall_status`: The status as string
* `overall_status_color`: Color describing the status

## Example usage

```yaml
uses: kaisalmen/evaluate-overall-status-action@latest
with:
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
