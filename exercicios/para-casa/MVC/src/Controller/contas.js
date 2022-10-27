const listaClientes = require('../model/contas-clientes.json');
const uuid = require('uuid');

const createClient = (req, res) => {
    const {nome_cliente, cpf_cliente, data_nascimento, conta: {tipo}} = req.body;
    const novoId = uuid.v4();
    const novoNumero = Math.floor(Math.random() * 1000000);
    const novoCliente = {
      id: novoId,
      nome_cliente: nome_cliente,
      cpf_cliente: cpf_cliente,
      data_nascimento: data_nascimento,
      conta: {
        numero: novoNumero,
        tipo: tipo,
        saldo: 0,
        data_criacao: new Date()
      }}
      listaClientes.push(novoCliente)
      return res.json(novoCliente)
};
const findClient = (req, res) => {
    const nomeCliente = req.query.nome;
    const cpfCliente = req.query.cpf;
  const clienteExiste = listaClientes.filter(
    (cliente) => cliente.nome_cliente == nomeCliente
  );
  if (clienteExiste) {
    return res.status(200).json(clienteExiste);
  }
  const cpfExiste = listaClientes.filter((cliente) => cliente.cpf_cliente == cpfCliente);
 if (cpfExiste) {
    return res.status(200).json(cpfExiste)
 }; 
  return res.status(404).json({ messagem: 'Cliente não existe' })
};
const updateClient = (req, res) => {
    const idCliente = req.params.id;
    const novoTipo = req.body;
    const existeCliente = listaClientes.find((cliente) => cliente.id == idCliente);
  
    if(existeCliente){
      const atualizaTipoConta = {
          ...existeCliente,
          ...novoTipo
      }
       listaClientes.map((cliente, index)=>{
          if(cliente.id == idCliente){
              return listaClientes[index] = atualizaTipoConta 
            }
          });
    return res.status(200).json(atualizaTipoConta)
        }
    return res.status(404).json({ messagem: 'Cliente não existe' });
  };
const destroyClient = (req, res) => {
    const idCliente = req.params.id;
  const existeCliente = listaClientes.find((cliente) => cliente.id == idCliente);
  if (existeCliente){
    listaClientes.map((cliente, index) => {
      if (cliente.id == idCliente){
        return listaClientes.splice(index, 1)
      }
    })
    return res.status(200).json({mensagem: `O cliente ${existeCliente.nome_cliente} foi excluido`}) 
  } 
    return res.status(404).json({ messagem: 'Cliente não existe' });
};


module.exports = {
    createClient,
    findClient,
    updateClient,
    destroyClient
}


// moment().format()