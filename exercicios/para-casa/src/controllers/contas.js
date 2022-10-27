// contas
const contasClientes = require("../model/contas-clientes.json")


//- Fazer depósitos / pagamentos usando o saldo de sua conta
//Deposito
const deposita = (req,res)=>{
    const idCliente = req.params.id;
    const { deposito } = req.body;
  
    const existeCliente = contasClientes.find(
      (cliente) => cliente.id == idCliente
    );
  
    if (existeCliente) {
      const fazDeposito = {
        ...existeCliente.conta,
        saldo: existeCliente.conta.saldo + deposito,
      };
  
      contasClientes.map((cliente, index) => {
        if (cliente.id == idCliente) {
          contasClientes[index].conta = fazDeposito ;
        }
      });
      return res.status(200).json({
        message: `Depósito do cliente ${existeCliente.nome_cliente} realizado com sucesso. Saldo R$ ${fazDeposito.saldo}`,
    })
  }  
    return res.status(404).json({ messagem: "Cliente não encontrado"});  
  }
  //Saque
  const saca = (req,res)=>{
  const idCliente = req.params.id;
  const { saque } = req.body;
  
  const existeCliente = contasClientes.find(
    (cliente) => cliente.id == idCliente
  );
  
  if (existeCliente.conta.saldo >= saque) {
    const fazSaque = {
      ...existeCliente.conta,
      saldo: existeCliente.conta.saldo - saque,
    };
  
    contasClientes.map((cliente, index) => {
      if (cliente.id == idCliente) {
        contasClientes[index].conta = fazSaque ;
      }
    });
    return res.status(200).json({
      message: `Saque do cliente ${existeCliente.nome_cliente} realizado com sucesso. Saldo R$ ${fazSaque.saldo}`,
  })
  }  
  return res.status(403).json({ messagem: "Saldo insuficiente"});  
  }
  

//- Encerrar contas de clientes
const destroi = (req, res)=>{
    const idCliente = req.params.id
    
    const existeCliente = contasClientes.find(cliente => cliente.id == idCliente )

    if(existeCliente){
        contasClientes.map((cliente, index)=>{
            if(cliente.id == idCliente ){
                contasClientes.splice(index,1)
            }
        })

        return res.status(200).json({
            message:"Cliente apagado com sucesso",
            cliente: existeCliente
        }
        )
    }

    return res.status(404).json({ 
        message:`Não foi possível apagar o usuário, pois não foi encontrado`
    })
}

module.exports = {
    deposita,
    saca,
    destroi
}