const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multiPart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const multiPartMiddleware = multiPart({ uploadDir: './uploads'});
app.post('/uploads', multiPartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json( {message: files} );
});

app.use((err, req, res, nest) => res.json( {error: err.message} ));

app.listen(8000, () => {
  console.log('Servidor porta 8000');
})
