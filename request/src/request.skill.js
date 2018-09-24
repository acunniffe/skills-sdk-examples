import {Skill} from "optic-skills-sdk";
import {requestSchema} from "./Abstractions";
import {requestFromRoute} from "./Relationships";
import {requestJs} from "./Generators";

export default Skill('optic', 'request', '0.4.0', {
	abstractions: [requestSchema],
	generators: [requestJs],
	relationships: [requestFromRoute],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
