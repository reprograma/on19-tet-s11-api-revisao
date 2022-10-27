// - [IN PROGRESS] Fazer depósitos / pagamentos usando o saldo de sua conta

const contasClientes = require("../model/contas-clientes.json");
const saldo = 0


const deposito = (req, res) => {
  const idClienteContaCreditada = req.query.id;
  const valorDeposito = 1000;
  const saldo = req.body;

  const existeConta = contasClientes.find(
    (conta) => contasClientes.id == idClienteContaCreditada
  );
  if (existeConta) {
    const clienteSaldoAtualizado = {
      ...existeConta.conta,
      saldo: saldo.conta.saldo + valorDeposito,
    };
    contasClientes.map((cliente, index) => {
      if (contasClientes.id == idClienteContaCreditada) {
        contasClientes.push({
          ...clienteSaldoAtualizado,
          
        });
      }
    });

    return res.status(200).json({ clienteSaldoAtualizado });
  }
  return;
  res.status(404).json({ message: "Cliente não identificado" });
};

//[IN PROGRESS]

 const pagamento = (req, res) => {
  const cpfClienteContaRealizaPagamento = req.query.cpf_cliente;
  const valorPagamento = 3000;
  const saldo = req.body;

  const existeConta = contasClientes.find(
    (conta) => contasClientes.cpf_cliente == cpfClienteContaRealizaPagamento
  );
  if (existeConta.conta.saldo >= valorPagamento) {
    const pagamentoRealizado = {
      ...existeConta.conta,
      saldo: saldo.conta.saldo - valorPagamento,
    };
    contasClientes.map((cliente, index) => {
      if (contasClientes.cpf_cliente == cpfClienteContaRealizaPagamento) {
        contasClientes.push({
          ...pagamentoRealizado,
        });
      }
    });

    return res.status(200).json({ 
      message: `Pagamento realizado com sucesso. Saldo R$ ${pagamentoRealizado.saldo.toFixed(2)}`, })
  
  }
  return;
  res.status(404).json({ message: "Saldo Insuficiente" });
};

module.exports = {
    deposito,
    pagamento
     }

