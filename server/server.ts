import app from "./src/app";

const portValue = process.env.PORT;

if (!portValue) {
	throw new Error("PORT is not set in the environment");
}

const port = Number(portValue);

if (Number.isNaN(port)) {
	throw new Error("PORT must be a number");
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
