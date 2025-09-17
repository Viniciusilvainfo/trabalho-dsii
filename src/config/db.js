const db = [
  {
    id: 1,
    name: "Vinicius Fritzen Machado",
    username: "@vfmachado",
    role: "ADMIN", // tipo
    status: "ACTIVE",
    email: "vinicius.machado@riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 2,
    name: "Theodoro Araujo Fritzen",
    username: "@theo",
    role: "ADMIN", // tipo
    status: "DELETED",
    email: "vinicius.machado@riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 3,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },{
    id: 4,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },{
    id: 5,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },{
    id: 6,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },{
    id: 7,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 8,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 9,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 10,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 11,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
  {
    id: 12,
    name: "David Maiato",
    username: "@david",
    role: "VIEWER", // tipo
    status: "SUSÉNDED",
    email: "david.maioto@aluno.riogrande.ifrs.edu.br",
    createdAt: "2025-08-26",
    senha: "1234",
  },
];

export function select(filter = {}, options = {}) {
  let results = db.filter((user) =>
    Object.keys(filter).every(
      (key) => !filter[key] || user[key] === filter[key]
    )
  );

  if (options.sort) {
    results.sort((a, b) => {
      switch (options.sort) {
        case "O":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "A":
          return a.name.localeCompare(b.name);
        case "Z":
          return b.name.localeCompare(a.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  } else {
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (options.page && options.limit) {
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      data: paginatedResults,
      total: results.length,
      page: options.page,
      totalPages: Math.ceil(results.length / options.limit),
      limit: options.limit,
    };
  }

  return results;
}

export function insert(dados) {
  const dadosDB = select();

  dados.id = Math.max(...dadosDB.map((usuario) => usuario.id)) + 1;
  dados.createdAt = new Date().toISOString().split("T")[0];

  db.push(dados);
  return true;
}

export function selectUser(id) {
  return db.find((usuario) => usuario.id === Number(id));
}

export function edit(dados, id) {
  const indice = db.findIndex((usuario) => usuario.id === Number(id));

  db[indice] = { ...db[indice], ...dados };
  return true;
}

export function deleteUser(id) {
  const user = db.find((u) => u.id === Number(id));

  user.status = "DELETED";
  return true;
}
