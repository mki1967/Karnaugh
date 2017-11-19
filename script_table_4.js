onload= function(){
    prepareInputTable();
    for(var i=0; i<16; i++) {
	document.querySelector("#input_"+i).addEventListener("input", onInputCallback );
	document.querySelector("#input_"+i).addEventListener("click", onClickCallback );
    }
}

prepareInputTable= function() {
    var table = document.getElementById("inputTable");
    for(var i=0 ; i<16; i++) {
	var row = table.insertRow(1+i);
	row.id="input"+i;
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	cell0.innerHTML = ""+i;
	cell1.innerHTML = ""+(i+16).toString(2).slice(1);
	cell2.innerHTML = '<input id="input_'+i+'" type="text" name="0000" value="" maxlength="1" size="1">';
    }
}


onInputCallback= function( e ) {
    alert(""+e.target.id+":"+e.target.value)
}

onClickCallback= function( e ) {
    e.target.select();
}
