const express = require('express');
const app = express();
const port = 3000;

app.use('/examples', express.static('examples'));

app.get('/examples/{{a}}', (req, res) => {
    res.send(path.join(__dirname, 'examples', '{{a}}'));
});

app.use('/index.html', express.static('index.html'));
app.use('/index.js', express.static('index.js'));
app.use('/styles.css', express.static('styles.css'));

app.listen(port, () => {
    console.log(`Приложение запущено по адресу http://localhost:${port}/index.html`);
});
