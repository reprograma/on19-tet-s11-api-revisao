// - [IN PROGRESS] Fazer depósitos / pagamentos usando o saldo de sua conta

const contasClientes = require("../model/contas-clientes.json");

const deposito = (req, res) => {
  const idClienteContaCreditada = req.params.id;
  const { deposito } = req.body;

  const existeConta = contasClientes.find(
    (conta) => contasClientes.id == idClienteContaCreditada
  );
  if (existeConta) {
    const clienteSaldoAtualizado = {
      ...existeConta.conta,
      saldo: existeConta.conta.saldo + deposito,
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
}


//[IN PROGRESS]

 const pagamento = (req, res) => {
  const idClienteContaRealizaPagamento = req.params.id;
  const { valorPagamento } = req.body;
  

  const existeConta = contasClientes.find(
    (conta) => contasClientes.id == idClienteContaRealizaPagamento
  );
  if (existeConta.conta.saldo >= valorPagamento) {
    const pagamentoRealizado = {
      ...existeConta.conta,
      saldo: existeConta.conta.saldo - valorPagamento,
    };
    contasClientes.map((cliente, index) => {
      if (contasClientes.id == idClienteContaRealizaPagamento) {
        contasClientes.push({
          ...pagamentoRealizado,
        });
        
      }
    });
    
    return res.status(200).json({ 
      message: `Pagamento realizado com sucesso. Novo saldo R$ ${pagamentoRealizado.saldo.toFixed(2)}`, })
  
  }
  return;
  res.status(400).json({ message: "Saldo Insuficiente" });
};

module.exports = {
    deposito,
    pagamento
     }

