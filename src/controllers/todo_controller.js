import { Controller } from "stimulus";
import { registerDataInterface, toBool, uglify } from "../utilities";

export default class Todo extends Controller {
	state = registerDataInterface(this);
	initialize() {
		this.state.set({ todos: [], text: "" });
	}
	createHTML({ text, key }) {
		const textNoQuotes = text.replace(/\"/g, "");
		const textCapitalized = `${[
			...textNoQuotes
		][0].toUpperCase()}${textNoQuotes.substr(
			1,
			textNoQuotes.length - 1
		)}`.replace(/\s/g, "");
		return `<tr data-target="todo.todoListItem${textCapitalized}">
			<td><input type="checkbox" id="${key}" name="${textCapitalized}" data-action="change->todo#remove"></td>
			<td>${textNoQuotes}</td>
		</tr>`;
	}
	add(e) {
		e.preventDefault();
		const { text = false, todos } = this.state.get(["text", "todos"]);
		const key = uglify(text);

		if (text) {
			this.todoTable.innerHTML += this.createHTML({
				text,
				key
			});

			const newTodos = [...todos];
			newTodos.push({ key, text });
			this.state.set({ todos: newTodos, text: "" });

			this.todoForm.reset();
			this.todoText.focus();
		}
	}
	remove(e) {
		const { todos } = this.state.get(["todos"]);
		const removedTodoListItem = this.todoListItem(e.target.name);

		removedTodoListItem.remove();

		const newTodos = [...todos];
		const [removedTodoListItemIndex] = newTodos
			.map((todo, index) => {
				if (todo.key == e.target.id) {
					return index;
				} else {
					return false;
				}
			})
			.filter(todo => todo);

		newTodos.splice(removedTodoListItemIndex, 1);
		this.state.set({ todos: newTodos });
	}
	updateTodoText({ target }) {
		this.state.set({ text: target.value });
	}
	todoListItem(id) {
		return this.targets.find(`todoListItem${id}`);
	}
	logState() {
		console.log(this.state.get(["todos"]));
	}
	get todoForm() {
		return this.targets.find("todoForm");
	}
	get todoText() {
		return this.targets.find("todoText");
	}
	get todoCategory() {
		return this.targets.find("todoCategory");
	}
	get todoList() {
		return this.targets.find("todoList");
	}
	get todoTable() {
		return this.targets.find("todoTable");
	}
}
