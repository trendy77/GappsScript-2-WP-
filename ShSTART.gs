
function staMPLT(siteId,ssid){
var ss = SpreadsheetApp.openById(ssid);
   sheetSet(ssid);
  
  if( siteId == 'fnr'){
    fnr(line);
} if (line == 3){
  ckww(line);
}
  if (line == 4){
  vape(line);
  }
    if( line == 5){
     gov(line); 
    }
      if( line == 6){
        glo(line);
      }
        if( line == 7){
        orgbiz(line);  
        }
          if( line == 8){
            tp(line);
          }
}



function ckwwes(index){
// open sheet 
 var line =index;
var site='https://es.customkitsworldwide.com'; 
var id = 'ckww'; var siteT = 'CustomKitsWorldwide';  var id='ckwwes';
var suc=0;var fail=0; var sent=0; 
var newID = {site: site, ssiteT: siteT,line:line, id:id, sent:sent,suc:suc,fail:fail};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
  return line;
}
function ckww(index){
var line =index;
var site='https://customkitsworldwide.com'; 
var id = 'ckww'; var siteT = 'CustomKitsWorldwide';  var id='ckwwes';
var suc=0;var fail=0; var sent=0; 
var newID = {site: site, ssiteT: siteT,line:line, id:id, sent:sent,suc:suc,fail:fail};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
  return line;
}
function gov(index){
var line =index;var site = 'https://govnews.info'; var siteT = 'GovNews';var siteTE=0; var id = 'gov'; var suc=0;var sucE=0;var siteE = 0;var failE=0; var fail=0; var sent=0;  var sentE=0; var tagged=0; var notTagged=0;var ides='ides';
var newID = {site: site, siteE:siteE, siteTE:siteTE, siteT: siteT,line:line, ides:ides,  id:id, sent:sent,sentE:sentE,sucE:sucE,suc:suc,fail:fail,failE:failE};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
  return line;
}
function vape(index){
var line =index; var site = 'https://vapedirectory.co';  var siteT = 'VapeDirectory';  var id = 'vape';     
var suc=0;var sucE=0;var failE=0; var fail=0; var sent=0;  var sentE=0;var siteTE=0; var siteE=0; 
var newID = {site: site, siteT: siteT,line:line, id:id, sent:sent,suc:suc,fail:fail};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
return line;
}

function glo(index){
var line =index; var site = 'https://globetravelsearch.com';  var siteT = 'GlobeTravelSearch';  var id = 'glo';     
var suc=0;var fail=0; var sent=0; 
var newID = {site: site, siteT: siteT,line:line, id:id, sent:sent,suc:suc,fail:fail};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
return line;
}

//sentE:sentE,sucE:sucE,iteE:siteE, siteTE:siteTE, 
//sentE:sentE,sucE:sucE,siteE:siteE, siteTE:siteTE,ides:ides,  var siteE = 'https://organisemybiz.com/es';failE:failE,var siteTE = 'Organizar-Mi-Noticias'; 
//var sentE=0;var sucE=0;var failE=0; var siteTE='Noticias-del-Equipacion Futbol';var siteE='es.customkitsworldwide.com';  
function tp(index){
var site = 'https://trendypublishing.com';  var line =index; var id = 'tp';
var newID = {line:line, id:id};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
return line;
}
function orgbiz(index){
var site = 'https://organisemybiz.com';  var line =index; var siteT = 'OrganiseMyBiz';    var id = 'orgbiz';
var suc=0;var sucE=0;var failE=0; var fail=0; var sent=0;  var sentE=0; var tagged=0; var notTagged=0;var ides='orgbizes';
var newID = {site: site, siteT: siteT,line:line, id:id, sent:sent,suc:suc,fail:fail, tagged:tagged, notTagged:notTagged};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
return line;
}
//function fnres(index){
///var ides = 'fnres';
//var siteE = 'http://fakenewsregistry.org/es',siteE:siteE, ides:ides,failE:failE,sentE:sentE,sucE:sucE,ides:ides,
///var sucE=0;var failE=0; var sentE=0; siteTE:siteTE,var ides='fnres'
//ScriptProperties.setProperties(newID);
//}

function fnr(index){
 var line =index;var site = 'http://fakenewsregistry.org'; var siteT = 'FakeNewsRegistry';var id = 'fnr'; var siteTE = 'Falsas-Honcho Noticias'; 
var suc=0; var fail=0; var sent=0; var tagged=0; var notTagged=0;
  var newID = {site: site,  siteT: siteT,line:line, id:id, sent:sent,fail:fail, tagged:tagged, notTagged:notTagged};
  var ScriptProperties = PropertiesService.getScriptProperties();
  ScriptProperties.setProperties(newID);
  return line;
}

function sheetSet(ssid) {
 //gets Prev sheet from Overview Doc
 var url = 'https://docs.google.com/spreadsheets/d/1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4/edit#gid=0';
   var ov= SpreadsheetApp.openByUrl(url);
      var sum= SpreadsheetApp.openById(ssid);
//in overview, creates named sheet and sends to itself
     var cop =sum.getSheetByName("Sheet2");
  if(!cop){
    var dest = ov.getSheetByName("TEMPLATE");
  var copy = dest.copyTo(sum);
    dupliSheet(cop,id);
  // 5 sheets made
   }
 SpreadsheetApp.flush();
    return;
  }

  function dupliSheet(cop,id){  
//   duplicates the sheet 5 times  
 var ss = SpreadsheetApp.openById(id);
    var a="Sheet2";var ba="Sheet3";var ca="Sheet4";var dca="Sheet5";
    var sheet2 =ss.insertSheet(a, {template: cop});
    var sheet3 =ss.insertSheet(ca, {template: cop});
    var sheet4 =ss.insertSheet(ba, {template: cop});
    var sheet5 =ss.insertSheet(dca, {template: cop});
    //ss.deleteSheet(cop);
return;
  }

//////   start ---> strtTEMPLT(line,id)  ----> sheetset(id of sheet)  ----->duplisheet ---->

function start(siteId,ssid){
   var ov= SpreadsheetApp.openById(ssid);
startTMPLT(siteId,ssid);
}
