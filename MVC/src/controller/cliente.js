const listaClientes = require('../model/contas-clientes.json')


const create = (req, res) => {
    const body = req.body
    listaClientes.push(body)

    return res.status(200).json(listaClientes)


}


const show = () => { };
const index = (req, res) => {

    const filtrarNome = req.query.nome
    const filtrarSaldo = parseFloat(req.query.saldo)

    const clienteEscolhido = listaClientes.filter((item, index) => {

        if (filtrarNome) {
            return item.nome_cliente.toLowerCase() === filtrarNome.toLowerCase()
        }
        if (filtrarSaldo) {
            return item.conta.saldo === filtrarSaldo
        }
        return item
    })
    res.json(clienteEscolhido)


};

const update = (req, res) => {
    const idCliente = req.params.id
    const novosCampos = req.body

    const existeCliente = listaClientes.find(usuario => usuario.id == idCliente)

    if (existeCliente) {
        const clienteAtualizada = {
            ...existeCliente,
            ...novosCampos
        }

        return res.status(200).json(clienteAtualizada)
    }
    return res.status(404).json({
        message: "Cliente não foi encontrado em nosso sistema, tente novamente."
    })

};


const destroy = () => {






};


module.exports = {

    create,
    show,
    index,
    update,
    destroy,


}