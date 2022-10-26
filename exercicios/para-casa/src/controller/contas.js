const { v4: uuidv4 } = require("uuid");
const novoNumero = Math.floor(Math.random() * 10000000);

const contasClientes = require("../model/contas-clientes.json");

// - Criar conta do cliente no banco
const create = (req, res) => {
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
    messagem: `Cliente com CPF: ${cpf_cliente} já possui conta cadastrada na ReproBank`,
  });
};

// - Fazer depósitos / pagamentos usando o saldo de sua conta

//DEPÓSITOS
const updateDeposito = (req, res) => {
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
      "Não foi possível realizar o depósito, o cliente não foi encontrado! Tente novamente!",
  });
};

// PAGAMENTOS
const updatePagamento = (req, res) => {
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
      "O pagamento que está tentando realizar é maior que o saldo atual",
  });
};

// - Encerrar contas do cliente
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
    message: "O cliente não foi encontrado. Digite o ID correto",
  });
};

module.exports = {
  create,
  updateDeposito,
  updatePagamento,
  destroy,
};
