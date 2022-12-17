const contasClientes = require("../model/contas-clientes.json");


const updateTelefone = (req, res) => {
  const idCliente = req.params.id;
  const { telefone } = req.body;

  const existeCliente = contasClientes.find((conta) => conta.id == idCliente);

  if (existeCliente) {
    const atualizarCliente = {
      ...existeCliente,
      telefone: telefone,
    };
    return res.status(200).json(atualizarCliente);
  }
  return res
    .status(404)
    .json({ messagem: "Cliente não foi encontrado." });
};


const show = (req, res) => {
  const filtrarNome = req.params.nome;
  const filtrarNascimento = req.params.data;
  const filtrarSaldo = parseFloat(req.params.saldo);

  const prodFiltros = contasClientes.find((item) => {
    if (filtrarNome) {
      return item.nome_cliente.toLowerCase() == filtrarNome.toLowerCase();
    }
    if (filtrarNascimento) {
      return item.data_nascimento == filtrarNascimento;
    }
    if (filtrarSaldo) {
      return item.conta.saldo == filtrarSaldo;
    }
    return item;
  });
  return res.status(200).json(prodFiltros);
};

module.exports = {
  show,
  updateTelefone,
};