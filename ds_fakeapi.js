function defineStructure(){}
function onSync(lastSyncDate){}
function onMobileSync(user){}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var vo = null;
	
	// REST
	try{
        var clientService = fluigAPI.getAuthorizeClientService();
        
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'FakeAPI',
            endpoint : '/api/users',
            method : 'get',
            timeoutService: '15' // segundos
        }
        
        vo = clientService.invoke(JSON.stringify(data));
 
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw new Exception("Retorno está vazio");
        }else{
            log.info(vo.getResult());
        }
        
        var jsonParse = JSON.parse(vo.getResult());
        
        //Cria as colunas
        dataset.addColumn("ID");
        dataset.addColumn("User Name");
        dataset.addColumn("Password");
        
        //Cria os registros
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