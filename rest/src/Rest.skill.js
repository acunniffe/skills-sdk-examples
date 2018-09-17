import {Skill} from "optic-skills-sdk";
import {headerSchema, parametersSchema, responsesSchema, routeSchema} from "./RestSchemas";

export default Skill('optic', 'rest', '0.4.0', {
	schemas: [
		parametersSchema, responsesSchema, headerSchema, routeSchema
	]
})
