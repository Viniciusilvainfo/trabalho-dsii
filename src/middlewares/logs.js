function mascara(obj = {}) {
  const SENSIVEIS = ["senha"];
  const body = { ...obj };
  for (const campo of SENSIVEIS) if (campo in body) body[campo] = "***";
  return body;
}

function logRequest(req, res, next) {
  res.on("finish", () => {
    const ip = req.ip;
    const metodo = req.method;
    const url = req.url;
    const status = res.statusCode;

    const body =
      req.body && Object.keys(req.body).length ? mascara(req.body) : null;

    console.log(`${metodo} ${url} - ${status} (${ip})`, body || "");
  });

  next();
}

export { logRequest };
