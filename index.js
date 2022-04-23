module.exports = async function (context, req) {
    //runs only if the input info has data property
    
    if (req.body.data) {    
        let doc = req.body
//Save original data at webhooks collection
        context.bindings.statusChange = doc;
        doc.failure_id = doc.data.id
        //let last = context.bindings.inputDocument; //agora falta SQL do último evento

//Create new object
        let novoEventoJSON = {"failure_id": null,"status": null};
        
//Verifica se é evento fechamento e cria visita se for
        if(doc.data.attributes.state == "COMPLETED"){

// Transfer data from trigger and input bindings
        novoEventoJSON.failure_id = doc.data.id;
        novoEventoJSON.status = doc.data.status;
        novoEventoJSON.state_description = doc.data.attributes.state_description;
        novoEventoJSON.comentario = "encontrou um evento completo e cria este arquivo"

// Output new object to events collection
        context.bindings.novoEvento = novoEventoJSON;
        }

// Notify success, http status code 201 (created)
        context.res = {
            status: 201,
            body: "foi"
        };
        return;
    }

// Notify failure, http status code 400 (error)
    context.res = {
        status: 400,
        body: "error, data do not exist"
    };
}
