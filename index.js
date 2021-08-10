const express = require("express");
const faker = require("faker");
const PORT = process.env.PORT || 5000;

const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization !== "Bearer L7OijysEwFvgFWWzSBTfe") {
    // emulate authentication
    res.statusCode = 401;
    return res.send();
  }
  next();
};

const requireRecipientId = (req, res, next) => {
  const { recipientId } = req.query;

  if (!recipientId) {
    res.statusCode = 400;
    res.body = "Recipient ID required";
    return res.send();
  }

  next();
};

express()
  .get("/", authorize, requireRecipientId, (req, res) => {
    const { recipientId } = req.query;

    // normally you'd do some "real" lookup here

    return res.send({
      recipientId,
      company: {
        name: faker.name.findName(),
        address_1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      usage: {
        views: faker.datatype.number(100000),
        sends: faker.datatype.number(100000),
      },
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
