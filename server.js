const app = require('./app');
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

const connection = require('./databasePool');
connection.connect();
const query = connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) return console.error(`Error Database connection: ${error}`);
    
    console.error(`Database connection: Connected`);
});
console.log(query.sql);
connection.end();