import {js, literalWithValue, objectWithValue} from 'optic-skills-sdk'
import {mongooseQuery} from "./Schemas";

//Defining your mongoose model
export const defineModelLens = js`
const ModelName = mongoose.model('name', new mongoose.Schema({}));
`

defineModelLens.name = 'Define Model'
defineModelLens.id = 'define-model'
defineModelLens.schema = 'mongoose-schema'
defineModelLens.value = {
	schema: objectWithValue({}),
	name: literalWithValue('name')
}

defineModelLens.variables = {
	ModelName: 'self'
}


//Inserting a record
export const insertARecordLens = js`
new ModelName({

}).save((err, item) => {
  if (!err) {
    //:success
  } else {
    //:failure
  }
})
`

insertARecordLens.name = 'Insert a record'
insertARecordLens.id = 'insert-record'
insertARecordLens.value = {
	fields: objectWithValue({})
}
insertARecordLens.schema = {
	"type": "object",
	"properties": {
		"fields": {
			"type": "object"
		}
	}
}

insertARecordLens.containers = {
	success: 'any',
	failure: 'any'
}

insertARecordLens.variables = {
	ModelName: 'self',
	err: 'self',
	item: 'self',
}

//Querying a single record
export const findingARecord = js`
ModelName.findOne({}, function (err, item) {
  if (err) {
    //:error
  } else {
    if (item) {
      //:found
    } else {
      //:notFound
    }
  }
})
`

findingARecord.name = 'Query a record'
findingARecord.id = 'find-one'
findingARecord.value = {
	query: objectWithValue({})
}
findingARecord.schema = {
	"title": "Find One Document",
	"type": "object",
	"properties": {
		"query": mongooseQuery
	}
}

findingARecord.variables = {
	ModelName: 'self',
	err: 'self',
	item: 'self',
}

findingARecord.containers = {
	error: 'any',
	found: 'any',
	notFound: 'any'
}

//Querying multiple records
export const findingAllRecords = js`
ModelName.find({}, function (err, item) {
  if (err) {
    //:error
  } else {
    if (item) {
      //:found
    } else {
      //:notFound
    }
  }
})
`

findingAllRecords.name = 'Query a record'
findingAllRecords.id = 'find-all'
findingAllRecords.value = {
	query: objectWithValue({})
}
findingAllRecords.schema = {
	"title": "Find Documents",
	"type": "object",
	"properties": {
		"query": mongooseQuery
	}
}

findingAllRecords.variables = {
	ModelName: 'self',
	err: 'self',
	item: 'self',
}

findingAllRecords.containers = {
	error: 'any',
	found: 'any',
	notFound: 'any'
}

