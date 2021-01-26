const CustomerTable = require('../domain/customer/table');
const router = {};

router.newCustomer = (req, res, next) => {
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
        weekAmount
     } = req.body;

    const customer = {
        firstName,
        lastName,
        email,
        password,
        streetAddress,
        city,
        postalCode,
        province,
        phoneNumber,
        weekAmount
    };
    console.log({customer});

    CustomerTable.addCustomer(customer)
    .then(({ customerid }) => {
        customer.customerid = customerid;
        res.json({
            message: 'successfully added customer',
            customer,
            body: req.body
        });
    })
    .catch(error => next(error));
}

module.exports = router;