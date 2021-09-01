import express from "express";
//to handle async errors
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@talent-org/common";

import { createEmployeeRouter } from './routes/new';
import { showEmployeeRouter } from './routes/show';
import { indexEmployeeRouter } from './routes';
import { updateEmployeeRouter } from './routes/update';

const app = express();
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

app.use(createEmployeeRouter);
app.use(showEmployeeRouter);
app.use(indexEmployeeRouter);
app.use(updateEmployeeRouter);

app.all("*", () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
