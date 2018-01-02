function defineStructure(){}
function onSync(lastSyncDate){}
function onMobileSync(user){}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	//Cria as colunas
	dataset.addColumn("ID");
	dataset.addColumn("User Name");
	dataset.addColumn("Password");
	
	try{
		// REST
        	var clientService = fluigAPI.getAuthorizeClientService();
        
		// Parametros
		var data = {
			companyId : getValue("WKCompany") + '',
			serviceCode : 'FakeAPI', // Campo Nome no cadastro do serviço
			endpoint : '/api/users',
			method : 'get',
			timeoutService: '10' // segundos
		}

		// Dispara requisição GET para http://fakerestapi.azurewebsites.net/api/users
		var vo = clientService.invoke(JSON.stringify(data));

		if(vo.getResult()== null || vo.getResult().isEmpty()){
			throw new Exception("Retorno está vazio");
		}else{
			log.info(vo.getResult());
		}

		var jsonParse = JSON.parse(vo.getResult());

		//Cria os registros para o Dataset
		for(var i=0; i<jsonParse.length; i++){
			dataset.addRow(new Array(jsonParse[i].ID, 
					jsonParse[i].UserName, 
					jsonParse[i].Password));
		}

	} catch(err) {
		throw new Exception(err);
	}
	
    	return dataset;
}
