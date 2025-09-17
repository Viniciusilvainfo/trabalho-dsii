import { Router } from "express";
import {
  mostraListaUsuarios,
  mostraCadastroUsuarios,
  exportaUsuarios,
  removeUsuarios,
  mostraEdicaoUsuarios,
  cadastroUsuarios,
  edicaoUsuarios,
} from "../controller/users-controller.js";

const usersRouter = Router();

usersRouter.get("/lista", mostraListaUsuarios);

usersRouter.get("/criar", mostraCadastroUsuarios);
usersRouter.post("/criar", cadastroUsuarios);

usersRouter.get("/:id/edit", mostraEdicaoUsuarios);
usersRouter.post("/:id/edit", edicaoUsuarios);

usersRouter.get("/:id/delete", removeUsuarios);

usersRouter.get("/exportar", exportaUsuarios);

export { usersRouter };
