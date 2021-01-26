const { Router } = require('express');
const CustomerTable = require('../domain/customer/table');

const router = new Router();

router.post('/new', (req, res, next) => {
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
     } = req.body;

    const customer = {
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
    };

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
    
});

module.exports = router;