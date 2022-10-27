const listaDeClientes = require("../model/contas-clientes.json")

//>>> [x] Fazer depósitos / pagamentos usando o saldo de sua conta - PATCH + lógica
const payment = (req, res) => {
    const IDcliente = req.params.id
    const {valorDoPagamento} = req.body

    const existeCliente = listaDeClientes.find(cliente => cliente.id == IDcliente)

    if (!existeCliente) {
        return res.status(404).json({
            message: "Cliente não encontrado"
        })
    }

    if (existeCliente) {
        listaDeClientes.map((cliente) => {
            if (cliente.id == IDcliente){
                if (cliente.conta.saldo < valorDoPagamento) {
                    return res.send({message: "Saldo Insuficiente"})
                } 
            const novoSaldo = (cliente.conta.saldo - valorDoPagamento).toFixed(2)
            cliente.conta.saldo = novoSaldo

            return res.status(200).json({
                message: `Pagamento no valor de R$ ${valorDoPagamento} realizado!`,
               novoSaldo: cliente.conta.saldo
            })
        }
        })

}
}

const deposit = (req, res) =>{
    const IDcliente = req.params.id
    const {valorDoDeposito} = req.body
    
    const existeCliente = listaDeClientes.find(cliente => cliente.id == IDcliente)

    if (!existeCliente) {
        return res.status(404).json({
            message: "Cliente não encontrado"
        })
    }

    if (existeCliente) {
        listaDeClientes.map((cliente) => {
            if (cliente.id == IDcliente){
                if (valorDoDeposito <= 0) {
                    return res.send({message: "Valor inválido"})
                } 

                const novoSaldo = (cliente.conta.saldo + valorDoDeposito).toFixed(2)
                cliente.conta.saldo = novoSaldo //ERR esse cód só funciona na 1ª vez na 2ª dá erro not a function

            return res.status(200).json({
                    message: `Depósito no valor de R$ ${valorDoDeposito} realizado!`,
                   novoSaldo: cliente.conta.saldo
                })
            } 
    })}
}

module.exports = {
    payment,
    deposit,
}