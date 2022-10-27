Passo a Passo da Estrutura MVC


01 PASSO:

1 - Instalou a node_modules e demais dependencias como express e nodemon;
2 - Criei do arquivo git ignore para ignorar a Node_modules;
3 - Criei arquivo Server.js que faz importe de outros arquivos e rodar o servidor na porta 3333;

02 PASSO:

1 - Criei uma pasta chama SRC
2 - Dentro da SRC criei mais tres pastas: Controllers, Models e Routes

03 PASSO - MODEL:

1 - Dentro da pasta MODEL, copiei o arquivo chamado 'contas-clienteModel.json' que é um arquivo Json que contem todos os dados dos clientes,funcionando como um banco de dados.

04 PASSO - CONTROLLER:

1 - Dentro da pasta CONTROLLER, criei um arquivo chamado 'contas-clienteController.js' onde fica todas as funcoes para criar, filtrar, atualizar e deletar clientes e transacoes bancarias.
2 - Fiz o importe do nosso "banco de dados" que seria o 'contas-clienteModel.json' que está na pasta MODEL.
2 - Exportei as funções ao final do arquivo para que pudessem ser acessadas pelo arquivo de Rotas.

05 PASSO - ROUTES:

1 - Dentro da pasta ROUTES, criei um arquivo chamado 'contas-clienterRoutes.js' onde fica todas as rotas que serão utilizadas pelas funcões criar, filtrar, atualizar e deletar que estão no arquivo da pasta CONTROLLER, o qual fiz o importe.



