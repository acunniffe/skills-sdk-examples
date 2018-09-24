import assert from 'assert'
import {SkillTestKit} from "optic-skills-sdk";
import requestSkill from './request.skill'

describe('request skill', () => {
	const requestSkillTestKit = SkillTestKit(requestSkill)
	const requestLensTestKit = requestSkillTestKit.testGenerator('http-request')
	const requestFromRouteTestKit = requestSkillTestKit.testRelationship('request-from-route')
	it('can parse a http request', () => {
		const parseResult = requestLensTestKit.parse(`
request.post({uri: '/location'}, function (err, response, body) {
})
`)
		assert.deepStrictEqual(parseResult.value, {
				"options": {"uri": "/location", "_order": ["uri"]},
				"method": "post",
				"_variables": {"body": "body", "err": "err", "response": "response"}
			}
		)

	})

	it('can transform a route into a request', () => {
		const result = requestFromRouteTestKit.stageTransformation({
			'url': 'abc',
			'method': 'put',
			parameters: [{in: 'body', name: 'test'}]
		})
		assert.deepStrictEqual(result.result, {
				"schema": "request",
				"value": {
					"method": "put",
					"options": {"uri": "abc", "json": {"test": {"_valueFormat": "token", "value": "test"}}}
				},
				"options": {"lensId": "http-request"}
			}
		)
	})

})
