const {v4: uuidv4} = require('uuid');
const moment = require('moment');
const listaClientes = require('../models/contas-clientes.json');

const criaCliente = (req, res) => {
    const { nome_cliente, cpf_cliente, data_nascimento, conta: {tipo} } = req.body;
    const criaID = uuidv4();

    const novoCliente = {
        id: criaID,
        nome_cliente: nome_cliente,
        cpf_cliente: cpf_cliente,
        data_nascimento: data_nascimento,
        conta: {
            numero: (Math.random() * 10000000).toFixed(0),
            tipo: tipo,
            saldo: 0,
            data_criacao: moment().format("YYYY-MM-DDTHH:mm:ss.SSS")+"Z" 
            //Usei anteriormente o modelo de "new Date" porém ele terminava de forma diferente ao da lista JSON então preferi estruturar todo o formato com Moment
        }
    }
    listaClientes.push(novoCliente);
    return res.status(201).json(novoCliente);
}

const atualizaCliente = (req, res) => {
    const clienteID = req.params.id;
    const { nome_cliente, conta: {tipo} } = req.body;

    const encontraCliente = listaClientes.find((cliente) => cliente.id == clienteID);

    if (encontraCliente) {
        const atualizaCadastro = {
            ...encontraCliente,
            nome_cliente: nome_cliente,
            conta: {
            ...encontraCliente.conta,
            tipo: tipo}
        };
        listaClientes.map((cliente, index) => {
            if (cliente.id == clienteID) {
                listaClientes[index] = atualizaCadastro
            }
        });
        return res.status(200).json({message: `Usuário ${encontraCliente.nome_cliente} foi atualizado com succeso.`});
    }
    return res.status(404).json({ messagem: 'Usuário não encontrado.' });
}

const encerraCliente = (req,res) => {
    const clienteID = req.params.id;

    const encontraCliente = listaClientes.find((cliente) => cliente.id == clienteID);

    if (encontraCliente) {
        listaClientes.map((cliente,index) => {
            if (cliente.id == clienteID) {
                return listaClientes.splice(index, 1)
            }
        })
        return res.status(200).json({message: 'Conta do cliente foi encerrada permanentemente.'})
    }
    return res.status(404).json({message: `Usuário não foi encontrado.`})
}

const listarClientes = (req,res) => {
    const filtroNome = req.query.nome;
    const filtroConta = req.query.tipoConta;

    const clienteFiltrado = listaClientes.filter((cliente) => {
        if (filtroNome) {
            return cliente.nome_cliente.includes(filtroNome)
        };
        if (filtroConta) {
            return cliente.conta.tipo == filtroConta
        }
        return cliente
    })
    return res.json(clienteFiltrado)
}

module.exports = {
    criaCliente,
    atualizaCliente,
    encerraCliente,
    listarClientes
}