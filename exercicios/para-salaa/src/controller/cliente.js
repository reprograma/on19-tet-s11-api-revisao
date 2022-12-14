const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const clienteBanco = require("../model/consultas-clientes.json");

const criarCliente = (req, res) => {
  const { nome_cliente, cpf_cliente, data_nascimento, conta: { tipo: { tipo_conta } } } = req.body;

  if (tipo_conta != "corrente" && tipo_conta != "poupança" && tipo_conta != "investimento") {
    return res.status(400).res.json({ message: "A CONTA NÃO FOI ENCONTRADA" });
  };

  let formatoDaData = moment(data_nascimento, "MM/DD/YYYY").format("l");

  if (formatoDaData == "data inválida") {
    return res.status(400).res.json({ message: "Data inválida" });
  };

  const novoCliente = {
    id: uuidv4(),
    nome_cliente,
    cpf_cliente,
    data_nascimento: moment(data_nascimento).format("l"),
    conta: {
      numero: moment().unix(),
      tipo: {
        tipo_conta: tipo_conta,
        transacao_entrada: 0,
        transacao_saida: 0,
      },
      saldo: 0,
      data_criacao: moment().format(),
    },
  };

  clienteBanco.push(novoCliente);

  return res.status(201).json({ ...novoCliente });

};

const ler = (req, res) => {
  const filtrarNome = req.query.name;
  const filtrarTipo = req.query.type;

  const filtrarCliente = clienteBanco.filter((client) => {
    if (filtrarNome) {
      return client.nome_cliente.toLowerCase() == filtrarNome.toLowerCase();
    };

    if (filtrarTipo) {
      return client.conta.tipo.tipo_conta.toLowerCase() == filtrarTipo.toLowerCase();
    };
    
    return client;
  });

  const empty = [];
  if (filtrarCliente.length == empty.length) {
    res.status(404).res.json({ message: "Data não encontrada" });
  };

  if (filtrarCliente) {
    return res.status(200).json(filtrarCliente);
  };
};

const editar = (req, res) => {
  const clientID = req.params.id;
  let { data_nascimento } = req.body;
  let acharID = clienteBanco.find((ID) => ID.id == clientID);

  if (acharID) {

    if (data_nascimento) {
      let formatoData = moment(data_nascimento, "MM/DD/YYYY").format("l");

      if (formatoData == "Data inválida") {
        return res.status(400).res.json({ message: "Data inválida" });
      };

      const editarAniversario = {
        ...acharID,
        data_nascimento: moment(data_nascimento).format("l"),
      };

      clienteBanco.map((client, index) => {
        if (client.id == clientID) {
          clienteBanco[index] = editarAniversario;
        }
      });

      return res.status(200).json({
        message: `A data foi modificada`,
      });
    }

    if (!data_nascimento) {
      return res.status(400).json({ message: "Data inválida" });
    }
  }
};

const deletar = (req, res) => {
  const deletarID = req.params.id
  const encontrarUsuario = clienteBanco.find((user) => user.id === deletarID)

  if (encontrarUsuario) {
    clienteBanco.map((user, index) => {
      if (user.id === deletarID) {
        return clienteBanco.splice(index, 1)
      }
    })

    return res.status(200).json({ message: "A conta foi deletada com sucesso" })
  }

  return res.status(404).json({
    message: "O ID não foi encontrado"
  })
};

module.exports = {
    criarCliente, deletar, editar, ler
}