import assert from 'assert'
import {SkillTestKit} from "optic-skills-sdk";
import mongooseSkill from './mongoose.skill'

describe('mongoose skill', () => {
	const mongooseSkillTestKit = SkillTestKit(mongooseSkill)

	describe('define model', () => {
		const defineModelTestKit = mongooseSkillTestKit.testGenerator('define-model')

		it('can parse', () => {
			const parseResult = defineModelTestKit.parse(
				`
const TestModel = mongoose.model('ModelNamedModel', new mongoose.Schema({
	firstName: 'string',
	lastName: 'string',
	isAdmin: 'boolean'
}))
`
			)
			assert.deepStrictEqual(parseResult.value, {
				"name": "ModelNamedModel",
				"schema": {
					"firstName": "string",
					"lastName": "string",
					"isAdmin": "boolean",
					"_order": ["firstName", "lastName", "isAdmin"]
				},
				"_variables": {"ModelName": "TestModel"}
			})
		})

	})

	describe('insert record query', () => {
		const insertRecordQueryTestKit = mongooseSkillTestKit.testGenerator('insert-record')
		it('can generate an insert record section', () => {
			const result = insertRecordQueryTestKit.generate({
				fields: {
					test: 'abc',
				},
				_variables: {
					ModelName: 'TestModel'
				}
			})

			assert(result.code ===
`new TestModel({ test: 'abc' }).save((err, item) => {
  if (!err) {
  
  } else {
  
  }
})`)
		})
	})

	describe('transformations', () => {
		const createRouteFromSchemaTestKit = mongooseSkillTestKit.testRelationship('create-route-from-schema')
		it('can transform a schema into a POST rest route', () => {

			const transformed = createRouteFromSchemaTestKit.stageTransformation({
				"name": "ModelNamedModel",
				"schema": {
					"firstName": "string",
					"lastName": "string",
					"isAdmin": "boolean",
					"_order": ["firstName", "lastName", "isAdmin"]
				}
			})

			assert.deepStrictEqual(transformed.result, {
					"schema": "optic:rest@latest/route",
					"value": {
						"method": "post",
						"url": "/modelnamedmodel",
						"parameters": [{"in": "body", "name": "firstName"}, {
							"in": "body",
							"name": "lastName"
						}, {"in": "body", "name": "isAdmin"}]
					},
					"options": {
						"containers": {
							"handler": [{
								"schema": "optic:mongoose@0.3.0/insert-record",
								"value": {
									"fields": {
										"firstName": {
											"schema": "optic:rest/parameter",
											"value": {"in": "body", "name": "firstName"},
											"_isStagedNode": true
										},
										"lastName": {
											"schema": "optic:rest/parameter",
											"value": {"in": "body", "name": "lastName"},
											"_isStagedNode": true
										},
										"isAdmin": {
											"schema": "optic:rest/parameter",
											"value": {"in": "body", "name": "isAdmin"},
											"_isStagedNode": true
										}
									}
								},
								"options": {
									"containers": {
										"success": [{
											"schema": "optic:rest@latest/response",
											"value": {"code": 200},
											"options": {"variables": {"item": "item"}}
										}],
										"failure": [{
											"schema": "optic:rest@latest/response",
											"value": {"code": 400},
											"options": {"variables": {"item": "err"}}
										}]
									}, "tag": "query"
								}
							}]
						}
					}
				}
			)
		})
	})

})
