import * as http from "http";
import router from "./router";

const PORT = 3000;


const server = http.createServer((req, res) => {
// Middleware pour gérer CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Autorise uniquement le frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Vérification si c'est une requête OPTIONS (pré-vol)
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // Pas de contenu, mais autorisé
    res.end();
    return;
  }
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
