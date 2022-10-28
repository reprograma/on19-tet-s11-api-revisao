// - [DONE] Fazer depósitos / pagamentos usando o saldo de sua conta

const contasClientes = require("../model/contas-clientes.json");

const deposito = (req, res) => {
  const idCliente = req.params.id;
  const deposito = 1000000;
  const {saldo} = req.body
  

  const existeConta = contasClientes.find(
    (conta) => conta.id == idCliente
  );
  if (existeConta) {
    const clienteSaldoAtualizado = {
      ...existeConta.conta,
      saldo: saldo + deposito,
    };
    contasClientes.map((cliente, index) => {
      if (contasClientes.id == idCliente) {
        contasClientes.push({
          ...clienteSaldoAtualizado,
          
        });
        
      }
    });
    

    return res.status(200).json({ clienteSaldoAtualizado });
  }

  return res.status(404).json({ message: "Cliente não identificado" });
}


//[DONE]

 const pagamento = (req, res) => {
  const idCliente = req.params.id;
  const valorPagamento = 8000;
  const {saldo} = req.body
  

  const existeConta = contasClientes.find(
    (conta) => conta.id == idCliente
  );
  if (existeConta.conta.saldo >= valorPagamento) {
    const pagamentoRealizado = {
      ...existeConta.conta,
      saldo: saldo - valorPagamento,
    };
    contasClientes.map((cliente, index) => {
      if (contasClientes.id == idCliente) {
        contasClientes.push({
          ...pagamentoRealizado,
        });
        
      }
    });
    
    return res.status(200).json({ 
      message: `Pagamento realizado com sucesso. Novo saldo R$ ${pagamentoRealizado.saldo.toFixed(2)}`, })
  
  }
  return res.status(400).json({ message: "Saldo Insuficiente" });
};

module.exports = {
    deposito,
    pagamento
     }

