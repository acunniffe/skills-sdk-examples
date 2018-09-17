import {Transformation} from "optic-skills-sdk";

export const getRouteFromSchema = Transformation(
	'Get Route',
	'get-route-from-schema',
	'mongoose-schema',
	'optic:rest/route',
	(input, answers) => {
		const routeName = input.name.toLowerCase();
		const idName = routeName+'Id'
		const route = "/" + routeName;
		const routeDescription = {
			method: "get",
			url: route,
			parameters: [{ in: 'query', name: idName}]
		};
		const queryDescription = {
			query: {
				'_id': Generate('optic:rest/parameter', {
					in: 'query',
					name: idName
				})
			}
		};
		return Generate(answers.output, routeDescription, {
			containers: {
				"handler": [Generate('optic:mongoose@0.3.0/find-one', queryDescription, {
					tag: "query",
					containers: {
						"found": [Generate('optic:rest/response', {code: 200}, {variables: {item: 'item'}})],
						"notFound": [Generate('optic:rest/response', {code: 404, value: 'Not Found'}, {variables: {item: 'item'}})],
						"error": [Generate('optic:rest/response', {code: 400}, {variables: {item: 'err'}})]
					}
				})]
			}
		});
	})


export const getAllRouteFromSchema = Transformation(
	'Get All Route',
	'get-all-route-from-schema',
	'mongoose-schema',
	'optic:rest/route',
	(input, answers) => {
		const routeName = input.name.toLowerCase()+'s';
		const route = "/" + routeName;

		const routeDescription = {
			method: "get",
			url: route,
			parameters: []
		};
		const queryDescription = {
			query: {}
		};
		return Generate(answers.output, routeDescription, {
			containers: {
				"handler": [Generate('optic:mongoose@0.3.0/find-many', queryDescription, {
					tag: "query",
					containers: {
						"found": [Generate('optic:rest/response', {code: 200}, {variables: {item: 'items'}})],
						"notFound": [Generate('optic:rest/response', {code: 404, value: 'Not Found'}, {variables: {item: 'items'}})],
						"error": [Generate('optic:rest/response', {code: 400}, {variables: {item: 'err'}})]
					},
					variables: {item: 'items'}
				})]
			}
		});
	})


export const createRouteFromSchema = Transformation(
	'Create Route',
	'create-route-from-schema',
	'mongoose-schema',
	'optic:rest/route',
	(input, answers) => {
		const routeName = input.name.toLowerCase();
		const route = "/" + routeName;
		const parameters = Object.keys(input.schema).map(function(i) {
			return { in: 'body', name: i};
		});
		const routeDescription = {
			method: "post",
			url: route,
			parameters: parameters
		};
		const queryDescription = {
			fields: Object.keys(input.schema).reduce(function(previous, current) {
				previous[current] = Generate('optic:rest/parameter', { in: 'body',
					name: current
				});
				return previous;
			}, {})
		};
		return Generate(answers.output, routeDescription, {
			containers: {
				"handler": [Generate('optic:mongoose@0.3.0/insert-record', queryDescription, {
					tag: "query",
					containers: {
						"success": [Generate('optic:rest/response', {code: 200}, {variables: {item: 'item'}})],
						"failure": [Generate('optic:rest/response', {code: 400}, {variables: {item: 'err'}})]
					}
				})]
			}
		});
	})
