const connection = require('../../../databasePool');
class UserTable {
  static addUser(user) {
    const {
      firstName,
      lastName,
      email,
      password,
      streetAddress,
      city,
      postalCode,
      province,
      phoneNumber,
      weekAmount,
      role
    } = user;

    const entry = {
      firstName,
      lastName,
      email,
      password,
      streetAddress,
      city,
      postalCode,
      province,
      phoneNumber,
      weekAmount,
      role,
      dateCreated: today()
    };
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', entry, function (error, results, fields) {
        if (error) return reject(error);
        resolve({results, fields});
        // resolve({ userid: response.rows[0].id});
        // Neat!
        console.log({results});
        console.log({fields});
      });
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

module.exports = UserTable;
