import {Skill} from "optic-skills-sdk";
import {requestSchema} from "./Schemas";
import {requestJsLens} from "./Lenses";
import {requestFromRoute} from "./Transformations";

export default Skill('optic', 'request', '0.4.0', {
	schemas: [requestSchema],
	lenses: [requestJsLens],
	transformations: [requestFromRoute],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
