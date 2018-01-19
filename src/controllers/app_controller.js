import { Controller } from "stimulus";

// (async () => {
// 	const p = await import("dialog-polyfill");
// 	console.log({ p });
// })();

export default class extends Controller {
	connect() {
		// console.log("app controller connected");
		// console.log({ this: this });
	}
	initialize() {
		this.element.classList.add("controller-did-initialize");
	}
	get inputValue() {
		return this.targets.find("input").value;
	}
	get output() {
		return this.targets.find("output");
	}
	echo() {
		this.output.innerText = this.inputValue;
	}
}
