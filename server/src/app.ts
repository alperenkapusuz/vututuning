import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { Routes } from "./interfaces/routes.interface";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT;
    this.initalizeMiddlewares();
    this.initializeRoutes(routes);
    this.mongooseConnection();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=========================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=========================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initalizeMiddlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('public'))
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private mongooseConnection() {
    mongoose.connect("mongodb://localhost:27017/mern-ts").then(() => {
      console.log(`=========================================`);
      console.log(`🚀 MONGOOSE CONNECT SUCCES`);
      console.log(`=========================================`);
    });
  }
}

export default App;
