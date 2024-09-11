import express from "express";
import cors from "cors";
import { router } from "./router/router";
import path from "path";

const app = express();
const port = 3000;

app.use(cors());
app.use(router);

// Middleware para servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Ruta para tu API en el backend
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Ruta para manejar cualquier otro endpoint y servir el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };

// import express from "express";
// import cors from "cors";
// import { router } from "./router/router";

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(router);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// export { app };
