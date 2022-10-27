const listaClientesBancarios = require('../models/contas-clientes.json')
const { v4: uuidv4 } = require('uuid')

const listaClientes = (req, res) => {
  res.send(listaClientesBancarios)
}

const listaCliente = (req, res) => {
  const id = req.params.id

  const detalhesCliente = listaClientesBancarios.filter(
    (item, index) => item.id == id
  )
  res.json(detalhesCliente)
}

const adicionaCliente = (req, res) => {
  const {
    nome_cliente,
    cpf_cliente,
    data_nascimento,
    conta: { tipo, saldo }
  } = req.body
  const numeroConta = Math.floor(Math.random() * 5000000)
  const existeCPF = listaClientesBancarios.find(
    cliente => cliente.cpf_cliente == cpf_cliente
  )

  if (existeCPF) {
    return res
      .status(400)
      .json({ message: 'Existe uma conta cadastrada com esse CPF' })
  }
  const novoCliente = {
    id: uuidv4(),
    nome_cliente,
    cpf_cliente,
    data_nascimento,
    conta: {
      numero: numeroConta,
      tipo,
      saldo,
      data_criacao: new Date()
    }
  }
  listaClientesBancarios.push(novoCliente)
  return res.status(201).json(novoCliente)
}

const atualizaCliente = (req, res) => {
  const idCliente = req.params.id
  const {
    telefone,
    endereco: { rua, cidade, estado, pais }
  } = req.body

  const existeCliente = listaClientesBancarios.find(
    cliente => cliente.id == idCliente
  )

  if (existeCliente) {
    const clienteAtualizado = {
      ...existeCliente,
      telefone,
      endereco: {
        rua,
        cidade,
        estado,
        pais
      }
    }

    listaClientesBancarios.map((cliente, index) => {
      if (cliente.id == idCliente) {
        listaClientesBancarios[index] = clienteAtualizado
      }
    })
    return res.status(200).json({
      message:
        'Dados do cliente ${existeCliente.nome_cliente} atualizados com sucesso!'
    })
  }
  return res.status(404).json({ message: 'Cliente não encontrado!!' })
}

const deletaCliente = (req, res) => {
  const idCliente = req.params.id
  const existeCliente = listaClientesBancarios.find(
    cliente => cliente.id == idCliente
  )

  if (existeCliente) {
    listaClientesBancarios.map((cliente, index) => {
      if (cliente.id == idCliente) {
        listaClientesBancarios.splice(index, 1)
      }
    })
    return res
      .status(200)
      .json({
        message:
          'O cliente ${existeCliente.nome_cliente} foi deletado com sucesso!'
      })
  }
  return res.status(404).json({ message: 'Cliente não encontrado!!' })
}

module.exports = {
  listaClientes,
  listaCliente,
  adicionaCliente,
  atualizaCliente,
  deletaCliente
}
