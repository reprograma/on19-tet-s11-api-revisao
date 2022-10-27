const listaDeClientes = require("../model/contas-clientes.json")
const uuid = require('uuid')
const moment = require('moment')
moment.locale('pt-br')

//-Criar os clientes do banco
const create = (req, res) =>{
    const Novocliente = req.body
    listaDeClientes.push(Novocliente) 
    
    return res.status(201).json(listaDeClientes)
}


//Atualizar informações desses clientes ( como endereço, telefone de contato...) 
const updateDadosCliente = (req, res) =>{
    const atualizarCliente = req.params.id

    const existCliente = listaDeClientes.find((idCliente) => idCliente.id ==atualizarCliente)
    if (existCliente == existCliente )
    return res.status(202).json({
        id: req.body.id,
        nome_cliente: req.body.nome_cliente,
        cpf_cliente: req.body.cpf_cliente,
        data_nascimento: req.body.data_nascimento,
        conta: req.body.conta 


 })
 listaDeClientes.map((idCliente, index) =>{
    if (idCliente.id ==atualizarCliente){
        listaDeClientes[index]=  atualizarCliente
    }
 })
if ( ! existCliente){
    return res.status(404).json({ massege: "Não é possível atualizar dados, desse cliente."})
}
listaDeClientes.push(existCliente)

}


//get-Conseguir Filtrar os clientes do banco pelo seu nome,por saldo..
const show = (req, res) =>{
    
        const body= req.body
            const CpfCliente = listaDeClientes.filter(Cpf => Cpf.cpf_cliente == req.params.cpf);
        
            if ( ! CpfCliente)
            return res.status(404).json({massege: "cliente não encontrado !"})
        
            return res.json(CpfCliente);
        
}




module.exports={
    create, 
     show,
     updateDadosCliente

    
}
