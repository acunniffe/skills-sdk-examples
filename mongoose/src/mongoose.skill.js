import {Skill} from "optic-skills-sdk";
import {mongooseQuery, mongooseSchema} from "./abstractions";
import {defineModelLens, insertARecordLens} from "./generators";
import {createRouteFromSchema} from "./relationships";

export default Skill('optic', 'mongoose', '0.4.0', {
	abstractions: [mongooseQuery, mongooseSchema],
	generators: [defineModelLens, insertARecordLens],
	relationships: [createRouteFromSchema],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
