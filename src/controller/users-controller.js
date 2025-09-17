import { select, insert, selectUser, edit, deleteUser } from "../config/db.js";

export function mostraListaUsuarios(req, res) {
  const filtros = req.query;
  const filter = {};
  const options = {};

  if (filtros.status && filtros.status != "") filter.status = filtros.status;

  if (filtros.name && filtros.name != "") filter.name = filtros.name;

  if (filtros.role && filtros.role != "") filter.role = filtros.role;

  if (filtros.sort && filtros.sort != "") options.sort = filtros.sort;

  const page = parseInt(filtros.page) || 1;
  const limit = parseInt(filtros.limit) || 10;
  options.page = page;
  options.limit = limit;

  const resultado = select(filter, options);

  res.render("users-lista", {
    dados: resultado.data || resultado,
    total: resultado.total || resultado.length,
    currentPage: page,
    totalPages: resultado.totalPages || 1,
    limit: limit,
    status: filtros.status,
    name: filtros.name,
    role: filtros.role,
    sort: filtros.sort || "",
  });
}

export function mostraCadastroUsuarios(req, res) {
  const dados = select();
  res.render("users-cadastrar", { dados });
}

export function cadastroUsuarios(req, res) {
  const { name, email, role, status, senha, username } = req.body;

  insert({ name, email, role, status, senha, username });
  res.redirect("/users/lista");
}

export function edicaoUsuarios(req, res) {
  const { name, email, role, status, username } = req.body;

  edit({ name, email, role, status, username }, req.params.id);
  res.redirect("/users/lista");
}

export function mostraEdicaoUsuarios(req, res) {
  const user = selectUser(req.params.id);
  res.render("users-editar", { user });
}

export function removeUsuarios(req, res) {
  deleteUser(req.params.id);
  res.redirect("/users/lista");
}

export function exportaUsuarios(req, res) {
  try {
    const usuarios = select();
    let csv = "ID,Name,Username,Role,Status,Email,Created At\n";

    usuarios.forEach((usuario) => {
      csv += `${usuario.id},"${usuario.name}","${usuario.username}",${usuario.role},${usuario.status},"${usuario.email}",${usuario.createdAt}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=usuarios.csv");
    res.send(csv);
  } catch (error) {
    console.error("Erro ao exportar:", error);
    res.status(500).send("Erro na exportação");
  }
}
