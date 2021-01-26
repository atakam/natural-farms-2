const UserTable = require('../domain/user/table');
const router = {};

router.login = (req, res, next) => {
    const { email, password } = req.body;

    MemberTable.getMemberByEmail({ email })
        .then((members) => {
        console.log("COUNT: ", members);
        if (members.length > 0 && members[0].password === hash(password)) {
            const { sessionid } = members[0];
        
            return setSession({ email, res, sessionid, role: members[0].memberrole, memberid: members[0].id, firstname: members[0].firstname });
        } else {
            return ({message: 'Incorrect email/password!', type: 'error'});
        }
        })
        .then(({ message, role, memberid, type, firstname }) => {
            if (type === 'error') res.json({ message, type });
            else res.json({ message, role, memberid, firstname });
        })
        .catch(error => {
            next(error);
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
    authenticatedMember({ sessionString: req.cookies.sessionString })
        .then(({ authenticated, member }) => {
        authenticated ? res.json({ authenticated, role: member.memberrole, memberid: member.id, firstname: member.firstname }) :
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