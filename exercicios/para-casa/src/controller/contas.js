const uuid = require('uuid');
const listaClientes = require("../model/contas-cliente.json");

//- Criar os clientes do banco = DONE
const create = (req, res) => {
    const {
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      conta: { tipo },
    } = req.body;
    const IDUnico = uuid.v4();
    const numeroConta = Math.floor(Math.random() * 10000000);
    const dataCriacao = new Date().toISOString();
  
    const existeCpf = listaClientes.find(
      (conta) => conta.cpf_cliente == cpf_cliente
    );
    if (!existeCpf) {
      const novoCliente = {
        id: IDUnico,
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta: {
          numero: numeroConta,
          tipo,
          data_criacao: dataCriacao,
        },
      };
      listaClientes.push(novoCliente);
      return res.status(201).json(novoCliente);
    }
    return res.status(404).json({ messagem: "CPF ja existente" });
  };

  //depositar usando saldo da conta = DONE
 const updateDeposito = (req, res) => {
    const cpfCliente = req.query.cpf_cliente;
    const valorDepositado = req.body;
    const existeCliente = listaClientes.find(
      (cliente) => cliente.cpf_cliente === cpfCliente
    );
  
    if (existeCliente) {
      const novoSaldo = {
        ...existeCliente.conta,
        saldo: valorDepositado.conta.saldo,
      };
      listaClientes.map((cliente, index) => {
        if (cliente.cpf_cliente == cpfCliente) {
          return (listaClientes[index].conta.saldo = novoSaldo);
        }
      });
      return res.status(202).json(novoSaldo);
    }
    return res
      .status(404)
      .json({
        messagem:
          "O CPF informado não pode ser localizado, por favor confira os dados e tente novamente!",
      });
  };

  //fazer pagamento usando saldo da conta
const updatePagamento = (req, res) => {
    const cpfCliente = req.query.cpf_cliente;
    const valorpagamento = req.body;
    const existeCliente = listaClientes.find(
      (cliente) => cliente.cpf_cliente === cpfCliente);
    const valorPagamento = - 3000
  
    if (existeCliente) {
      const novoSaldo = {
        ...existeCliente.conta,
        saldo: valorpagamento.conta.saldo - valorPagamento,
      };
      listaClientes.map((cliente, index) => {
        if (cliente.cpf_cliente == cpfCliente) {
          return (listaClientes[index].conta.saldo = novoSaldo);
        }
      });
      return res.status(202).json(novoSaldo);
    }
    return res
      .status(404)
      .json({
        messagem:
          "O CPF informado não pode ser localizado, por favor confira os dados e tente novamente!",
      });
  };

  //- Encerrar contas de clientes = DONE
const destroy = (req, res) => {
    const idCliente = req.params.id;
    const existeCliente = listaClientes.find(
      (usuario) => usuario.id == idCliente
    );
  
    if (existeCliente) {
      listaClientes.map((usuario, index) => {
        if (usuario.id == idCliente) {
          return listaClientes.splice(index, 1);
        }
      });
      return res.status(200).json(listaClientes);
    }
    return res.status(404).json({
      messagem:
        "O usuário não pode ser localizado, por favor confira os dados informados!",
    });
  };
  

module.exports = {
    create,
    updateDeposito,
    updatePagamento,
    destroy
}

  