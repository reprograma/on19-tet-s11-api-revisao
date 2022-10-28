// Criar os clientes do banco

const contasClientes = require("../model/contas-clientes.json");
const uuid = require("uuid-random");
const novaConta = Math.floor(Math.random() * 10000000);


const criarConta = (req, res) => {
    const {
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      conta: { tipo },
    } = req.body;
    const existeContaComCpf = contasClientes.find(
      (conta) => conta.cpf_cliente == cpf_cliente
    );
  
    if (!existeContaComCpf) {
      const novoClienteComCpf = {
        id: uuid(),
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta: {
          numero: novaConta,
          tipo,
        data_criacao: new Date().toISOString(),
        },
      };
      contasClientes.push(novoClienteComCpf);
      return res.status(200).json(novoClienteComCpf);
    }
    return res.status(404).json({
      menssagem: `Cliente com CPF: ${cpf_cliente} já possui conta cadastrada neste Banco`,
    });
  };
  
  // Atualizar informações desses clientes ( como endereço, telefone de contato...)

  
  const atualizarCliente = (req, res) => {
    const idCliente = req.params.id;
    const endereco_cliente = req.body;
  
    const existeContaComId = contasClientes.find(
      (conta) => conta.id == idCliente
    );
  
    if (existeContaComId) {
      const clienteAtualizado = {
        ...existeContaComId,
        endereco_cliente,
      };
      contasClientes.map((cliente, index) => {
        if (cliente.id == idCliente) {
          contasClientes[index] = clienteAtualizado
          return (contasClientes[index] = clienteAtualizado);
         
        }
      });
  
      return res.status(200).json({ clienteAtualizado });
    }
  
    return res.status(404).json({ menssagem: "Cliente inexistente" });
  };
  

// Encerrar contas de clientes

  
  const deletarCliente = (req, res) => {
    const contaADeletar = req.params.conta;
    const clienteADeletar = contasClientes.find(
      (cliente) => cliente.conta.numero == contaADeletar
    );
  
    if (clienteADeletar) {
      contasClientes.map((cliente, index) => {
        if (cliente.conta.numero == contaADeletar) {
          return contasClientes.splice(index, 1);
        }
      });
      return res.status(200).json(contasClientes);
    }
  
    return res.status(404).json({
      mensagem: `A conta de número ${contaADeletar} não encontrada`,
    });
  };

  // Conseguir Filtrar os clientes do banco pelo seu nome,por saldo...

   
    const mostrarClientes = (req, res) => {
    const filtroNome = req.query.nome?.toLowerCase();
    const filtroCpf = req.query.cpf;
    const filtroNumeroDaConta = req.query.conta;
    const filtroTipoDaConta = req.query.tipodaconta;
    const filtroDataDeNascimento = req.query.datadenascimento;
    const filtroDataDeCriação = req.query.dataDeCriação;
    const filtroID = req.query.id;
    const filtroPorSaldo = req.query.saldo;
  
    const contaFiltrada = contasClientes.filter((conta) => {
      if (filtroNome) {
        return conta.nome_cliente.toLowerCase().includes(filtroNome);
      }
      if (filtroCpf) {
        return conta.cpf_cliente == filtroCpf;
      }
      if (filtroNumeroDaConta) {
        return conta.conta.numero == filtroNumeroDaConta;
      }
      if (filtroTipoDaConta) {
        return conta.conta.tipo == filtroTipoDaConta;
      }
      if (filtroDataDeNascimento) {
        return conta.data_nascimento == filtroDataDeNascimento;
      }
      if (filtroDataDeCriação) {
        return conta.conta.data_criacao == filtroDataDeCriação;
      }
      if (filtroID) {
        return conta.id == filtroID;
      }
      if (filtroPorSaldo) {
        return conta.conta.saldo == filtroPorSaldo;
      }
      return conta;
    });
    res.json(contaFiltrada);
  };
 

  module.exports = {
    criarConta,
    atualizarCliente,
    deletarCliente,
    mostrarClientes
  }
  
 