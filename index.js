module.exports = async function (context, req) {
    //runs only if the input info has data property
    
    if (req.body.data) {    
        let doc = req.body

//Save original data at webhooks collection
        context.bindings.statusChange = doc;
        doc.failure_id = doc.data.id

//Create new object
        let novoEventoJSON = {"failure_id": null,};
        let last = null

//Verifica se é evento fechamento e cria visita se for
        if(doc.data.attributes.state == "COMPLETED"){

// Query last in_progress state
        last = context.bindings.inputDocument;
        //JSON.parse(last);
        //context.log(last)

// Transfer data from trigger and input bindings
        novoEventoJSON.failure_id = doc.data.id;
        novoEventoJSON.state = doc.data.attributes.state;
        novoEventoJSON.inicio = "last._ts";
        //novoEventoJSON.termino = last.data.attributes.state;
        novoEventoJSON.description = doc.data.attributes.description;

// Output new object to events collection
        context.bindings.novoEvento = novoEventoJSON;
        }

// Notify success, http status code 201 (created)
        context.res = {
            status: 201,
            body: last
        };
        return;
    }

// Notify failure, http status code 400 (error)
    context.res = {
        status: 400,
        body: "error, data do not exist"
    };
}
