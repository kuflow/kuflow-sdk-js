#!/usr/bin/env node

const fs = require('fs')

function readFile(fileGeneratedPath) {
  const file = `${process.cwd()}/../src/generated/${fileGeneratedPath}`

  const fileData = fs.readFileSync(file)
  let fileAsStr = fileData.toString('utf8')
  return { file, fileAsStr }
}

function removeUnnecessaryUnionOptions() {
  let { file, fileAsStr } = readFile('models/index.ts')

  fileAsStr = fileAsStr.replace(/\| AbstractAudited/, '')
  fileAsStr = fileAsStr.replace(/Page \|/, '')
  fileAsStr = fileAsStr.replace(/\| ProcessElementValue/, '')
  fileAsStr = fileAsStr.replace(/\| TaskElementValue/, '')
  fileAsStr = fileAsStr.replace(/\| WebhookEvent/, '')

  fs.writeFileSync(file, fileAsStr, 'utf8')
}

function fixWrongObjectTypeValuesInModels() {
  let { file, fileAsStr } = readFile('models/index.ts')

  fileAsStr = fileAsStr.replaceAll(/"Authentication"/g, '"AUTHENTICATION"')
  fileAsStr = fileAsStr.replaceAll(/"Process"/g, '"PROCESS"')
  fileAsStr = fileAsStr.replaceAll(/"Task"/g, '"TASK"')
  fileAsStr = fileAsStr.replaceAll(/"Worker"/g, '"WORKER"')

  fs.writeFileSync(file, fileAsStr, 'utf8')
}

function fixWrongObjectTypeValuesInMappers() {
  let { file, fileAsStr } = readFile('models/mappers.ts')

  fileAsStr = fileAsStr.replace(/"Authentication"/, '"AUTHENTICATION"')
  fileAsStr = fileAsStr.replace(/serializedName: "Authentication"/, 'serializedName: "AUTHENTICATION"')
  fileAsStr = fileAsStr.replace(/serializedName: "Process"/, 'serializedName: "PROCESS"')
  fileAsStr = fileAsStr.replace(/serializedName: "Worker"/, 'serializedName: "WORKER"')
  fileAsStr = fileAsStr.replace(/"AbstractAudited.Authentication"/, '"AbstractAudited.AUTHENTICATION"')
  fileAsStr = fileAsStr.replace(/"AbstractAudited.Process"/, '"AbstractAudited.PROCESS"')
  fileAsStr = fileAsStr.replace(/"AbstractAudited.Task"/, '"AbstractAudited.TASK"')
  fileAsStr = fileAsStr.replace(/"AbstractAudited.Worker"/, '"AbstractAudited.WORKER"')

  fs.writeFileSync(file, fileAsStr, 'utf8')
}

removeUnnecessaryUnionOptions()
fixWrongObjectTypeValuesInModels()
fixWrongObjectTypeValuesInMappers()
