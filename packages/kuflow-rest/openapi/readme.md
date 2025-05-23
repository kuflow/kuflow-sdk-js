# KuFlow Rest API client

> see https://aka.ms/autorest

This is the AutoRest configuration file for KuFlow.

---

## Getting Started

To build the SDK for KuFlow, simply do the following in this folder:

```bash
$> npm ci
$> npm run generate
```

---

## Configuration

### Basic Information

```yaml
v3: true
typescript: true
title: KuFlow
override-client-name: KuFlowRestClientGenerated

input-file: https://raw.githubusercontent.com/kuflow/kuflow-openapi/d6efa3962ce82bcfd96c97647a62f60f21633b23/specs/api.kuflow.com/v2024-06-14/openapi.yaml
output-folder: ../
source-code-folder-path: ./src/generated

openapi-type: data-plane
add-credential: true
package-name: '@kuflow/kuflow-rest'
package-version: '0.0.1'

generate-metadata: false
generate-test: false
generate-sample: false
hide-clients: true

use-extension:
  '@autorest/typescript': '6.0.28'

modelerfour:
  seal-single-value-enum-by-default: false
```

### Group operations using tag

```yaml
directive:
  - from: openapi-document
    where: $.paths[*][*]
    transform: |
      if ($.operationId.indexOf($.tags[1] + '_') === -1) {
        $.operationId = $.tags[1] + '_' + $.operationId;
      }
```

### Change date-time format to string due to temporal doesn't handle it

```yaml
directive:
  - from: openapi-document
    where: $.components.schemas[*].properties[*]
    transform: |
      if ($.format === 'date-time') {
        $.format = undefined;
        $.description = `${$.description ? ($.description + ' - ') : ''}date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z`;
      }
  - from: openapi-document
    where: $.components.schemas[*].allOf[*].properties[*]
    transform: |
      if ($.format === 'date-time') {
        $.format = undefined;
        $.description = `${$.description ? ($.description + ' - ') : ''}date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z`;
      }
```

### Mark all enums with 'modelAsString = false'

```yaml
directive:
  - from: openapi-document
    where: $.components.schemas[*]
    transform: |
      if ($.enum && !$['x-ms-enum']) {
        $['x-ms-enum'] = {
          modelAsString: false
        }
      }
```
