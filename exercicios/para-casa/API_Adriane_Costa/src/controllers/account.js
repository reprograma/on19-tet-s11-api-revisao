const clientsBankAccount = require("../model/modified-structure-clients-bank-account.json");

const updateAccountType = (req, res) => {
  const clientID = req.params.id;
  const { conta: { tipo: { tipo_conta } } } = req.body;

  if (tipo_conta != "corrente" && tipo_conta != "poupança" && tipo_conta != "investimento") {
    return res.status(400).res.json({ message: "tipo de conta não definidada" });
  };
  const userIndex = clientsBankAccount.findIndex(user => user.id === clientID);

  if (userIndex) {
    const findClient = clientsBankAccount[userIndex];
    const updateAccount = {
      ...findClient,
      conta: {
        numero: findClient.conta.numero,
        tipo: {
          tipo_conta: tipo_conta,
          transacao_entrada: findClient.conta.tipo.transacao_entrada,
          transacao_saida: findClient.conta.tipo.transacao_saida
        },
        saldo: findClient.conta.saldo,
        data_criacao: findClient.conta.data_criacao
      }
    };

    clientsBankAccount.splice(userIndex, 1, updateAccount);

    return res.status(200).json({
      message: `conta atualizada`,
      updateAccount
    });
  };
};

const updateBankBalance = (req, res) => {
  const clientID = req.params.id;
  let { conta: { tipo: { transacao_entrada, transacao_saida } } } = req.body;

  let index = clientsBankAccount.findIndex(client => client.id == clientID);

  if (index == -1) {
    return res.status(404).json({ message: "conta não existe" });
  };

  const updateBankAccount = {
    ...clientsBankAccount[index],
    conta: {
      numero: clientsBankAccount[index].conta.numero,
      tipo: {
        tipo_conta: clientsBankAccount[index].conta.tipo.tipo_conta,
        transacao_entrada: transacao_entrada,
        transacao_saida: transacao_saida
      },
      saldo: clientsBankAccount[index].conta.saldo,
      data_criacao: clientsBankAccount[index].conta.data_criacao
    }
  };

  clientsBankAccount.splice(index, 1, updateBankAccount);

  if (transacao_entrada || transacao_saida) {
    let currentBankBalance = clientsBankAccount[index].conta.saldo;
    let newIncomingBankBalance = currentBankBalance + clientsBankAccount[index].conta.tipo.transacao_entrada;
    clientsBankAccount[index].conta.saldo = newIncomingBankBalance;

    if (clientsBankAccount[index].conta.saldo >= clientsBankAccount[index].conta.tipo.transacao_saida) {
      let newOutgoingBankBalance = clientsBankAccount[index].conta.saldo - clientsBankAccount[index].conta.tipo.transacao_saida;
      clientsBankAccount[index].conta.saldo = newOutgoingBankBalance;
    } else {
      return res.status(400).json({ message: "má solicitação" });
    };
  };

  return res.status(200).json(clientsBankAccount[index]);
};

module.exports = {
  updateAccountType, updateBankBalance
}