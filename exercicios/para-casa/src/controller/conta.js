const listaDeClientes = require('../model/contas-clientes.json')


// - Fazer depósitos / pagamentos usando o saldo de sua conta - DONE
const depositoCliente = (req, res) => {
  const IDCliente = req.params.id;
  const deposito = req.query;

  const cliente = listaDeClientes.find((cliente) => cliente.id == IDCliente);

  if (cliente) {
    listaDeClientes.map((cliente) => {
      const valorDeposito = +Object.values(deposito);
      if (valorDeposito <= 0) {
        return res.json({ message: `Valor inválido.` });
      }
      return (cliente.conta.saldo += valorDeposito).toFixed(2);
    });
    return res.status(200).json({
      message: `Depósito realizado com sucesso`,
    });
  }

  return res.status(404).json({ message: `Cliente não encontrado.` });
};

const pagamentoCliente = (req, res) => {
  const IDCliente = req.params.id;
  const pagamento = req.query;

  const cliente = listaDeClientes.find((cliente) => cliente.id == IDCliente);

  if (cliente) {
    listaDeClientes.map((cliente) => {
      const valorPagamento = +Object.values(pagamento);
      if (cliente.conta.saldo < valorPagamento) {
        return res.json({ message: `Saldo insuficiente.` });
      }
      return (cliente.conta.saldo -= valorPagamento).toFixed(2);
    });

    return res.status(200).json({
      message: `Pagamento realizado com sucesso`,
    });
  }

  return res.status(404).json({ message: `Cliente não encontrado.` });
};


module.exports = {
  depositoCliente,
  pagamentoCliente,
};
