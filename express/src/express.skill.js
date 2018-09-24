import {Skill} from "optic-skills-sdk";
import {route} from "./endpoint";

export default Skill('optic', 'express', '0.4.0', {
	generators: [route],
	dependencies: {
		'optic:rest': '0.4.0'
	}
})
