import {js, literalWithValue, collectUnique, tokenWithValue} from 'optic-skills-sdk'

const parameters = js`
req.query.paramName
`
.id('express-parameter')
.abstractionSchema('optic:rest/parameter')
.abstraction({
	in: tokenWithValue('query'),
	name: tokenWithValue('paramName')
})
.variables({
	req: 'scope'
})

//Headers Lens
const header1 = js`
req.get('X-Header')
`
.id('express-header-function-style')
.abstractionSchema('optic:rest/header')
.abstraction({
	name: literalWithValue('X-Header'),
})
.variables({
	req: 'scope'
})

//Headers Lens
const header2 = js`
req.headers['X-Header']
`
.id('express-header-bracket-style')
.abstractionSchema('optic:rest/header')
.abstraction({
	name: literalWithValue('X-Header'),
})
.variables({
	req: 'scope'
})

//Route Lens
export const route = js`
app.get('url', (req, res) => {
	//:handler
})
`
.id('express-endpoint')
.abstractionSchema('optic:rest/route')
.abstraction({
	method: tokenWithValue('get'),
	url: literalWithValue('url'),
	parameters: collectUnique(parameters),
	headers: collectUnique('optic:rest/header'),
})

.containers({
	handler: 'any'
})

.variables({
	req: 'self',
	res: 'self',
})

.subgenerators([
	parameters,
	header1,
	header2
])
