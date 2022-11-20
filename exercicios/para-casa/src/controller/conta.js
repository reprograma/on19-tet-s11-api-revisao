const listaClientesBancarios = require('../models/contas-clientes.json')

const efetuaDeposito = (req, res) => {
  const idCliente = req.params.id
  const { deposito } = req.body

  const existeCliente = listaClientesBancarios.find(
    cliente => cliente.id == idCliente
  )

  if (existeCliente) {
    const realizaDeposito = {
      ...existeCliente.conta,
      saldo: existeCliente.conta.saldo + deposito
    }
    listaClientesBancarios.map((cliente, index) => {
      if (cliente.id == idCliente) {
        listaClientesBancarios[index].conta = realizaDeposito
      }
    })
    return res.status(202).json({
      message: 'Depósito efetuado com sucesso!',
      conta: realizaDeposito
    })
  }
  return res
    .status(404)
    .json({ message: 'Não é possível realizar depósito em conta inexistente' })
}

const efetuaPagamento = (req, res) => {
  const idCliente = req.params.id
  const { pagamento } = req.body

  const existeCliente = listaClientesBancarios.find(
    cliente => cliente.id == idCliente
  )

  if (existeCliente.conta.saldo >= pagamento) {
    const realizaPagamento = {
      ...existeCliente.conta,
      saldo: existeCliente.conta.saldo - pagamento
    }

    listaClientesBancarios.map((cliente, index) => {
      if (cliente.id == idCliente) {
        contasClientes[index].conta = realizaPagamento
      }
    })
    return res.status(200).json({
      message: 'Pagamento efetuado com sucesso!',
      conta: realizaPagamento
    })
  }
  return res.status(400).json({ messagem: 'Saldo insuficiente' })
}

module.exports = { efetuaDeposito, efetuaPagamento }
