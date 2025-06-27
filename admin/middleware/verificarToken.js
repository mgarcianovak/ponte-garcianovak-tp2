//verifico si el toquen recivido coincide con el esperado 
function verificarToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });

    req.admin = decoded;
    next();
  });
}