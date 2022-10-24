const listaClientes = require('../model/contas-clientes.json')


const create = () => {};
const show  = () => {};
const index  = () => {};
const update = () => {};
const destroy = (req, res) => {

    const Idclientes = req.params.id
    const existeUsuario = listaClientes.find((usuarios) => usuarios.id == Idclientes)
    if (existeUsuario) {
        listaClientes.map((usuarios, index) => {
            if (usuarios.id == Idclientes) {
                return listaClientes.splice(index, 1)
            }
        })
        return res.status(200).json(listaClientes)
    }
    return res.status(404).json({
        message: "Cliente não Encontrado, por favor verifique."
    })

};


module.exports ={

    create, 
    show,
    index,
    update, 
    destroy,

    
}