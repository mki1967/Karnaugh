
var bits=0; // output base
var decimalInput="0";
onload= function(){
    bits=document.querySelector("#InputBits").value;
    decimalInput=document.querySelector("#InputDecimal").value    
    document.querySelector("#SpanBits").innerHTML="<code>"+bits+"</code>";
    document.querySelector("#SpanDecimal").innerHTML="<code>"+decimalInput+"</code>";
    document.querySelector("#SpanABS").innerHTML="<code>"+ABS(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU1").innerHTML="<code>"+U1(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU2").innerHTML="<code>"+U2(decimalInput, bits)+"</code>";

    
    document.querySelector("#InputDecimal").addEventListener("input", onInputDecimal );
    document.querySelector("#InputDecimal").addEventListener("click", onClickCallback );
    document.querySelector("#InputBits").addEventListener("input", onInputBits );
    document.querySelector("#InputBits").addEventListener("click", onClickCallback );
};

onInputDecimal= function(e){
    var value=e.target.value;
    if( isNaN(value) ) return; // protection against NaN
    if( value.includes('e') || value.includes('E') ) return; // protection against scientific (exponent) notation
    decimalInput=value;
    document.querySelector("#SpanDecimal").innerHTML="<code>"+decimalInput+"</code>";
    document.querySelector("#SpanABS").innerHTML="<code>"+ABS(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU1").innerHTML="<code>"+U1(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU2").innerHTML="<code>"+U2(decimalInput, bits)+"</code>";
}

onInputBits= function(e){
    var value=e.target.value;
    if( value<2 || value >32 ) return; // invalid bits
    bits= value;
    document.querySelector("#SpanABS").innerHTML="<code>"+ABS(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU1").innerHTML="<code>"+U1(decimalInput, bits)+"</code>";
    document.querySelector("#SpanU2").innerHTML="<code>"+U2(decimalInput, bits)+"</code>";
    document.querySelector("#SpanBits").innerHTML="<code>"+bits+"</code>";
}


onClickCallback= function( e ) {
    e.target.select();
}

ABS= function( decimalInput, bits ){
    var out=(Math.abs(Number(decimalInput)).toString(Number(2)));
    var len=out.length;
    if( len>bits ) return "YOU NEED MORE BITS ...";
    for( var i=len; i<bits; i++) out= "0".concat(out);
    return out;
}

NEG= function( bin ) { // bin is a string of either "0" or "1"
    out="";
    for(var i=0; i<bin.length; i++) {
	if(bin[i]=='0') out=out.concat('1'); else out=out.concat('0');
    }

    return out;
}

OnlyOnes = function( bin ){
    for(var i=0; i<bin.length; i++)
	if( bin[i] != "1" ) return false;
    return true;
}

OnlyZeroes = function( bin ){
    for(var i=0; i<bin.length; i++)
	if( bin[i] != "0" ) return false;
    return true;
}

U1= function(decimalInput, bits){
    var abs=ABS(decimalInput, bits);
    if( isNaN(abs) ) return abs;
    if( abs[0]=="1" ) return "YOU NEED MORE BITS FOR U1...";
    if( Number(decimalInput) > 0 ) return abs;
    var neg=NEG(abs);
    if( Number(decimalInput) == 0 ) return abs+" / "+neg;
    if( OnlyOnes(neg) ) return "YOU NEED MORE BITS FOR U1...";    
    return neg;
}

addOne= function( bin ){
    x=parseInt(bin, 2);
    x=x+1;
    return x.toString(2);
}

U2= function(decimalInput, bits){

    var abs=ABS(decimalInput, bits);
    if( isNaN(abs) ) return abs;
    if( abs[0]=="1" &&  Number(decimalInput) >= 0 ) return "YOU NEED MORE BITS FOR U2...";
    if( Number(decimalInput) >= 0 ) return abs;

    if( abs[0]=="1" &&  !OnlyZeroes(abs.slice(1)) ) return "YOU NEED MORE BITS FOR U2...";
    var neg=NEG(abs);
    out= addOne( neg );
    return out;
}
