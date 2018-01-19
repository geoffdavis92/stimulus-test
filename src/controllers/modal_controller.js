import { Controller } from "stimulus";
import dialog from "dialog-polyfill";
import { registerDataInterface, toBool } from "../utilities.js";

export default class Modal extends Controller {
	state = registerDataInterface(this);
	connect() {}
	initialize() {
		this.state.set({ foo: "bar", open: false, items: [1, 2, 3] });
	}
	render() {}
	set open(val) {
		this.data.set("open", val);
		this.render();
	}
	get trigger() {
		return this.targets.find("trigger");
	}
	get dialog() {
		return this.targets.find("dialog");
	}
	async toggle() {
		const isOpen = !this.state.get("open");
		if (isOpen) {
			this.dialog.setAttribute("open", isOpen);
		} else {
			this.dialog.removeAttribute("open");
		}
		this.state.set({ open: isOpen });
	}
}
