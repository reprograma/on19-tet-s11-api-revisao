const create = (req, res) => {
    const novoId = uuidv4();
    const infData = new Date();

    const {
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta: {
            numero,
            tipo
        }

    } = req.body

    const novoClienteComID = {
        id: novoId,
        nome_cliente,
        cpf_cliente,
        data_nascimento,
        conta: {
            numero: numero,
            tipo: tipo,
            saldo: 0,
            data_criacao: infData
        }
    };

    listaClientes.push(novoClienteComID);
    return res.json(novoClienteComID);
}

const index = (req, res) => {
    const filtroNome = req.query.nome.toLowerCase()
    const filtroCPF = req.query.cpf

    const clienteFiltrado = listaClientes.filter((item) => {

        if (filtroNome) {
            return item.nome_cliente.toLowerCase() === filtroNome.toLowerCase()
        }
        if (filtroCPF) {
            return item.cpf_cliente === filtroCPF
        }
        return item
    })
    res.json(clienteFiltrado)
}

const indexID = (req, res) => {
    const id = req.params.id
    const clienteEscolhido = listaClientes.find((item, index) => cliente.id == id)
    if (clienteEscolhido) {
        return res.status(200).json(clienteEscolhido);
    }
    return res.status(404).json({ messagem: 'Cliente não existe' });
}

const update = (req, res) => {
    const IDconta = req.params.id
    const novosCampos = req.body
    const contaExistente = listaClientes.find(conta => conta.id == IDconta)

    if (contaExistente) {
        const contaAtualizada = {
            ...contaExistente,
            ...novosCampos
        }

        return res.status(200).json(contaAtualizada)
    }
    return res.status(404).json({
        message: "Conta não encontrada"
    })
}
const destroy = ()=> {
    const IDconta = req.params.id
    const contaExistente = listaClientes.find((conta) => conta.id == IDconta)

    if (contaExistente) {

        listaClientes.map((conta, index) => {
            if (conta.id == IDconta) {
                return listaClientes.splice(index, 1)
            }
        })

        return res.status(200).json(listaClientes)
    }

    return res.status(404).json({
        message: "Conta não foi encontrada"
    })
}

module.exports = {
    create,
    index,
    indexID,
    update,
    destroy
}