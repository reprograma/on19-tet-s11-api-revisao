const clientList = require('../model/contas-clientes.json')



const clientDeposit = (req, res) => {
  const clientID = req.params.id;
  const deposit = req.query;

  const client = clientList.find((client) => client.id == clientID);

  if (client) {
    clientList.map((client) => {
      const depositedValue = +Object.values(deposit);
      if (depositedValue <= 0) {
        return res.json({ message: `Invalid value.` });
      }
      return (client.account.balance += depositedValue).toFixed(2);
    });
    return res.status(200).json({
      message: `Deposit made.`,
    });
  }

  return res.status(404).json({ message: `Client not found.` });
};

const clientPayment = (req, res) => {
  const clientID = req.params.id;
  const payment = req.query;

  const client = clientList.find((client) => client.id == clientID);

  if (client) {
    clientList.map((cliente) => {
      const paymentValue = +Object.values(payment);
      if (client.account.balance < paymentValue) {
        return res.json({ message: `Insufficient balance.` });
      }
      return (client.account.balance -= paymentValue).toFixed(2);
    });

    return res.status(200).json({
      message: `Payment realied with success.`,
    });
  }

  return res.status(404).json({ message: `Client not found.` });
};


module.exports = {
  depositClient: clientDeposit,
  clientPayments: clientPayment,
};
