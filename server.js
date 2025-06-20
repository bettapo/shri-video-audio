const express = require('express');
const app = express();
const port = 3000;

app.use('/examples', express.static('examples'));

app.get('/examples/{{a}}', (req, res) => {
    res.send(path.join(__dirname, 'examples', '{{a}}'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
