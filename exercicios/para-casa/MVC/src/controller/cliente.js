// CRUD - cliente
//número uuid ID:
const {v4: uuidv4} = require('uuid');
const valorID = uuidv4();
//Data
const moment = require('moment');
//chamar lista de clientes:
const listaDeClientes = require("../model/contas-clientes.json")

// >>> [X] Criar os clientes do banco: (POST - cria um recurso novo)
const create = (req, res) => {
    const {nome_cliente, cpf_cliente, data_nascimento, conta} = req.body;

    const temCliente = listaDeClientes.find(cliente => cliente.cpf_cliente == cpf_cliente)

    if (temCliente) {
        return res.status(400).json({
            message: "O cliente " + nome_cliente + " com o cpf: " + cpf_cliente + " já está cadastrado."
        })
    }    
    const novoClienteComID = {
        id: valorID,
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta:{
            numero: Math.random()* 100000000,
            tipo: conta.tipo,
            saldo: 0,
            data_criacao: moment().format('L'),
        }
    }
    listaDeClientes.push(novoClienteComID)

    res.status(201).json({ // 201 criado
        message: `Novo cliente: ${nome_cliente}, cadastrado com sucesso!`,
        listaAtual: listaDeClientes
    })
}

//>>> [X] - Conseguir Filtrar os clientes do banco pelo seu nome,por saldo... - ( GET ) 
const read = (req, res) => {
    const filtroNome = req.query.nome
    const filtroSaldo = req.query.saldo

    const clientePesquisado = listaDeClientes.filter((cliente, index) => {
       if (filtroNome) {
            return cliente.nome_cliente.toLowerCase().includes(filtroNome.toLowerCase())
       }
       if (filtroSaldo) {
           return cliente.conta.saldo == filtroSaldo
       }
       return cliente
    })
    
    if(!clientePesquisado){
       res.status(400).json({
           message: "Não localizado"
       })
    }
    res.status(200).json(clientePesquisado)
}

//>>> [X] Atualizar informações desses clientes ( PATCH )
const update = (req, res) => {
    const IDcliente = req.params.id
    const {nome_cliente, telefone, rua, numero, bairro, CEP, tipo} = req.body


    const existeCliente = listaDeClientes.find(cliente => cliente.id == IDcliente)

    if (existeCliente) {
        const AddNovosCamposCliente = {
            ...existeCliente,
            nome_cliente,
            telefone,
            endereco: {
                rua: rua,
                numero: numero,
                bairro: bairro,
                CEP: CEP,
                tipo: tipo,
            },
        }
        
        listaDeClientes.map((cliente, index) => {
            if (cliente.id == IDcliente) {
                listaDeClientes[index] = AddNovosCamposCliente
            }
        })
        return res.status(200).json({
            message: "Cliente Atualizado!",
            cliente: AddNovosCamposCliente,
        })
    }
        return res.status(404).json({
            message: "Cliente não encontrado"
        })
}

//>>>[X] Encerrar contas de clientes ( DELETE )
const destroy = (req,res) => {
    const IDcliente = req.params.id

    const existeCliente = listaDeClientes.find((cliente) => cliente.id == IDcliente)

    if (existeCliente){
        listaDeClientes.map((cliente, index) => {
            if (cliente.id == IDcliente) {
                listaDeClientes.splice(index,1)
            }
        })
        return res.status(200).json({  //204 - excluído, mas não exibe então 200
            message: "Cliente excluído com Sucesso!",
            cliente: existeCliente
        })
}
return res.status(404).json({
    message:"Cliente não encontrado"
})
}

module.exports = {
    create,
    read,
    update,
    destroy,
}