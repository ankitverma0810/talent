import express from "express";
import cors from 'cors';
//to handle async errors
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@talent-org/common";

import { createPerformanceRouter } from "./routes/new";
import { updatePerformanceRouter } from "./routes/update";
import { showPerformanceRouter } from "./routes/show";

const app = express();
app.use(cors());
//enabling proxy. express is aware that it's behind a proxy of ingress ngingx and to make sure that it should still trust traffic as being secure even though it's coming from that proxy.
app.set("trust proxy", true);
app.use(json());
// configuring cookieSession. Don't encrypt the cookie and ony use cookies if user visit our application over an HTTPS connection.
app.use(
	cookieSession({
		signed: false,
		//secure: process.env.NODE_ENV !== 'test'
	})
);
//using currentUser middleware for authorization purpose since create and update ticket routes will be accessed by authorized users only
app.use(currentUser);

app.use(showPerformanceRouter);
app.use(createPerformanceRouter);
app.use(updatePerformanceRouter);


app.all("*", () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
