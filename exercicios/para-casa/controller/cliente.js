const listaClientes = require('../models/contas-clientes.json');
const create = (req, res) => {}
const read = (req, res) => {
const FiltroNome = req.query.nome_cliente
const filtroCpf= req.query.cpf_cliente
const DataNasc = req.query.data_nascimento
const filtrando = listaClientes.filter((item)=>{
    if (FiltroNome){
    return item.nome_cliente.toLowerCase() == filtroNome.toLowerCase()
    }
    if (filtroCpf){
    return item.cpf_cliente === filtroCpf;
    }
    if (DataNasc){
      return item.data_nascimento === DataNasc;
    }


  return item
})
res.status(200).json(filtrando)
}
const update = () => {}
const destroy= (req, res) => {
    const cpfCliente = req.params.cpf_cliente
    const cpfvalido = listaClientes.find(usario => usario.cpf_cliente == cpfCliente)
    if (cpfvalido){
    listaClientes.map((usario, index) =>{
        if (usario.cpf_cliente == cpfCliente)
        return listaClientes.slice(index,1)
    })
    return res.status(202).json({mensagem:"cliente apagado com sucesso", usario: cpfvalido})
}
return res.status(404).json({mensagem: 'Este cpf não é válido, tente novamente '})

}
module.exports = {
create,
read,
update,
destroy
}