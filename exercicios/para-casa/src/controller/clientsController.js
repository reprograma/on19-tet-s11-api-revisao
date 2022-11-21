const clientsModel = require('../models/clientsModel.json')

//Atividade 1: Criar os clientes do banco = POST 

const {v4: uuidv4 } = require('uuid');
const moment = require('moment');

const addNewClient = (req, res) => {
    const {nome_cliente, cpf_cliente, data_nascimento, pais, email, conta: {tipo}} = req.body;

    const newClient = {
        id: uuidv4(),
        nome_cliente: nome_cliente,
        cpf_cliente: cpf_cliente,
        data_nascimento: data_nascimento,
        pais: pais,
        email: email,
        conta: {
            numero: (Math.random()*10000000).toFixed(0),
            tipo: tipo,
            saldo: 0,
            data_criacao: moment().format("YYYY-MM-DDTHH:mm:ss.SSS")+"Z"
        }
    };

    clientsModel.push(newClient);
    return res.json(newClient);
};


//Atividade 2: Atualizar informações desses clientes (como endereço, telefone de contato...) = PUT
const updatedClient = (req, res) => {
    const idClient = req.params.id
    const updatedInfo = req.body

    const thereIsTheClient = clientsModel.find(client => client.id == idClient);

    if(thereIsTheClient){
        clientsModel.map((client, index) => {
            if(client.id == idClient) {
                return clientsModel[index] = updatedInfo
            }
        })
    return res.status(200).json({message: "Successfully updated client!", client: updatedInfo}) // STATUS CODE 200 = OK
    }
    clientsModel.push(updatedInfo)
    return res.status(201).json({message: "As the client was not found, it created a new one", client: updatedClient}) // STATUS CODE 201 = CREATED
};

//Atividade 3: Encerrar contas de clientes = DELETE
const deleteClient = (req, res) => {
    const idClient = req.params.id

    const thereIsTheClient = clientsModel.find((client) => client.id == idClient);

    if(thereIsTheClient){
        clientsModel.map((client, index) => {
            if(client.id == idClient){
                return clientsModel.splice(index, 1);
            };
        });
        return res.status(200).json({message: "Successfully deleted client!", client: thereIsTheClient}); //STATUS CODE 200 = OK
    };
    res.status(404).json({message: `It can't find the client ${idClient}`}) //STATUS CODE 404 = NOT FOUND
};

//Atividade 4: Filtrar clientes por nome, saldo... = GET
const filterClient = (req, res) => {
    const filterName = req.query.nome_cliente;
    const filterCpf = req.query.cpf_cliente;
    const filterBankAccount = req.query.numero;

    const choseFilter = clientsModel.find((req, res) => {
        if (filterName){
            return item.nome_cliente.toLowerCase() == filterName.toLowerCase();
        };
        if (filterCpf) {
            return item.cpf_cliente == filterCpf;
        };
        if (filterBankAccount) {
            return item.conta.numero == filterBankAccount;
        };
        return item
    });
    res.json(choseFilter);
};


module.exports = {
    addNewClient,
    updatedClient,
    deleteClient,
    filterClient
}

