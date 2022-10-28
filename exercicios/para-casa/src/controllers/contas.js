const uuid = require('uuid');
const moment = require('moment');
const listaUsers = require('../models/lista_clientes');

const criarConta = (req, res) => { // cadastrando novos clientes
    const {nome_cliente, cpf_cliente, data_nascimento, contato:{endereço, telefone}, conta:{numero,tipo,saldo}, depositos:{deposito, data_deposito}, saques:{saque, data_saque}}= req.body;
    
    const uniqueRandomID = uuid.v4()
    const dataMovimentacao = moment().format('l')

    const novoClienteIDUnico = {
      id: uniqueRandomID,
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      contato: {
       endereço: endereço,
       telefone: telefone
      },
      conta: { 
        numero,
        tipo,
        saldo,
        dataMovimentacao
      },
      depositos: {
        deposito,
        dataMovimentacao
      },
      saques: {
        saque,
        dataMovimentacao
      }
    }    
    listaUsers.push(novoClienteIDUnico);
    return res.json(listaUsers);    
  };

const agruparContas = (req, res) => { // consulta por nome e cpf
    const tipoConta = req.query;
  
      const tipoContas = listaUsers.reduce((acumulador,user) => {
        if (!acumulador[user.conta.tipo]) {
                (acumulador[user.conta.tipo]) = [];
            }
          (acumulador[user.conta.tipo]).push(user);
          return acumulador;
        }, {})
        return res.status(200).json(tipoContas)
      };

const deposito = (req, res) => {
  const cpfUsuario = req.query.cpf_cliente;
  const {deposito} = req.body;

  const existeUsers = listaUsers.find(user => user.cpf_cliente === cpfUsuario)
 
  if(existeUsers) {
      const saldoAtualizadoComDeposito = {
            ...existeUsers.conta,
      saldo: +(existeUsers.conta.saldo + existeUsers.depositos.deposito),
    }
      listaUsers.map((user, index)=>{
          if(user.cpf_cliente === cpfUsuario){
              return listaUsers[index] = saldoAtualizadoComDeposito
          }
      })
    return res.status(200).json(saldoAtualizadoComDeposito)
  }
  return res.status(404).json({message:"Id não foi encontrado"})
};
     
const saque = (req, res) => {
  const cpfUsuario = req.query.cpf_cliente;
  const {saque} = req.body;

  const existeUsers = listaUsers.find(user => user.cpf_cliente === cpfUsuario)
  
  if(existeUsers) {
      const saldoAtualizadoComSaque = {
              ...existeUsers.conta,
      saldo: +(existeUsers.conta.saldo - existeUsers.saques.saque),
      }
      listaUsers.map((user, index)=>{
          if(user.cpf_cliente === cpfUsuario){
              return listaUsers[index] = saldoAtualizadoComSaque
          }
      })
    return res.status(200).json(saldoAtualizadoComSaque)
  }
  return res.status(404).json({message:"CPF não foi encontrado"})
};
      
const excluiConta = (req, res) => {
  const cpfUser = req.query.cpf_cliente;

  const userExiste = listaUsers.find(user => user.cpf_cliente == cpfUser)
   if(userExiste){
      listaUsers.map((user, index)=>{
          if(user.cpf_cliente == cpfUser){
              return listaUsers.splice(index,1)
          }
      })
      return res.status(200).json(listaUsers)
   }
   return res.status(404).json({message:"Usuário não existe"})
};

    module.exports = {
      criarConta,
      agruparContas,
      deposito,
      saque,
      excluiConta,     
}