const listaClientes = require("../model/contas-cliente.json");

//- Atualizar informações desses clientes ( como endereço, telefone de contato...) = DONE
const updateDados = (req, res) => {
    const cadastrosId = req.params.id;
    const dadosAtualizados = req.body;
  
    const existeUsuario = listaClientes.find(
      (usuario) => usuario.id == cadastrosId
    );
    if (existeUsuario) {
      listaClientes.map((usuario, index) => {
        if (usuario.id == cadastrosId) {
          return (listaClientes[index].dadosAtualizados = dadosAtualizados);
        }
      });
  
      return res.status(200).json(listaClientes);
    }
    return res.status(404).json({ messagem: "Usuario não encontrado" });
  };
  
  //- Conseguir Filtrar os clientes do banco pelo seu nome,por saldo - DONE
const show = (req, res) => {
    const filtroNome = req.query.nome;
    const filtroCPF = req.query.CPF;
  
    const clienteSelecionado = listaClientes.filter((cliente) => {
      if (filtroNome) {
        return cliente.nome_cliente.toLowerCase() == filtroNome.toLowerCase();
      }
      if (filtroCPF) {
        return cliente.cpf_cliente == filtroCPF;
      }
      return cliente;
    });
    return res.json(clienteSelecionado);
  };



  module.exports = {
    show,
    updateDados
  }
