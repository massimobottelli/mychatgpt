const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const file = 'example.txt';
  const filepath = __dirname + '/' + file;

  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('File not found');
      return res.end();
    }

    res.setHeader('Content-disposition', `attachment; filename="${file}"`);
    res.setHeader('Content-type', 'text/plain');
    res.write(data);
    return res.end();
  });
}).listen(3000);
