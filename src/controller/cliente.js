const clientList = require('../model/contas-clientes')
const { v4: uuidv4 } = require("uuid");



const createClient = (req, res) => {
  const { client_name, client_cpf, birthdate, email, account } = req.body;

  const id = uuidv4();
  const accountNumber = parseInt(Math.random() * 10000000);
  const creationDate = new Date().toISOString();

  const newClient = {
    id,
    client_name,
    client_cpf,
    birthdate,
    email,
    account: {
      Number: accountNumber,
      balance: 0,
      creationDate: creationDate,
    },
  };
  clientList.push(newClient);
  return res.status(201).json(newClient);
};

const updateClients = (req, res) => {
  const clientID = req.params.id;
  const { client_name, email } = req.body;

  const client = clientList.find((client) => client.id == clientID);

  if (client) {
    const updatedClient = {
      ...client,
      client_name,
      email,
    };
    clientList.map((cliente, index) => {
      if (client.id == clientID) {
        clientList[index] = updatedClient;
      }
    });
    return res.status(200).json({
      message: `Client ${client.client_name} was successfully updated.`,
    });
  }
  return res.status(404).json({ message: `Cliente não encontrado.` });
};


const deleteClients = (req, res) => {
    const clientID = req.params.id;
  
    const client = clientList.find((client) => client.id == clientID);
  
    if (client) {
      clientList.map((client, index) => {
        if (client.id == clientID) {
          return clientList.splice(index, 1);
        }
      });
  
      return res
        .status(200)
        .json({ message: "Account deleted:", client: client });
    }
    return res.status(404).json({ message: `Client not found.` });
  };


const listALL = (req, res) => {
    res.json(clientList);
  };


const filterClients = (req, res) => {
  const filterName = req.query.client_name;
  const filterCpf = req.query.client_cpf;
  const filterEmail = req.query.email;
  const filterBalance = req.query.balance;

  const client = clientList.filter((item) => {
    if (filterName) {
      return (
        item.client_name.toLowerCase().replace(/ /g, "") ==
        filterName.toLowerCase().replace(/ /g, "")
      );
    }
    if (filterCpf) {
      return (
        item.client_cpf.replace(/[^\d]/g, "") ==
        filterCpf.replace(/[^\d]/g, "")
      );
    }
    if (filterEmail) {
      return item.email === filterEmail;
    }
    if (filterBalance) {
      return item.account.balance == filterBalance.balance;
    }
    return item;
  });
  res.json(client);
};

const listClientsByID = (req, res) => {
  const id = req.params.id;

  const client = clientList.filter((item) => item.id == id);
  res.json(client);
};


module.exports = {
  createClients: createClient,
  updateClients: updateClients,
  deleteClients: deleteClients,
  listALL: listALL,
  filterClients,
  listClientsByID,
};
