import express from "express";
import cors from 'cors';
//to handle async errors
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@talent-org/common";

import { createEmployeeRouter } from './routes/new';
import { showEmployeeRouter } from './routes/show';
import { indexEmployeeRouter } from './routes';
import { searchEmployeeRouter } from './routes/search';
import { updateEmployeeRouter } from './routes/update';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

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
//using currentUser middleware for authorization purpose since create and update routes will be accessed by authorized users only
app.use(currentUser);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(createEmployeeRouter);
app.use(showEmployeeRouter);
app.use(indexEmployeeRouter);
app.use(searchEmployeeRouter);
app.use(updateEmployeeRouter);

app.all("*", () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
