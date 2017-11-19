onload= function(){
    prepareInputTable();
    prepareKarnaughTable();
    for(var i=0; i<16; i++) {
	document.querySelector("#i_"+bin4(i)).addEventListener("input", onInputCallback );
	document.querySelector("#i_"+bin4(i)).addEventListener("click", onClickCallback );
	document.querySelector("#K_"+bin4(i)).addEventListener("input", onInputCallback );
	document.querySelector("#K_"+bin4(i)).addEventListener("click", onClickCallback );
    }
}

bin4= function( i ){ // for 0<= i<16 returns four-bit binary representation of i
    return (i+16).toString(2).slice(1);
}

prepareInputTable= function() {
    var table = document.getElementById("TableInput");
    for(var i=0 ; i<16; i++) {
	var row = table.insertRow(1+i);
	row.id="input"+i;
	var cell0 = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	cell0.innerHTML = "<strong>"+i+"</strong>";
	cell1.innerHTML = "<strong>"+bin4(i)+"</strong>";
	cell2.innerHTML = '<input id="i_'+bin4(i)+'" type="text" name="0000" value="" maxlength="1" size="1">';
    }
}

prepareKarnaughTable= function() {
    var g = [ '00', '01', '11', '10' ];
    var table = document.getElementById("TableKarnaugh");
    for(var ab=0 ; ab<4; ab++) {
	var row = table.insertRow(1+ab);
	var cell0 = row.insertCell(0);
	cell0.innerHTML = "<strong>"+g[ab]+"</strong>";
	for( cd=0; cd<4; cd++) {
	    var cell= row.insertCell(1+cd);
	    cell.innerHTML = '<input id="K_'+g[ab]+g[cd]+'" type="text" name="0000" value="" maxlength="1" size="1">';
	}
    }
}




onInputCallback= function( e ) {
    // alert(""+e.target.id+":"+e.target.value)
    var id=e.target.id.slice(2);
    var value=e.target.value;
    document.querySelector("#K_"+id).value=value;
    document.querySelector("#i_"+id).value=value;
}

onClickCallback= function( e ) {
    e.target.select();
}
