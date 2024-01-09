import App from "./app";
import AuthRoute from "./routes/auth.route";
import CarRoute from "./routes/car.route";
import MediaRoute from "./routes/media.route";

const app = new App([new AuthRoute(), new CarRoute(), new MediaRoute()]);

app.listen();
