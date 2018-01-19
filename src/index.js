import "babel-polyfill";
import { Application } from "stimulus";
import AppController from "./controllers/app_controller";
import ModalController from "./controllers/modal_controller";

// const AppController = import("./controllers/app_controller.js");

const app = Application.start();

app.register("app", AppController);
app.register("modal", ModalController);
