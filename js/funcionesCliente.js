//GET, POST , PUT Y DELETE

function getCliente (){
    $.ajax({
        url:"http://192.9.129.41:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){   
            pintarCliente(respuesta);
        }
    });

}

function postCliente(id_desdeBoton){

    if($("#email").val().length==0 || $("#password").val().length==0|| $("#name").val().length==0  ||  $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
        
    let cajas = {
        id:id_desdeBoton,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://192.9.129.41:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se registro correctamente el cliente");
            window.location.reload();
    
        }
    });

    }
}
    


function putCliente(id_desdeBoton){
    console.log(id_desdeBoton);
    if($("#email").val().length==0 || $("#password").val().length==0|| $("#name").val().length==0  ||  $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            idClient:id_desdeBoton,
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
            
        };
    $.ajax({
        url:"http://192.9.129.41:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion del cliente");
            window.location.reload();
    
            }
        });
    }
    

}

function deleteCliente(id_desdeBoton){
    
        let cajas = {
            idClient:id_desdeBoton,
                        
        };
        $.ajax({
            url:"http://192.9.129.41:8080/api/Client/" + id_desdeBoton,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se borró correctamente la informacion del cliente");
                window.location.reload();
        
                }
            });
      }
    



////////////////////////////////////////////

function pintarCliente(respuesta){

    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    let MENSAJE = "EMAIL";
    let CONTRASEÑA = "PASSWORD";
    let CLIENTE = "NOMBRE";
    let EDAD    = "EDAD";
    
    myTable+="<th>"+MENSAJE+"</th>";

    myTable+="<th>"+CONTRASEÑA+"</th>";

    myTable+="<th>"+CLIENTE+"</th>";

    myTable+="<th>"+EDAD+"</th>";

    

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCliente("+respuesta[i].idClient+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCliente("+respuesta[i].idClient+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);


}