import {js, objectWithValue, tokenWithValue} from 'optic-skills-sdk'

export const requestJsLens = js`
request.get({}, function (err, response, body) {
  //:handler
  if (response.statusCode >= 200 && statusCode.status < 300) {
    //:success
  } else {
    //:error
  }

})
`

requestJsLens.id = 'http-request'
requestJsLens.name = 'HTTP Request'
requestJsLens.schema = 'request'

requestJsLens.value = {
	method: tokenWithValue('get'),
	options: objectWithValue({})
}

requestJsLens.containers = {
	handler: 'any',
	success: 'any',
	error: 'any'
}

requestJsLens.variables = {
	err: 'self',
	response: 'self',
	body: 'self'
}
