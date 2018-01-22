import { Controller } from "stimulus";

const toBool: Function = (entry: string): boolean => entry == "true";
const test: Function = (prototypeToTestFor: string): Function => (
	variable: any
): boolean => variable.__proto__.constructor.name === prototypeToTestFor;
const testForBool: Function = (entry: string): boolean =>
	test("Boolean")(entry);
const testForNum: Function = (entry: string): boolean => test("Number")(entry);
const testForString: Function = (entry: any): boolean => test("String")(entry);

const uglify: Function = (entry: string) =>
	entry.replace(/\s+/g, "-").toLowerCase();

const registerDataInterface: Function = (
	Instance: Controller
): { get: Function; set: Function } => {
	const getAll: Function = (keys: string[] | boolean = false): object =>
		Object.entries(Instance.element.dataset)
			.map(([key, val]) => {
				return [key.replace(Instance.identifier, "").toLowerCase(), val];
			})
			.filter(([key]) => {
				return keys
					? keys.filter(k => k === key).length > 0
					: key !== "controller";
			})
			.reduce((acc, [key, val]) => {
				val = JSON.parse(val);
				if (testForString(val)) {
					acc[key] = testForBool(val)
						? toBool(val)
						: val.match(/.+,.+$/)
							? val
									.split(",")
									.map(
										e =>
											testForBool(e)
												? toBool(e)
												: testForNum(e) ? parseFloat(e) : e
									)
							: val;
				} else {
					acc[key] = val;
				}
				return acc;
			}, {});
	const set: Function = (dataObject: object = {}): void => {
		Object.entries(dataObject).forEach(([key, val]) =>
			Instance.data.set(key, JSON.stringify(val))
		);
	};
	const get: Function = (key: string): boolean | number | string | object => {
		if (!key || key === "") {
			return getAll();
		}
		if (typeof key == "object" && key.hasOwnProperty("length")) {
			return getAll(key);
		}
		const response = Instance.data.get(key);

		return testForBool(response)
			? toBool(response)
			: testForNum(response) ? parseFloat(response) : JSON.parse(response);
	};
	return { get, set };
};

export { registerDataInterface, toBool, uglify };
