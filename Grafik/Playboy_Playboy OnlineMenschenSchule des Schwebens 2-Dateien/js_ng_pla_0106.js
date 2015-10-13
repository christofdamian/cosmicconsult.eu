// version fuer dart
 
//030
adsg_dbgmsg=" \nVersion 0.30\n ";         
//  debug html debug on ist platzhalter/keine technische relevanz


var tiletype="tile";
//für ptile variante
var adsc_tile=0; 
//tilenummer: wird inkrementiert
var adsc_adid1=0,adsc_adid2=0,adsc_adid4=0,adsc_adid6=0,adsc_adid12=0,adsc_adid8=0;
//für die adids


adsg_katprozent = new Array();
//  das array für die prozentwerte der einzelnen slots

adsg_size = new Array();
//  für die slotgrössen und für dart adids

adsg_dbginit="0";
// dbginit ist dbg eingeschaltet wenn nein schreib layer und dbginit=2


 

var adsg_debug="",adsc_debug="";
//  debug status --on/onv ab2.0 nur noch on wegen fehlender trace styles in dfp


var adsg_site="playboy";            
//----->id der site

var adsg_icpsite="548&icpsite=48";         
//----->nummer der site

var adsg_cnttop='  ';
var adsg_cntbot='  ';

 

// adsg_cnttop='<div id="ad_cntad" style="position:relative;  border:0px; padding-top:12px; padding-bottom:10px; background-image:url(http://i.tfag.de/js_ng/ad_werbung02.gif); background-repeat:no-repeat;  ">';
//adsg_cntbot='</div>'; 
// inline style für das contentad
adsg_cntstyle="";      
//adsg_cntstyle="<style type='text/css'><!-- .adsg_cntad{ position:relative;  border:0px; padding-top:12px; padding-bottom:10px; background-image:url(http://i.tfag.de/js_ng/ad_werbung02.gif); background-repeat:no-repeat;  }--> \n </style>";
adsg_skystyle="<style type='text/css'><!-- .adsg_skyad{ position:absolute; left:860px; top:260px; z-index:990  }--> \n </style>";
document.write(adsg_skystyle);   

//----------------------------------------------------------------
// sitearray  asym  das addon der asym seiten, die abweichend
// von den anderen seiten per location identifiziert werden
//------------------------------------------------------------
 
adsg_nsiteloc=document.location.href;
if((adsg_nsiteloc.indexOf("yam.de")!=-1)||(adsg_nsiteloc.indexOf("maedchen.de")!=-1)||(adsg_nsiteloc.indexOf("musikexpress.de")!=-1)||(adsg_nsiteloc.indexOf("rollingstone.de")!=-1)||(adsg_nsiteloc.indexOf("hammer-mag.de")!=-1)||(adsg_nsiteloc.indexOf("starflash.de")!=-1)||(adsg_nsiteloc.indexOf("me.streams-pur.de")!=-1)||(adsg_nsiteloc.indexOf("212.172.17.63")!=-1)||(adsg_nsiteloc.indexOf("212.172.17.56")!=-1)||(adsg_nsiteloc.indexOf("jolie.de")!=-1)||(adsg_nsiteloc.indexOf("yam.msn.de")!=-1)){          
var adsg_nsitestr=new Array("yam.de","maedchen.de","musikexpress.de","rollingstone.de","hammer-mag.de","starflash.de","me.streams-pur.de", "212.172.17.63", "212.172.17.56", "jolie.de","yam.msn.de");
var adsg_nsitenr=new Array("600","601","602","603","604","605","602","600","606","606","600");
var adsg_nsiteid=new Array("yam","maed","mxp","rolst","hamm","star","mxp","yam","jolie","jolie","yam");

for (adsc_si=0;adsc_si<adsg_nsitestr.length;adsc_si++) {
if (adsg_nsiteloc.indexOf(adsg_nsitestr[adsc_si])!=-1) {
var adsg_site=adsg_nsiteid[adsc_si];
var adsg_icpsite=adsg_nsitenr[adsc_si]; 
debout("matched_site:"+adsg_nsiteid[adsc_si]+","+adsg_nsitenr[adsc_si]);
}
debout("site:"+adsg_nsiteid[adsc_si]+","+adsg_nsitenr[adsc_si]+""+adsc_si);
}
debout("s:"+adsg_icpsite+","+adsg_site);
}
//------------------------------------------------------------
// sitearray  asym ende
// --------------------------------------------------------------
    
