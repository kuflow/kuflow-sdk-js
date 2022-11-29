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

input-file: /Users/kuflow/Projects/kuflow-openapi/specs/api.kuflow.com/v2022-10-08/openapi.yaml
output-folder: ../
source-code-folder-path: ./src/generated

openapi-type: data-plane
add-credential: true
package-name: '@kuflow/kuflow-rest-client'
package-version: '0.0.1'

generate-metadata: false
generate-test: false
generate-sample: false
hide-clients: true

use-extension:
  '@autorest/typescript': '6.0.0-rc.3'
  '@autorest/modelerfour': '4.25.0'

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
