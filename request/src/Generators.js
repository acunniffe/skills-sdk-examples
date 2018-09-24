import {js, objectWithValue, tokenWithValue} from 'optic-skills-sdk'

export const requestJs = js`
request.get({}, function (err, response, body) {
  //:handler
  if (response.statusCode >= 200 && statusCode.status < 300) {
    //:success
  } else {
    //:error
  }

})
`

.id('http-request')
.name('HTTP Request')
.abstractionSchema('request')

.abstraction({
	method: tokenWithValue('get'),
	options: objectWithValue({})
})

.containers({
	handler: 'any',
	success: 'any',
	error: 'any'
})

.variables({
	err: 'self',
	response: 'self',
	body: 'self'
})
