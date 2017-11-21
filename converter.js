
var base=2; // output base
var decimalInput="0";
onload= function(){
	document.querySelector("#InputDecimal").addEventListener("input", onInputDecimal );
	document.querySelector("#InputDecimal").addEventListener("click", onClickCallback );
	document.querySelector("#InputBase").addEventListener("input", onInputBase );
	document.querySelector("#InputBase").addEventListener("click", onClickCallback );
};

onInputDecimal= function(e){
    var value=e.target.value;
    decimalInput=value;
    document.querySelector("#SpanOutput").innerHTML="<code>"+(Number(decimalInput).toString(Number(base)))+"</code>";
    document.querySelector("#SpanPrecise").innerHTML="<code>"+preciseString( decimalInput, Number(base)  )+"</code>";
}

onInputBase= function(e){
    var value=e.target.value;
    if( value<2 || value >36 ) return; // invalid base
    base= value;
    document.querySelector("#SpanOutput").innerHTML="<code>"+(Number(decimalInput).toString(Number(base)))+"</code>";
    document.querySelector("#SpanPrecise").innerHTML="<code>"+preciseString( decimalInput, Number(base)  )+"</code>";
    document.querySelector("#SpanBase").innerHTML="<code>"+base+"</code>";
}


onClickCallback= function( e ) {
    e.target.select();
}

preciseString= function( decimalString, base ) {
    var out="";
    var period="";
    var history=[];
    var dotIdx = decimalString.indexOf('.');
    if  (dotIdx == -1) {
	return Number(decimalString).toString(Number(base)); // no dot, no fraction
    }

    var integerOutput = Number(decimalString.slice(0,dotIdx)).toString(Number(base))
    var fractionalString= decimalString.slice(dotIdx+1);
    var fracDigits= fractionalString.length;
    if ( fracDigits == 0){
	return integerOutput; // with dot but no fraction
    }
    var denominator=1;
    for(var d=0; d<fracDigits; d++) denominator*=10;
    
    fractional = Number(fractionalString);
    
    while(fractional != 0 && history.findIndex( x => (x == fractional) ) == -1 ) {
	history.push(fractional);
	var m= fractional*base;
	fractional=m % denominator; // remaining fractional
	out = out+(((m-fractional)/denominator).toString(Number(base))); // append digit
    }

    var period="";
    if(fractional != 0) { // periodic fraction
	var idx=history.findIndex( x => x == fractional );
	period=out.slice(idx);
	out= out.slice(0,idx);
	return integerOutput+"."+out+"("+period+")";
    }

    return integerOutput+"."+out+"  "+period; // perid should be ""

}

