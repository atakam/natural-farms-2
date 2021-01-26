const UserTable = require('../domain/user/table');
const { setSession, authenticatedUser } = require('../helper');
const router = {};

router.login = (req, res, next) => {
    const { email, password } = req.body;

    UserTable.getUserByEmail({ email })
        .then(({results}) => {
            console.log("COUNT: ", results.length);
            if (results.length > 0 && results[0].password === password) {
                const { sessionid } = results[0];
            
                return setSession({ email, res, sessionid, role: results[0].role, userid: results[0].id, firstname: results[0].firstName });
            } else {
                return ({message: 'Incorrect email/password!', type: 'error'});
            }
        })
        .then(({ message, role, userid, type, firstname }) => {
            console.log({ message, role, userid, type, firstname });
            if (type === 'error') res.json({ message, type });
            else res.json({ message, role, userid, firstname });
        })
        .catch(error => {
            res.json({error});
        });
}

router.logout = (req, res, next) => {
    const { email } = Session.parse(req.cookies.sessionString);

    MemberTable.updateSessionId({
        sessionId: null,
        email
    }).then(() => {
        res.clearCookie('sessionString');

        res.json({ message: 'Successful logout' });
    }).catch(error => next(error));
}

router.authenticated = (req, res, next) => {
    console.log({req});
    authenticatedUser({ sessionString: req.cookies.sessionString })
        .then(({ authenticated, user }) => {
        authenticated ? res.json({ authenticated, role: user.role, memberid: member.id, firstname: member.firstName }) :
        res.json({authenticated: false});
        })
        .catch(error => next(error));
}

router.newUser = (req, res, next) => {
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
     } = req.body;

    const user = {
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
    };

    UserTable.addUser(user)
    .then(({ userid }) => {
        user.userid = userid;
        res.json({
            message: 'successfully added user',
            user,
            body: req.body
        });
    })
    .catch(error => res.json({
        message: 'error while adding user',
        error: error.code,
        errorMessage: error.sqlMessage
    }));
}

module.exports = router;