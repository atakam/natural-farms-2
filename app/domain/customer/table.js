const connection = require('../../../databasePool');

class CustomerTable {
  static addCustomer(customer) {
    const {
      firstname,
      lastname,
      email,
      password,
      streetaddress,
      city,
      postal,
      province,
      phone,
      amount
    } = customer;

    const entry = {
      firstname,
      lastname,
      email,
      password,
      streetaddress,
      city,
      postal,
      province,
      phone,
      amount,
      role: 3,
      dateCreated: today()
    };
    return new Promise((resolve, reject) => {
      connection.connect();
      connection.query('INSERT INTO posts SET ?', entry, function (error, results, fields) {
        if (error) return reject(error);
        resolve({results, fields});
        // resolve({ customerid: response.rows[0].id});
        // Neat!
        console.log({results});
        console.log({fields});
      });
      connection.end();
    });
  }
}

function today() {
  var ntoday = new Date();
  var dd = String(ntoday.getDate()).padStart(2, '0');
  var mm = String(ntoday.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = ntoday.getFullYear();

  ntoday = mm + '/' + dd + '/' + yyyy;
  return ntoday;
}

module.exports = CustomerTable;