//globale prozentwerte (werden von kleineren werten in adsc_gettag überschrieben)
adsg_katprozent[1]=100; //banner
adsg_katprozent[2]=100; //contentad
adsg_katprozent[4]=60;  //popup entfällt (interstitial)
adsg_katprozent[6]=100; //skyscraper



// Klcso 2004.02-09 um mehrere werte für sz und adsize setzen zu können
adsg_size[1]="dcopt=ist;";   
//banner NWC
adsg_size[2]=""; 
//contentad
adsg_size[4]="";                
//popup  entfällt(interstitial tags)
adsg_size[6]="1x2";                
//skyscraper
 
adsg_katval = new Array("00","BANNER","CONTENTAD","03","POPUP","05","SKYSCRAPER","07","TEXTAD","09","10","11","COUNT");
var adsg_params=(window.location.search);
adsg_debugmode=adsc_getParams(adsg_params,'jsdbug','&');  

//test debugon  ------------------- bitte entfernen, nur für lokalen test
//adsg_debugmode="on";

if (adsg_debugmode){adsg_debug=adsg_debugmode;}
debout("page_debug= "+adsg_debugmode);      

var adsg_adkeyword=adsc_getParams(adsg_params,'adkeyword','&');
if (adsg_adkeyword){adsc_keyword=adsg_adkeyword;}

var adsg_adkeyword2=adsc_getParams(adsg_params,'showroom','&');//showroom
if (adsg_adkeyword2){adsc_keyword=adsg_adkeyword2;}//showroom
 

var adsc_isegm="",adsa_isegm="";
var adsc_location=( ! document.location ? 'nourl' : document.location.href);
adsc_location=adsc_location.replace('http://', '/');                                                       
adsc_location=adsc_location.replace('&', '/'); 
adsc_location=adsc_location.replace('?', '/');  //reinigt die url hängt - an, um target page von directory zu trnnen

debout(adsc_location);
var adsc_transid=(Math.round(Math.random()*9999999)); 
//hier wird die zufalls-transaction-ord-id für den seitenaufruf hergestellt  

var adsc_percval=(Math.round(Math.random()*100));  
//zufallszahl fuer prozentuale auslieferungssteuerung in katprozent   

function ads_writetag(adsc_type,adsc_width,adsc_height,adsc_perc){ 
document.write(ads_gettag(adsc_type,adsc_width,adsc_height,adsc_perc));
}
      

