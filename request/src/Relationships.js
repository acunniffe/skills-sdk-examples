import {Relationship} from "optic-skills-sdk";

export const requestFromRoute = Relationship(
'Request from Route',
'request-from-route',
'optic:rest/route',
'request',
(input, answers) => {
	const requestDescription = {
		method: input.method,
		options: {
			uri: input.url
		}
	}

	const queryParams = input.parameters.filter(i=> i.in === 'query')

	if (!!queryParams.length) {
		const qs = { }
		queryParams.forEach(i=> qs[i.name] = {_valueFormat: 'token', value: i.name})
		requestDescription.options.qs = qs
	}

	const bodyParams = input.parameters.filter(i=> i.in === 'body')

	if (!!bodyParams.length) {
		const json = { }
		bodyParams.forEach(i=> json[i.name] = {_valueFormat: 'token', value: i.name})
		requestDescription.options.json = json
	}

	const headerParams = input.headers

	if (!!queryParams.length) {
		const headers = { }
		headerParams.forEach(i=> headers[i.name] = i.name)
		requestDescription.options.headers = headers
	}

	return Generate(answers.output, requestDescription, {
		lensId: "http-request"
	})
})
