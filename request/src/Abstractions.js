import {Abstraction, RawCode, Token} from "optic-skills-sdk";

export const requestSchema = Abstraction('request', {
	"title": "HTTP Request",
	"type": "object",
	"required": ["method"],
	"properties": {
		"method" : {
			"type": "string",
			"enum": ["get", "post", "put", "delete", "head", "options"]
		},
		"options": {
			"type": "object",
			"required": ["uri"],
			"properties": {
				"uri" : {"type": "string"},
				"qs" : {
					"type": "object",
					"patternProperties": {
						"^.*$": {}
					}
				},
				"body" : {"anyOf": [
						RawCode,
						Token,
						{"type": "string", "title": "String"},
						{"type": "object", "title": "Object", "patternProperties": {
								"^.*$": {}}}
					]},
				"json" : {"anyOf": [
						{"$ref": "#/definitions/optic/code"},
						{"$ref": "#/definitions/optic/token"},
						{"type": "string", "title": "String"},
						{"type": "object", "title": "Object", "patternProperties": {
								"^.*$": {}}}
					]}
			}
		}
	}
})