/*
================
GET TAG FUNKTION                                         
================
*/
function ads_gettag(adsc_type,adsc_width,adsc_height,adsc_perc){ 

adsc_tile++;                          
//inkrementiert die tilenummer bei jedem aufruf der funktion

adsc_type=getAdType(adsc_type);       
//holt den adtype aus dem array

ad_size=adsg_size[adsc_type];         
//holt die zum typ passende grösse aus dem dafür vorgesehenen array

adsc_dartsize=adsg_size[adsc_type]; 
//dartsizes sind in dem array +10

if (adsc_perc>=adsg_katprozent[adsc_type]){
adsc_perc=adsg_katprozent[adsc_type];   //    setzt das katprozent
}   
adsc_tagout="<!--nix-->";    //der nix-kommentar wird bei chip z.b. erwartet
debout("Schreibe Tag:"+adsc_type+"-"+adsc_width+"-"+adsc_height+"-"+adsc_perc+"  \n\r IDS: 1:"+adsc_adid1+" 2:"+adsc_adid2+" 4:"+adsc_adid4+" 6:"+adsc_adid6);
if (adsc_perc>=adsc_percval){ 
debout(adsc_perc+'>='+adsc_percval);    
if (adsc_keyword!="") {
adsc_isegm=adsc_isegm+"kw="+adsc_keyword+";";
debout("page_keyword= "+adsc_keyword+" gefunden");  
adsc_keyword="";
}             

if (adsa_isegm!="") {
if (adsa_isegm=="flashlayer"){
adsc_isegm=adsc_isegm+"!category=flashlayer;";
}else{
adsc_isegm=adsc_isegm+"kw="+adsa_isegm+";"; } 
debout("isegment "+adsa_isegm+" gefunden");  
adsa_isegm="";
}  


//alle sonderfälle für adsizes und fehlimplementierungen des scripts

if (adsc_type==6){adsc_width=1;adsc_height=2;}    
//if(adsc_width==728&&Math.round(Math.random()*10)>=8){adsc_width=468;adsc_height=60; }//2005-01-03 hack fur dartsize 468
if(adsc_width==468&&adsc_rubrik==4011941030){adsc_width=728;adsc_height=90;} //2005-01-31 hack für Exclusive AD auf Mobil
//if(adsc_type==1){tiletype="ptile";} //Hack für TandemAds/ptile
if(adsc_height==250&&adsc_ressort==300100&&Math.round(Math.random()*10)>=5){adsc_width=300;adsc_height=100;}//2005-01-10 cs hack fur msn HP ContnetAD
if(adsc_type==8){adsc_width=2;adsc_height=2; }//2005-01-10 cs hack fur TextAd  
if(adsc_width==728&&adsg_nsiteloc.indexOf("antenne.de")!=-1){adsc_width=468;adsc_height=60; }//2005-01-27 cs hack fur ANTENNE wegen 728 Format BUG

adsc_darturl="http://ad.de.doubleclick.net/adj/"+adsg_site+"_"+adsc_ressort+"/"+adsg_site+"_"+adsc_ressort+"_"+adsc_rubrik+"_"+adsc_type+";site="+adsg_site+";res="+adsc_ressort+";"+adsg_size[adsc_type]+"rub="+adsc_rubrik+";tile="+adsc_tile+";sz="+adsc_width+"x"+adsc_height+";"+adsc_isegm+"tp="+adsc_location+";ord="+adsc_transid+"?";

adsc_tagout="<script language='javascript' src='"+adsc_darturl+"'></script>"; 
if (adsc_type==2){ 
adsc_tagout=adsg_cnttop+adsc_tagout+adsg_cntbot;
}
 

if (adsc_type==4){debout("kein popup");adsc_tagout="<!--ist-->"; }
debout('\n'+adsc_darturl.replace('adj', 'adi')+'\n');    

}
return adsc_tagout;
}    


function adsc_getParams(adsc_scringo,adsc_sname,adsc_splitter) {
adsc_scringo_split = adsc_scringo.split(adsc_splitter);
for (adsc_i=0;adsc_i<adsc_scringo_split.length;adsc_i++) {
var adsc_part_of_split = adsc_scringo_split[adsc_i];
var adsc_find_name = adsc_part_of_split.indexOf(adsc_sname);
if (adsc_find_name!=-1) {
var adsc_equal = adsc_part_of_split.indexOf("=") + 1;
var adsc_value_of_split = adsc_part_of_split.substring(adsc_equal,adsc_part_of_split.length);
return adsc_value_of_split; 
}}}      



function debout(dbgval){
adsg_dbgmsg=adsg_dbgmsg+dbgval+"\n";
if (adsg_debug=="on"){
if (adsg_dbginit==0){    
adsg_dbginit=2;
document.write('<div id=jsdebug style="position:absolute; top:1px; left:1000px;  text-align:left; font-family:Fixedsys,Courier;"><textarea id=jssdebug cols=80 rows=100></textarea></div>');
}
document.getElementById("jssdebug").value=adsg_dbgmsg;
}}  

function getAdType(a) {
if (a && String(a) == String(parseInt(String(a)))) return parseInt(String(a));
for (i=0;i<adsg_katval.length;i++){if(adsg_katval[i]==a.toUpperCase()) return i;}
return '0';
}
    

  