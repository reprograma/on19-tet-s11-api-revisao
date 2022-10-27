const { v4: uuidv4 } = require("uuid");
const contasClientes = require('../model/contas-clientes.json')
const novaConta = Math.floor(Math.random() * 1000);

//cria cliente
const cria = (req, res) => {
    const {
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      conta: { tipo, saldo }
    } = req.body;

    const existeContaComCpf = contasClientes.find(
    (conta) => conta.cpf_cliente == cpf_cliente
    );
  
    if (!existeContaComCpf) {
      const novoClienteComCpf = {
        id: uuidv4(),
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta: {
          numero: novaConta,
          tipo,
          saldo,
          data_criacao: new Date(),
        },
      };
      contasClientes.push(novoClienteComCpf);
      return res.status(201).json(novoClienteComCpf);
    }
    return res.status(404).json({
      messagem: `Cliente com CPF: ${cpf_cliente} já possui conta cadastrada neste Banco`
    })
  };

// Atualizar informações desses clientes ( como endereço, telefone de contato...)

const atualizaUsuario = (req, res) => {
  const idCliente = req.params.id;
  const {endereco} = req.body;
  const {telefone} = req.body;

  const existeCliente = contasClientes.find(user => user.id == idCliente)

  if(existeCliente) {
      const usuarioAtualizado = {
          ...existeCliente,
        endereco,
        telefone,
      }
      
      contasClientes.map((user, index)=>{
          if(user.id == idCliente){
              return contasClientes[index] = usuarioAtualizado
          }
      })
    return res.status(200).json(usuarioAtualizado)
  }
  return res.status(404).json({message:"ID não foi encontrado"})
  }
  
  



//filtra cliente por Nome ou or Saldo
const filtra = (req, res)=>{
const filtroNome = req.query.nome
const filtroSaldo = req.query.saldo

const clientesFiltrados = contasClientes.filter((cliente)=>{
    if(filtroNome){
        return cliente.nome_cliente.toLowerCase() == filtroNome.toLowerCase()
    }
    if(filtroSaldo){
        return cliente.conta.saldo == filtroSaldo
    }
    return cliente
})
return res.status(200).json(clientesFiltrados)
}


module.exports = {
  cria,
  filtra,
  atualizaUsuario
};

