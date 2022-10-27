const listaClientes = require('../models/contas-clientes.json');

const pagamento = (req,res) => {
    const clienteID = req.params.id;
    const {"Valor do pagamento": valor} = req.body;
    
    const encontraCliente = listaClientes.find((cliente) => cliente.id == clienteID);

    if (encontraCliente) {
        if (encontraCliente.conta.saldo > valor) {
        const fazPagamento = {
            ...encontraCliente,
            conta: {
                ...encontraCliente.conta,
                saldo: encontraCliente.conta.saldo - valor}
        }
        listaClientes.map((cliente, index) => {
            if (cliente.id == clienteID) {
                listaClientes[index] = fazPagamento
            }
        });
        return res.status(200).json({message: `Pagamento no valor de ${valor} reais foi realizado com succeso.`});
        }
        return res.status(400).json({message: 'Saldo em conta insuficiente para realizar pagamento.'});
    }
    return res.status(404).json({ messagem: 'Usuário não encontrado.' });
}

const deposito = (req, res) => {
    const clienteID = req.params.id;
    const {"Valor do depósito": valor} = req.body;

    const encontraCliente = listaClientes.find((cliente) => cliente.id == clienteID);

    if (encontraCliente) {
        const fazDeposito = {
            ...encontraCliente,
            conta: {
                ...encontraCliente.conta,
                saldo: encontraCliente.conta.saldo + valor}
        }
        listaClientes.map((cliente, index) => {
            if (cliente.id == clienteID) {
                listaClientes[index] = fazDeposito
            }
        });
        return res.status(200).json({message: `Depósito no valor de ${valor} reais foi realizado com succeso.`});
    }
    return res.status(404).json({ messagem: 'Usuário não encontrado.' });
}
//Como sugerido no PR do projeto, originalmente, desestruturei o body que é enviado para um formato específico porém não soube e não tive tempo de tentar incluir algo
//que instruísse o usuário a preencher de forma correta caso em outro formato

module.exports = {
    pagamento,
    deposito
}