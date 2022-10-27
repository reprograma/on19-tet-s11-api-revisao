// >>> [] Criar os clientes do banco: (POST - cria um recurso novo)
const listaDeClientes = require("../models/contas-clientes.json")

const update =(req, res) =>{
    const id = req.params.id
    const alterarCliente = req.body
    const existeCliente = listaDeClientes.filter((item, index) => {item.id == id})
    if(existeCliente) {
        const clienteAlterado = {
          ...existeCliente,
        ...alterarCliente,
        
        }
        listaDeClientes.map((cliente,index)=>{
            if(cliente.id == id) { listaDeClientes[index] = clienteAlterado} 
            
          })
          return res.json(listaDeClientes)

}}

module.exports = update
