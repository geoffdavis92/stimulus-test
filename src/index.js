import "babel-polyfill";
import { Application } from "stimulus";
// import AppController from "./controllers/app_controller";
// import ModalController from "./controllers/modal_controller";
import TodoController from "./controllers/todo_controller";

const app = Application.start();

// app.register("app", AppController);
// app.register("modal", ModalController);
app.register("todo", TodoController);
