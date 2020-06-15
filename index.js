const server = require("./api/server");

const PORT = 4000;

server.listen(PORT, () => console.log(`\nAPI is running on port: ${PORT}\n`));
