/*const create = (req, res) => {
  return res.send("ola mundo")
}
const show = (req, res) => {}
const index = (req, res) => {}
const update = (req, res) => {}
const destroy = (req, res) => {}

module.exports = {
  create,
  show,
  index,
  update,
  destroy
}*/

const listaClientesBanco = require('../model/contas-clientes.json')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const criaCliente = (req, res) => {
  const {
    nome_cliente,
    cpf_cliente,
    data_nascimento,
    conta: { tipo }
  } = req.body

  const clienteUnico = listaClientesBanco.find(
    cliente => cliente.cpf_cliente == cpf_cliente
  )

  if (!clienteUnico) {
    const novoCliente = {
      id: uuidv4(),
      nome_cliente: nome_cliente,
      cpf_cliente: cpf_cliente,
      data_nascimento: data_nascimento,
      conta: {
        numero: Math.random(),
        tipo: tipo,
        saldo: 0,
        data_criacao: moment().format('l')
      }
    }
    listaClientesBanco.push(novoCliente)
    return res.status(201).json(novoCliente)
  }
  return res.status(404).json({
    mensagem: 'Cliente já existe'
  })
}

module.exports = {
  criaCliente
}
