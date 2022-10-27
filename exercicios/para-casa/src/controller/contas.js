const contasClientes = require("../model/contas-clientes.json")


//Fazer depósitos / pagamentos usando o saldo de sua conta - FUNCIONANDO
const updateSaldo = (req, res) =>{
    
    const IdDoCliente = req.params.id
    const body = req.body

    const existeCliente = contasClientes.find(idCliente => idCliente.id ==IdDoCliente)
    if (existeCliente){
        const saldoAtualizado = {
            
            saldo :body.conta.saldo + 100
        }
        
        contasClientes.map((cliente, index)=>{
            if(cliente.conta==IdDoCliente)
            return contasClientes[index] = saldoAtualizado
    })


return res.status(202).json(saldoAtualizado)
 }
if (! existeCliente){
    return res.status(404).json({massege: "Ops! dados não encontrados em nosso banco de dados."})
}}

//delete-Encerrar contas de clientes- INCOMPLETO
const destroy = (req, res) =>{
    const buscarNomeDoCliente = contasClientes.find(Nome => Nome.nome_cliente === req.params.nome)
    

    if (! buscarNomeDoCliente)
    return res.status(404).json({massege: "Esse cliente  não existe"})


    if (buscarNomeDoCliente ==buscarNomeDoCliente)
    return res.status(404).json({message :"conta deletada com sucesso !"})

    const index = contasClientes.indexOf(buscarNomeDoCliente)
    contasClientes.splice(index, 1)

    return res.json(buscarNomeDoCliente)




}






module.exports= {
    
    updateSaldo,
    destroy
}