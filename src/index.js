import "babel-polyfill";
import { Application } from "stimulus";
import TodoController from "./controllers/todo_controller";

const app = Application.start();

app.register("todo", TodoController);
