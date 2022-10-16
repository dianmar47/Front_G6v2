//GET, POST , PUT Y DELETE

function getMachine (){
    $.ajax({
        url:"http://192.9.129.41:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarMachine(respuesta);
        }
    });

}

function postMachine(){
    if($("#name").val().length==0 || $("#brand").val().length==0|| $("#year").val().length==0  ||  $("#description").val().length==0 ||$("#select-categoria").val().length==0  ){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://192.9.129.41:8080/api/Machine/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la maquina");
            window.location.reload();
    
        }
    });

    }
}

function putMachine(id_desdeBoton){

    if($("#name").val().length==0 || $("#brand").val().length==0|| $("#year").val().length==0  ||  $("#description").val().length==0 ||$("#select-categoria").val().length==0  ){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        id: id_desdeBoton,
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://192.9.129.41:8080/api/Machine/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion de la máquina");
            window.location.reload();
    
            }
        });
    }
    

}



function deleteMachine(id_desdeBoton){
    let cajas = {
        id:id_desdeBoton,
                    
    };
    $.ajax({
        url:"http://192.9.129.41:8080/api/Machine/" + id_desdeBoton,
        type:"DELETE",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se borró correctamente la informacion de la máquina");
            window.location.reload();
    
            }
        });
    }
    


////////////////////////////////////////////////////////

function pintarMachine(json_maquinas){


    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    let NOMBRE = "NOMBRE";
    let BRAND = "MARCA";
    let YEAR = "AÑO";
    let DESCRIPTION    = "DESCRIPCIÓN";
    let CATEGORY    = "CATEGORIA";
    
    myTable+="<th>"+NOMBRE+"</th>";

    myTable+="<th>"+BRAND+"</th>";

    myTable+="<th>"+YEAR+"</th>";

    myTable+="<th>"+DESCRIPTION+"</th>";
    myTable+="<th>"+CATEGORY+"</th>";
    
    for(i=0;i<json_maquinas.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_maquinas[i].name+"</td>";
        myTable+="<td>"+json_maquinas[i].brand+"</td>";
        myTable+="<td>"+json_maquinas[i].year+"</td>";
        myTable+="<td>"+json_maquinas[i].description+"</td>";
        myTable+="<td>"+json_maquinas[i].category.name+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putMachine("+json_maquinas[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteMachine("+json_maquinas[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMachine").html(myTable);

}

function getCategoria_Machine(){
    
    $.ajax({
        
        url:"http://192.9.129.41:8080/api/Category/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>')
            })
        }
    });
}
