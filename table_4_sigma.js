onload= function(){
    prepareInputTable();
    prepareKarnaughTable();
    for(var i=0; i<16; i++) {
	document.querySelector("#i_"+bin4(i)).addEventListener("click", onClickCallback );
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
	cell2.innerHTML = "<strong>"+mString(bin4(i))+"</strong>";
	cell1.innerHTML = '<input id="i_'+bin4(i)+'" type="checkbox">';
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
	    cell.innerHTML = '<input id="K_'+g[ab]+g[cd]+'" type="text"  value="0" maxlength="1" size="1" readonly>';

	}
    }
}

mString= function ( bin ) { // bin is a string of four characters, either '0' or '1'
    var vars=['A','B','C','D']
    var prime= ["'"," "];
    var out="";
    for( var i=0 ; i<4; i++ ) {
	out=out.concat(vars[i])
	if(bin[i]=='0') out=out.concat("'"); else out=out.concat(" ");
	if(i<3) out=out.concat("*");
    }
    return out;
}



onClickCallback= function( e ) {
    for(var i=0; i<16; i++) {
	id=bin4(i);
	if( document.querySelector("#i_"+id).checked ) value=1; else value=0;
	document.querySelector("#K_"+id).value=""+value;		
    }
    
}
