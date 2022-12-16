#!/usr/bin/env node

const fs = require('fs')

function removeUnnecessaryUnionOptions() {
  const file = `${process.cwd()}/../src/generated/models/index.ts`

  const fileData = fs.readFileSync(file)
  let fileAsStr = fileData.toString('utf8')

  fileAsStr = fileAsStr.replace(/\| AbstractAudited/, '')
  fileAsStr = fileAsStr.replace(/Page \|/, '')
  fileAsStr = fileAsStr.replace(/\| ProcessElementValue/, '')
  fileAsStr = fileAsStr.replace(/\| TaskElementValue/, '')
  fileAsStr = fileAsStr.replace(/\| WebhookEvent/, '')

  fs.writeFileSync(file, fileAsStr, 'utf8')
}

removeUnnecessaryUnionOptions()
