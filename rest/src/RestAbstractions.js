import {Abstraction} from "optic-skills-sdk";

export const headerSchema = Abstraction('header', {
	"title": "Header",
	"type": "object",
	"required": ["name"],
	"properties": {
		"name": {
			"type": "string"
		}
	}
})

export const parametersSchema = Abstraction('parameter', {
	"title": "Parameter",
	"type": "object",
	"required": ["in", "name"],
	"properties": {
		"in": {
			"type": "string",
			"enum": ["query", "body", "params", "header"]
		},
		"name": {
			"type": "string"
		}
	}
})

export const responsesSchema = Abstraction('response', {
	"title": "Response",
	"type": "object",
	"required": ["code"],
	"properties": {
		"code": {
			"type": "number"
		}
	}
})

export const routeSchema = Abstraction('route', {
	"title": "Route",
	"type": "object",
	"required": ["method", "url"],
	"properties": {
		"method": {
			"type": "string",
			"enum": ["get", "post", "put", "delete", "head", "options"]
		},
		"url": {
			"type": "string"
		},
		"headers": {
			"type": "array",
			"items": headerSchema.definition,
		},
		"parameters": {
			"type": "array",
			"items": parametersSchema.definition,
		},
		"responses": {
			"type": "array",
			"items": responsesSchema.definition,
		}
	},
	"order": ["url", "method", "parameters", "headers", "responses"]
})
