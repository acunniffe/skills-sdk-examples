import {Skill} from "optic-skills-sdk";
import {mongooseQuery, mongooseSchema} from "./Schemas";
import {defineModelLens, insertARecordLens} from "./Lenses";
import {createRouteFromSchema} from "./Transformations";

export default Skill('optic', 'mongoose', '0.4.0', {
	schemas: [mongooseQuery, mongooseSchema],
	lenses: [defineModelLens, insertARecordLens],
	transformations: [createRouteFromSchema],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
