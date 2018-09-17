import {Skill} from "optic-skills-sdk";
import {routeLens} from "./endpoint";

export default Skill('optic', 'express', '0.4.0', {
	schemas: [],
	lenses: [routeLens],
	transformations: [],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
