const listaDeClientes = require('../model/contas-clientes.json')
const { v4: uuidv4 } = require("uuid");




// - Criar os clientes do banco - DONE
const criarClientes = (req, res) => {
  const { nome_cliente, cpf_cliente, data_nascimento, email, conta } = req.body;

  const id = uuidv4();
  const numeroDaConta = parseInt(Math.random() * 10000000);
  const dataDeCriacao = new Date().toISOString();

  const novoCliente = {
    id,
    nome_cliente,
    cpf_cliente,
    data_nascimento,
    email,
    conta: {
      numero: numeroDaConta,
      saldo: 0,
      data_criacao: dataDeCriacao,
    },
  };
  listaDeClientes.push(novoCliente);
  return res.status(201).json(novoCliente);
};

// - Atualizar informações desses clientes - DONE
const atualizarClientes = (req, res) => {
  const IDCliente = req.params.id;
  const { nome_cliente, email } = req.body;

  const cliente = listaDeClientes.find((cliente) => cliente.id == IDCliente);

  if (cliente) {
    const clienteAtualzado = {
      ...cliente,
      nome_cliente,
      email,
    };
    listaDeClientes.map((cliente, index) => {
      if (cliente.id == IDCliente) {
        listaDeClientes[index] = clienteAtualzado;
      }
    });
    return res.status(200).json({
      message: `O cliente ${cliente.nome_cliente} foi atualizado com sucesso`,
    });
  }
  return res.status(404).json({ message: `Cliente não encontrado.` });
};

// - Encerrar contas de clientes - DONE
const deletarClientes = (req, res) => {
    const IDCliente = req.params.id;
  
    const cliente = listaDeClientes.find((cliente) => cliente.id == IDCliente);
  
    if (cliente) {
      listaDeClientes.map((cliente, index) => {
        if (cliente.id == IDCliente) {
          return listaDeClientes.splice(index, 1);
        }
      });
  
      return res
        .status(200)
        .json({ message: "Conta encerrada com sucesso", cliente: cliente });
    }
    return res.status(404).json({ message: `Cliente não foi encontrado.` });
  };

//- Listar todos os clientes do banco
const listarTodos = (req, res) => {
    res.json(listaDeClientes);
  };

//- Conseguir Filtrar os clientes do banco pelo seu nome, por saldo. DONE
const filtrarClientes = (req, res) => {
  const filtroSaldo = req.query;
  const filtroCpf = req.query.cpf_cliente;
  const filtroEmail = req.query.email;
  const filtroNome = req.query.nome_cliente;

  const cliente = listaDeClientes.filter((item) => {
    if (filtroNome) {
      return (
        item.nome_cliente.toLowerCase().replace(/ /g, "") ==
        filtroNome.toLowerCase().replace(/ /g, "")
      );
    }
    if (filtroCpf) {
      return (
        item.cpf_cliente.replace(/[^\d]/g, "") ==
        filtroCpf.replace(/[^\d]/g, "")
      );
    }
    if (filtroEmail) {
      return item.email === filtroEmail;
    }
    if (filtroSaldo) {
      return item.conta.saldo == filtroSaldo.saldo;
    }
    return item;
  });
  res.json(cliente);
};

//- Listar cliente por id
const listarClientesPorID = (req, res) => {
  const id = req.params.id;

  const cliente = listaDeClientes.filter((item) => item.id == id);
  res.json(cliente);
};


module.exports = {
  criarClientes,
  atualizarClientes,
  deletarClientes,
  listarTodos,
  filtrarClientes,
  listarClientesPorID,
};
