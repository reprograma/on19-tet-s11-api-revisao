const { v4: uuidv4 } = require("uuid");
const novoNumero = Math.floor(Math.random() * 30000000);

const contasClientes = require("../model/contas-clientes.json");


const newCreate = (req, res) => {
  const {
    nome_cliente,
    cpf_cliente,
    data_nascimento,
    conta: { tipo },
  } = req.body;

  const existeCPF = contasClientes.find(
    (conta) => conta.cpf_cliente == cpf_cliente
  );

  if (!existeCPF) {
    const novoCliente = {
      id: uuidv4(),
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      conta: {
        numero: novoNumero,
        tipo,
        saldo: 0,
        data_criacao: new Date().toISOString(),
      },
    };
    contasClientes.push(novoCliente);
    return res.status(201).json(contasClientes);
  }
  return res.status(400).json({
    messagem: `Cliente com CPF: ${cpf_cliente} Conta já cadastrada`,
  });
};

const newDeposito = (req, res) => {
  const idCliente = req.params.id;
  const { deposito } = req.body;

  const clienteExiste = contasClientes.find(
    (cliente) => cliente.id == idCliente
  );

  if (clienteExiste) {
    const efetuarDeposito = {
      ...clienteExiste.conta,
      saldo: clienteExiste.conta.saldo + deposito,
    };

    contasClientes.map((cliente, index) => {
      if (cliente.id == idCliente) {
        contasClientes[index].conta = efetuarDeposito;
      }
    });
    return res.status(200).json(contasClientes);
  }
  return res.status(404).json({
    messagem:
    "Erro no depósito. Tente novamente.",
  });
};


const newPagamento = (req, res) => {
  const idCliente = req.params.id;
  const { pagamento } = req.body;

  const clienteExiste = contasClientes.find(
    (cliente) => cliente.id == idCliente
  );

  if (clienteExiste.conta.saldo >= pagamento) {
    const efetuarPagamento = {
      ...clienteExiste.conta,
      saldo: clienteExiste.conta.saldo - pagamento,
    };

    contasClientes.map((cliente, index) => {
      if (cliente.id == idCliente) {
        contasClientes[index].conta = efetuarPagamento;
      }
    });
    return res.status(200).json(contasClientes);
  }
  return res.status(400).json({
    messagem:
    "Pagamento maior que o saldo",
  });
};

const destroy = (req, res) => {
  const idCliente = req.params.id;

  const existeCliente = contasClientes.find((conta) => conta.id == idCliente);

  if (existeCliente) {
    contasClientes.map((conta, index) => {
      if (conta.id == idCliente) {
        return contasClientes.splice(index, 1);
      }
    });
    return res.status(200).json(contasClientes);
  }
  return res.status(404).json({
    message: "O cliente não encontrado. Digite novamente",
  });
};

module.exports = {
  newCreate,
  newDeposito,
  newPagamento,
  destroy,
};