import {js, literalWithValue, collectUnique, tokenWithValue} from 'optic-skills-sdk'

//Parameters Lens
const parametersLens = js`
req.query.paramName
`
parametersLens.id = 'express-parameter'
parametersLens.schema = 'optic:rest/parameter'
parametersLens.value = {
	in: tokenWithValue('query'),
	name: tokenWithValue('paramName')
}

parametersLens.variables = {
	req: 'scope'
}

//Headers Lens
const headerLens1 = js`
req.get('X-Header')
`
headerLens1.id = 'express-header-function-style'
headerLens1.schema = 'optic:rest/header'
headerLens1.value = {
	name: literalWithValue('X-Header'),
}

headerLens1.variables = {
	req: 'scope'
}

//Headers Lens
const headerLens2 = js`
req.headers['X-Header']
`
headerLens2.id = 'express-header-bracket-style'
headerLens2.schema = 'optic:rest/header'
headerLens2.value = {
	name: literalWithValue('X-Header'),
}

headerLens2.variables = {
	req: 'scope'
}


//Route Lens
export const routeLens = js`
app.get('url', (req, res) => {
	//:handler
})
`
routeLens.id = 'express-endpoint'
routeLens.schema = 'optic:rest/route'
routeLens.value = {
	method: tokenWithValue('get'),
	url: literalWithValue('url'),
	parameters: collectUnique(parametersLens),
	headers: collectUnique('optic:rest/header'),
}

routeLens.containers.handler = 'any'

routeLens.variables = {
	req: 'self',
	res: 'self',
}

routeLens.sublenses = [
	parametersLens,
	headerLens1,
	headerLens2
]
