import {js, literalWithValue, objectWithValue} from 'optic-skills-sdk'
import {mongooseQuery} from "./abstractions";

//Defining your mongoose model
export const defineModelLens = js`
const ModelName = mongoose.model('name', new mongoose.Schema({}));
`

.name('Define Model')
.id('define-model')
.abstractionSchema('mongoose-schema')
.abstraction({
	schema: objectWithValue({}),
	name: literalWithValue('name')
})

.variables({
	ModelName: 'self'
})


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

.name('Insert a record')
.id('insert-record')
.abstraction({
	fields: objectWithValue({})
})
.abstractionSchema({
	"type": "object",
	"properties": {
		"fields": {
			"type": "object"
		}
	}
})
.containers({
	success: 'any',
	failure: 'any'
})
.variables({
	ModelName: 'self',
	err: 'self',
	item: 'self',
})

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

.name('Query a record')
.id('find-one')
.abstraction({
	query: objectWithValue({})
})
.abstractionSchema({
	"title": "Find One Document",
	"type": "object",
	"properties": {
		"query": mongooseQuery
	}
})
.variables({
	ModelName: 'self',
	err: 'self',
	item: 'self',
})
.containers({
	error: 'any',
	found: 'any',
	notFound: 'any'
})

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

.name('Query a record')
.id('find-all')
.abstraction({
	query: objectWithValue({})
})
.abstractionSchema({
	"title": "Find Documents",
	"type": "object",
	"properties": {
		"query": mongooseQuery
	}
})

.variables({
	ModelName: 'self',
	err: 'self',
	item: 'self',
})

.containers({
	error: 'any',
	found: 'any',
	notFound: 'any'
})

