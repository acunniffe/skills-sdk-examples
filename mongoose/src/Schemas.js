import {Schema, RawCode, Token} from "optic-skills-sdk";

export const mongooseSchema = Schema('mongoose-schema', {
	"title": "Mongoose Schema",
	"type": "object",
	"properties": {
		"name": {
			"type": "string"
		},
		"schema": {
			"type": "object",
			"patternProperties": {
				"^.*$": {
					"anyOf": [
						{
							"type": "string",
							"title": "Primitive",
							"enum": ["string", "number", "boolean", "date"]
						},
						RawCode,
						Token
					]
				}
			}
		}
	}
})

export const mongooseQuery = Schema('query', {
	"title": "Query",
	"type": "object",
	"patternProperties": {
		"^.*$": {
			"anyOf": [
				RawCode,
				Token,
				{"type": "string", "title": "String"},
				{"type": "number", "title": "Number"},
				{"type": "boolean", "title": "Boolean"},
				{"type": "object", "title": "Object"}
			]
		}
	}
})
