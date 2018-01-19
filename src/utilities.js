const toBool = string => string == "true";

const testForBool = string => string.search(/^true|false$/) >= 0;
const testForNum = string => string.search(/^[0-9]+(\.[0-9]+)?$/) >= 0;

// console.log(testForBool("true"), testForBool("false"));

const registerDataInterface = Interface => {
	const getAll = (keys = false) =>
		Object.entries(Interface.element.dataset)
			.map(([key, val]) => [
				key.replace(Interface.identifier, "").toLowerCase(),
				val
			])
			.filter(
				([key]) =>
					keys ? keys.filter(k => k === key).length > 0 : key !== "controller"
			)
			.reduce((acc, [key, val]) => {
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
				return acc;
			}, {});
	const set = (dataObject = {}) => {
		Object.entries(dataObject).forEach(([key, val]) =>
			Interface.data.set(key, val)
		);
	};
	const get = key => {
		if (!key || key === "") return getAll();
		if (typeof key == "object" && key.hasOwnProperty("length"))
			return getAll(key);
		const response = Interface.data.get(key);

		return testForBool(response)
			? toBool(response)
			: testForNum(response) ? parseFloat(response) : response;
	};
	return { get, set };
};

export { registerDataInterface, toBool };
