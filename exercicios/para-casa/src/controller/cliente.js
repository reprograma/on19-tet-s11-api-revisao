const listaClientes = require('../model/contas-clientes.json');
const { v4: uuidv4 } = require('uuid');
const novaConta = Math.floor(Math.random()* 5194728);

 const newCostumer = (req, res) => {
    const { nome_cliente,
    cpf_cliente,
    data_nascimento,
    conta: {tipo}
} = req.body;
  
    const IDUnico = uuidv4();
  
    const novoCliente = {
      id: IDUnico,
      nome_cliente,
      cpf_cliente,
      data_nascimento,
      conta: {
        numero : novaConta ,
        tipo,
        data_criacao: new Date,
      } 
    };

    listaClientes.push(novoCliente);
    return res.json(novoCliente);
  };

 const updateCostumer = (req, res)=>{
    const IDCliente = req.params.id
    const novosCampos = req.body

    const acharUsuario = listaClientes.find(clientes => clientes.id == IDCliente)

    if(acharUsuario) {
        const usuarioAtualizado = {
            ...acharUsuario,
            ...novosCampos
        }
        
        listaClientes.map((clientes, index)=>{
            if(clientes.id == IDCliente){
                return listaClientes[index] = usuarioAtualizado
            }
        })
        console.log(usuarioAtualizado)
        return res.status(200).json(usuarioAtualizado)
    }
    return res.status(404).json({message:"Usuario não encontrado"})
   
}

const deleteCostumer = (req,res)=>{
    const IDCliente = req.params.id
  
    const localizarCliente = listaClientes.find((cliente)=> cliente.id == IDCliente)
  
    if(localizarCliente){
        listaClientes.map((cliente,index)=>{
            if(cliente.id == IDCliente){
                return listaClientes.splice(index,1)
            }
  
        })
        return res.status(200).json(`O usuário foi deletado com sucesso`)
    }
    return res.status(404).json("Cliente não foi encontarado")
  }

  const findCostumer = (req, res)=>{
    
    const filtroCPF =  req.query.cpf
    const filtroid = req.query.id


    const escolhaDoFiltro =  listaClientes.filter((cliente) => {

    
      if (filtroCPF) {
        return cliente.cpf_cliente == filtroCPF
      }
      if(filtroid){
        return cliente.id == filtroid
      }
      return cliente 
    })
    return res.json(escolhaDoFiltro)

  }

module.exports = {newCostumer, updateCostumer, deleteCostumer, findCostumer}

