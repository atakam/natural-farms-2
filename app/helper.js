const Session = require('./domain/user/session');
const UserTable = require('./domain/user/table');

const setSession = ({ email, res, sessionid, role, userid, firstname }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionid) {
      sessionString = Session.sessionString({ email, id: sessionid });

      setSessionCookie({ sessionString, res });

      resolve({ message: 'session restored', role, userid, firstname });
    } else {
      session = new Session({ email });
      sessionString = session.toString();

      UserTable.updateSessionId({
        sessionid: session.id,
        email
      })
      .then(() => {
        setSessionCookie({ sessionString, res });

        resolve({ message: 'session created', role, userid, firstname });
      })
      .catch(error => reject(error));
    }
  });
}

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie('sessionString', sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true // use with https
  });
};

const authenticatedUser = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error('Invalid session');
  
      error.statusCode = 400;
  
      resolve({ user: null, authenticated: false, email: null });
    } else {
      const { email, id } = Session.parse(sessionString);
  
      UserTable.getUserByEmail({ email })
        .then(({results}) => {
          if (results.length) {
            const authenticated = results[0].sessionid === id;
            resolve({ user: results[0], authenticated, email });
          }
          else resolve({ user: null, authenticated: false, email: null });
        })
        .catch(error => reject(error));
    }
  });
};

module.exports = { setSession, authenticatedUser };