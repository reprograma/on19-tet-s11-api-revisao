const listaUsers = require('../models/lista_clientes');


const mostrar = (req, res) => {//rota get pata listar todos os clientes:conferir criação e exclusão
  res.json(listaUsers)
};
     
const filtrar = (req, res) => { // consulta por nome e cpf
  const filtroNome = req.query.nome_cliente;
  const filtroCPF = req.query.cpf_cliente;
  
  const userExiste = listaUsers.filter((user) => {
      if (filtroNome) {
            return user.nome_cliente.toLowerCase() === filtroNome.toLowerCase()
          }
       if (filtroCPF) {
            return user.cpf_cliente == filtroCPF
          } 

       return res.status(404).json({ messagem: 'Usuário não existe' })
      })

  return res.json(userExiste)
  
};

const alteraCadastro = (req, res) => { // atualizando cadastro
    const IdUsuario = req.params.id
    const cadastroAtualizado = req.body

    const userExiste = listaUsers.filter(user => user.id === IdUsuario)

    if(userExiste){
      listaUsers.map((user, index)=>{
            if(user.id === IdUsuario){
                return listaUsers[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }
    listaUsers.push(cadastroAtualizado)
    return res.status(201).json(listaUsers)    
};

const atualizaParcial = (req, res) => {
  const IdUsuario = req.params.id;
  const {contato:{ endereco, telefone}} = req.body;

  const existeUsers = listaUsers.filter(user => user.id === IdUsuario )

  if(existeUsers) {
      const usuarioAtualizado = {
          contato: {
            endereco,
            telefone
          },
        
      }
      listaUsers.map((user, index)=>{
          if(user.id == IdUsuario){
              return listaUsers[index] = usuarioAtualizado
          }
      })
    listaUsers.push(usuarioAtualizado)
    return res.status(200).json(usuarioAtualizado)
  }
  return res.status(404).json({message:"Id não foi encontrado"})
};


module.exports = {
    mostrar,
    filtrar,
    alteraCadastro,
    atualizaParcial,
}