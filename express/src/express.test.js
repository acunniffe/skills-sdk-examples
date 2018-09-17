import assert from 'assert'
import {SkillTestKit} from "optic-skills-sdk";
import expressSkill from './express.skill'

describe('express skill', () => {
	const expressSkillTestKit = SkillTestKit(expressSkill)

	describe('parameters', () => {
		const parametersTestKit = expressSkillTestKit.testLens('express-parameter')

		it('can generate parameters', () => {
			const result = parametersTestKit.generate({in: 'query', name: 'testName'})
			assert(result.success)
			assert(result.code === 'req.query.testName')
		})

		it('can parse parameters', () => {
			const result = parametersTestKit.parse('req.body.param')
			assert(result.success)
			assert(result.value.in === 'body')
			assert(result.value.name === 'param')
		})

		it('will not parse parameters with invalid "in" values', () => {
			const result = parametersTestKit.parse('req.whazzzzup.param')
			assert(!result.success)
		})

		it('can mutate parameters', () => {
			const result = parametersTestKit.mutate('req.body.param', {in: 'query'})
			assert(result.code === 'req.query.param')
		})

	})

	describe('endpoint', () => {
		const endpointTestKit = expressSkillTestKit.testLens('express-endpoint')
		it('can generate a basic endpoint', () => {
			const result = endpointTestKit.generate({method: 'get', url: '/testurl'})
			assert(result.success)
			assert(result.code === 'app.get(\'/testurl\', (req, res) => {\n' +
				'\n' +
				'})')
		})

		it('can parse a basic endpoint', () => {
			const result = endpointTestKit.parse(
				`app.get('/testurl', (req, res) => {

})`.trim())
			assert(result.success)
			assert.deepStrictEqual(result.value, {
				url: '/testurl',
				method: 'get',
				parameters: [],
				headers: [],
				_variables: {req: 'req', res: 'res'}
			})
		})

		it('can parse an endpoint with parameters', () => {
			const result = endpointTestKit.parse(
				`app.get('/testurl', (req, res) => {
	 req.query.first
	 req.query.first
	 req.query.second
})`.trim())
			assert(result.success)
			assert.deepStrictEqual(result.value, {
				url: '/testurl',
				method: 'get',
				parameters: [{in: 'query', name: 'first'}, {in: 'query', name: 'second'}],
				headers: [],
				_variables: {req: 'req', res: 'res'}
			})
		})


		it('can parse an endpoint with parameter and headers', () => {
			const result = endpointTestKit.parse(
				`app.get('/testurl', (req, res) => {
	 req.query.first
	 req.query.first
	 req.headers['Hello-World']
	 req.get('X-TEST')
})`.trim())

			assert(result.success)
			assert.deepStrictEqual(result.value, {
				url: '/testurl',
				method: 'get',
				parameters: [{in: 'query', name: 'first'}],
				headers: [{name: 'Hello-World'}, {name: 'X-TEST'}],
				_variables: {req: 'req', res: 'res'}
			})
		})
	})

})
