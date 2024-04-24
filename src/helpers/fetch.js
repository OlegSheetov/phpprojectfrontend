
/*
 * fetch - делает запрос на REST API
 * @param Method - ДОЛЖЕН БЫТЬ СТРОКОЙ и это должен быть либо POST\GET 
 * @param toDoOnResponse - ДОЛЖЕН БЫТЬ ФУНКЦИЕЙ которая будет делать что либо 
 * с прилетевшим json
 *
 */
export default function Fetch(Method, formData, toDoOnResponse) { 
    if(Method == 'GET' && typeof Method === 'string'){ 
       fetch("http://localhost:80/backend/index.php", { method: Method})
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((json) => {
                toDoOnResponse(json)
            })
           .catch(error => console.log('error', error));
        
    }

    else if(Method == 'POST' && typeof Method === 'string'){
        
        let payload = new FormData();
        for (const property in formData){
            payload.append(`${property}`,  formData[property]);
        }

        fetch(
            "http://localhost:80/backend/index.php", 
            { 
                method: Method ,
                body: payload
            })
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(json => {
                toDoOnResponse(json)
            })
           .catch(error => console.log('error', error));
    }
    else { 
        console.log("Method isn't string or not like http method");
    }




    }

