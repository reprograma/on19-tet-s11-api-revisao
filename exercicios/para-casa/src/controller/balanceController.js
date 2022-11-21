const clientsModel = require('../models/clientsModel.json')

//Atividade 5: Fazer depósitos/pagamentos usando o saldo de sua conta

const payment = (req, res) => {
    const idClient = req.params.id;
    const {"Payment Value": payment} = req.body;

    const thereIsTheClient = clientsModel.find((client) => client.id == idClient);

    if(thereIsTheClient){
        if(thereIsTheClient.conta.saldo > payment) {
            const proceedPayment = {
                ...thereIsTheClient,
                conta: {
                    ...thereIsTheClient.conta,
                    saldo: thereIsTheClient.conta.saldo - payment}
                }

                clientsModel.map((client, index) => {
                    if (client.id == idClient) {
                        clientsModel[index] = proceedPayment
                    }
                });
                return res.status(200).json({ message: "Your payment has been processed successfully!" });
        } 
        return res.status(403).json({ message: "Unable to process payment: Low account balance"}); // STATUS CODE: 403 = Forbidden
    }
        return res.status(404).json({ message: `Can't find the client ${idClient}` }); //STATUS CODE: 404 = NOT FOUND
}


const deposit = (req, res) => {
    const idClient = req.params.id;
    const {"Deposit value": deposit} = req.body;

    const thereIsTheClient = clientsModel.find((client) => client.id == idClient);

    if (thereIsTheClient){
        const proceedDeposit = {
            ...thereIsTheClient,
            conta: {
                ...thereIsTheClient.conta,
                saldo: thereIsTheClient.conta.saldo + deposit }
            }
            
            clientsModel.map((client, index) => {
                if (client.id == idClient){
                    clientsModel[index] = proceedDeposit
                }
            });
            return res.status(200).json({message: "Successfully updated balance!"}); // STATUS CODE: 200 = OK
    }
        return res.status(404).json({ message: `Can't find the client ${idClient}` }); //STATUS CODE: 404 = NOT FOUND
}
       
module.exports = {
    payment,
    deposit
}

