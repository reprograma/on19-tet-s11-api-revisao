const listaClientes = require('../model/contas-cliente.json');

const deposito = (req, res) => {
    const { deposito } = req.body;
    const IDCliente  = req.params.id;

    const acharCliente = listaClientes.find((cliente) => cliente.id == IDCliente)

    if(acharCliente) {
      const opDeposito = {
        ...acharCliente.conta,
        saldo:acharCliente.conta.saldo + deposito,
      }
      listaClientes.map((cliente, index) =>{
        if (cliente.id == IDCliente){
          return listaClientes[index] = opDeposito
    }
    })
    return res.status(200).json(acharCliente)
  }
    return res.status(404).json("O depósito não foi realizado ");
  }

  const pagamento = (req, res) => {
   const pagamentos = req.body
   const IDCliente = req.params.id

   const acharCliente = listaClientes.find((cliente) => cliente.id == IDCliente)
   const valorBoleto = -250
   if(acharCliente2){
    const realizarPagamento = {
      ...acharCliente.conta,
      saldo:acharCliente.conta.saldo - valorBoleto
    }

    listaClientes.map((cliente, index) =>{
      if (cliente.id == IDCliente){
      return (listaClientes[index].conta = realizarPagamento)
      }
    })

    return res.status(200).json(acharCliente2.conta.saldo)
   }
   return res.status(404).json("Saldo Insuficiente")
  }

  module.exports = {deposito, pagamento}