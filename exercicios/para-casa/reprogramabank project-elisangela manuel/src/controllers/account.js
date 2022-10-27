const moment = require("moment");
const clientsBankAccount = require("../model/modified-structure-clients-bank-account.json");

const updateAccountType = (req, res) => {
  const clientID = req.params.id
  let newAccount = req.body
  const userIndex = clientsBankAccount.findIndex(user => user.id === clientID)

  if (userIndex) {
    const clientFind = clientsBankAccount[userIndex]

    const typeUpdate = {
      ...clientFind,
      ...newAccount
    }

    clientsBankAccount.splice(userIndex, 1, typeUpdate)

    return res.status(200).json({
      message: `Data has been updated`,
    });
  }

};

const updateBankBalance = (req, res) => {
  const clientCpf = req.params.cpf;
  let { bankAccount } = req.body
  bankAccount = req.body

  let index = clientsBankAccount.findIndex(client => client.cpf_cliente == clientCpf)

  if (index == -1) {
    return res.status(404).json({ message: "Account not exist" });
  }

  let updateBankAccount = {
    ...clientsBankAccount[index],
    ...bankAccount
  }

  clientsBankAccount.splice(index, 1, updateBankAccount)

  function updateBankBalance(saldo) {
    if (bankAccount) {
      let currentBankBalance = saldo;
      let newIncomingBankBalance = currentBankBalance + clientsBankAccount[index].conta.tipo.transacao_entrada;
      clientsBankAccount[index].conta.saldo = newIncomingBankBalance;

      if (clientsBankAccount[index].conta.saldo >= clientsBankAccount[index].conta.tipo.transacao_saida) {
        let newOutgoingBankBalance = clientsBankAccount[index].conta.saldo - clientsBankAccount[index].conta.tipo.transacao_saida
        clientsBankAccount[index].conta.saldo = newOutgoingBankBalance
      } else {
        return res.status(400).json({ message: "Bad request. Please, check your bank balance" });
      }
    }
  }
  updateBankBalance(clientsBankAccount[index].conta.saldo);

  return res.status(200).json(clientsBankAccount[index]);
};

module.exports = {
  updateAccountType, updateBankBalance
}