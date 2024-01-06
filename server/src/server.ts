import App from "./app";
import AuthRoute from "./routes/auth.route";
import CarRoute from "./routes/car.route";

const app = new App([new AuthRoute(), new CarRoute()]);

app.listen();
