const uuid = require('uuid/v4');
const { hash } = require('./helper');

const SEPARATOR = '|';

class Session {
  constructor({ email }) {
    this.email = email;
    this.id = uuid();
  }

  toString() {
    const { email, id } = this;

    return Session.sessionString({ email, id });
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      email: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  static verify({ email, id, sessionHash }) {
    const accountData = Session.accountData({ email, id });
    console.log({email, id, sessionHash, accountData,  h: hash(accountData)});

    return hash(accountData) === sessionHash;
  }

  static accountData({ email, id }) {
    return `${email}${SEPARATOR}${id}`;
  }

  static sessionString({ email, id }) {
    const accountData = Session.accountData({ email, id });

    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}

module.exports = Session;