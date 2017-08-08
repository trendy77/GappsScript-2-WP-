// FOR EACH OF THE 'LIVE' DOCS, THIS FUNCTION
    // checks LINES REMAINING, TAGGED or not, and RETURNS SHEET--- NAME/ID/URL/LINES#/TAGGED# 

function NUMTAGchkLIVElines() {
  var overview = SpreadsheetApp.openById('1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4'); var newSH = overview.getSheetByName("MASTER"); 
  var sheet = overview.getSheetByName("LIVE");var check = sheet.getRange(2,3,5,1).getValues();
for (t in check){
  var ssid = check[t];  var results = AUTOcheckNumNTags(ssid);
}}
function AUTOcheckNumNTags(ssid){
var numberLeft = 0;   var tagged = 0;   var notTagged = 0;   var unsure=0; var ss = SpreadsheetApp.openById(ssid); var ssnam = ss.getName();var ssurl = ss.getUrl();
 var sheet = ss.getSheetByName("Sheet1");  var rows=sheet.getRange(1,8,sheet.getMaxRows(),1).getValues(); var left = sheet.getLastRow();
  for (row in rows) { 
      if (!isCellEmpty(rows[row])) {    // if TAGGED has a TAG... there MUST be one there.
      tagged++;numberLeft++;
      } else {        var furtherLook = sheet.getRange(rows[row],1,1,2).getValues();
     if (((!isCellEmpty(furtherlook[0]))) && (!isCellEmpty(furtherlook[1]))){      // if no TAG, is there CONTENT?  
          numberLeft++;notTagged++;     /// CONTENT AND TITLE , NOT TAGGED BUT THERE...
        }  else if (((!isCellEmpty(furtherlook[0]))) && (isCellEmpty(furtherlook[1]))){      // if no TAG, is there CONTENT?  d
            numberLeft++;notTagged++; /// ONLY TITLE NO CONTENT
        } }}
        var secondNumCk = numberL(ssid);
        if (secondNumCk != numberLeft){
        Logger.log('conflicting lines remaining data...');
         var results = ([[ssnam,ssid,ssurl,secondNumCk,tagged]]);
         } else { var results = ([[ssnam,ssid,ssurl,numberLeft,tagged]]); }
return results;
 }

function sendLine() {
 var ScriptProperties = PropertiesService.getScriptProperties();
 var line2go = 4;//ScriptProperties.getProperty('line2go');  
 var suc = ScriptProperties.getProperty('suc'); var errors =ScriptProperties.getProperty('errors'); var fail = ScriptProperties.getProperty('fail');var tot = ScriptProperties.getProperty('sent');
 if (line2go>'7.0'){line2go = 2;} Logger.log('l2go@' + line2go);var lineGoin = line2go;line2go++; Logger.log('moved l2go to' + line2go);
var overview = SpreadsheetApp.openById('1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4');var newSH = overview.getSheetByName("LIVE");
var range = newSH.getRange(lineGoin,7, 1, 9); var data = range.getValues();  for (var i = 0; i < data.length; i++){ 
    var rowData = data[i];  var ID = rowData[0];   var post_title = rowData[1];  
    var desc = rowData[2];  var articleUrl = rowData[3]; var category = rowData[4];  
    var source = rowData[5];  var image = rowData[6];  var tags = rowData[8];
    }    Logger.log('id is ' + ID);
     if ((!desc) && (!post_title)){
   tot++;errors++;  var newProperties = {tot:tot, errors:errors, line2go: line2go}; ScriptProperties.setProperties(newProperties);
    // PREPARE THE POST IN THE PLACE OF THE ONE MISSING.... 
      newSH.getRange(line2go,1,1,17).setBackground('yellow'); newSH.getRange(lineGoin,1,1,17).setBackground('gray');
        return Logger.log('error NO TITLE OR CONTENT'); }
  if ((!desc) && (post_title)){
  desc = '[embedlyt]'+articleUrl+'[/embedlyt]<br>'+post_title +'<br> Posted by ' + source + ' ' + tags;
 }   var payload = {
    'identifier': ID,
   'post_title': post_title,
    'post_content': desc,
      'categories': category,
     'tags': tags
    };    
   var options = {
        'method' : 'post',
      'payload' : payload,
      muteHttpsExceptions:true
            };   
     newSH.getRange(lineGoin,1,1,17).setBackground('gray');
     
     
     
     
     var url= 'https://vapedirectory.co/t/why1.php';
     
      var response = UrlFetchApp.fetch(url, options); 
       Logger.log(response);Logger.log('response is' + response.getContentText()); 
      
 //   if (ID == 'vape'){         }
 //   if ((ID == 'orgbiz') || (ID == 'glo') || (ID == 'gov')|| (ID == 'orgbizes')|| (ID == 'vape')) {
 //   var url= 'http://organisemybiz.com/t/why.php'; 
 //   var span = 'orgbizes'
   // if (ID == 'orgbiz'){    //      var auth = 'Basic ' + Utilities.base64Encode('headlines:ExtJCJn%jRMzl1(5L5W*JBP#');
   //       var url= 'https://organisemybiz.com/wp-json/wp/v2/posts';
    //    }
 //   } else if (ID == 'ckww'){
   // var url= 'http://customkitsworldwide.com/t/why.php';var span = 'ckwwes';  
//    } else if (ID == 'fnr'){    
  //  var url= 'http://fakenewsregistry.org/t/why.php';  var span = 'fnres';
  //   }  Logger.log('sending to ' + url); 
 // try {
 // } catch (e) {
 // Logger.log(e.message);  errors++; tot++; var newProperties = {errors:errors, tot: tot, line2go: line2go}; ScriptProperties.setProperties(newProperties);
    // PREPARE THE POST IN THE PLACE OF THE ONE MISSING.... 
   //   }
    
//var destination = overview.getSheetByName(span);
         if(!isNaN(parseFloat(response)) && isFinite(response)){
   var suc = newSH.getRange(lineGoin,18).getValue();  suc++;newSH.getRange(lineGoin,18).setValue(suc);
	var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");newSH.getRange(12,10).setValues([[formattedDate+ 'success @ line'+ lineGoin ]]);refill(lineGoin);
 }else{ var fail = newSH.getRange(lineGoin,19).getValue(); fail++; newSH.getRange(lineGoin,19).setValue(fail);
   var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");newSH.getRange(12,10).setValues([[formattedDate+ 'fail @ line'+ lineGoin+ response.getContentText() ]]);refill(lineGoin);
} var tot = newSH.getRange(lineGoin,20).getValue(); tot++;  newSH.getRange(lineGoin,20).setValue(tot); 
newSH.getRange(lineGoin,24).setValue(response);
var newProperties = {tot: tot, suc: suc, fail: fail, line2go: line2go};
 ScriptProperties.setProperties(newProperties);    // PREPARE THE POST IN THE PLACE OF THE ONE JUST SENT.... 
      newSH.getRange(line2go,1,1,17).setBackground('yellow');    newSH.getRange(lineGoin,1,1,17).setBackground('gray');
//    ezTranslateNsave(post_title, desc, category, tags, span);

}

// finds number remaining posts and updates sheet
function numberL(ssid){
  var hhh = SpreadsheetApp.openById(ssid);
  try {   var sheet = hhh.getSheetByName("Sheet1");  var gov2s = hhh.getSheetByName("Sheet3");
   var left = sheet.getLastRow();  var leftE = gov2s.getLastRow(); 
  } catch(e){
     return 'error no sheet1...'
  }  
  return left;
}

function refill(line){
var overview = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4/edit'); 
var newSH = overview.getSheetByName("LIVE");
  // get next row ID to OPEN
  var li = newSH.getRange(line,3).getValue();
  var nextSht = SpreadsheetApp.openById(li);
    try { 
    var sss = nextSht.getSheetByName('Sheet1');
        } catch(e){
     start();
    }var numL = sss.getLastRow();var rngP = sss.getRange(2,1,1,8).getValues();var lineIn = newSH.getRange(line,8,1,8).setValues(rngP);newSH.getRange(line,6).setValue(numL);
sss.deleteRow(2);
}
 
function getALLfiveLines(){
var t1 = startClock('allLIVElines');var overview = SpreadsheetApp.openById('1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4'); 
var newSH = overview.getSheetByName("LIVE");   // get all LINES OF IDS = rng[x, y, z...]
 var rng = newSH.getRange(2,3,7,1).getValues();  // TIME @ START OF GETTING LINES
  var LEN = timeChk(t1);  for (var zz = 0; zz<6;zz++){
     var id = rng[zz];      var ovw = SpreadsheetApp.openById(id);    try {   var sss =  ovw.getSheetByName('Sheet1');
    }catch(e){Logger.log(e.line + e.message);    }
   var nam= ovw.getName(); var urlss =ovw.getUrl(); var numm = sss.getLastRow();
   Logger.log( ['nam'+' numm rows is ' + numm]);     var rngP = sss.getRange(3,1,1,8).getValues();
    var thisss= ([nam,id,urlss,numm]);         var move = newSH.getRange(zz+2,2,1,4).setValues([thisss]);    var lineIn = newSH.getRange(zz+2,8,1,8).setValues(rngP);
        }}

function ezTranslateNsave(title, content, cat, tags, ID) {
var spanishHtml = LanguageApp.translate(content,'en', 'es', {contentType: 'html'});
var spanishTit = LanguageApp.translate(title, 'en', 'es', {contentType: 'text'});
var ss = SpreadsheetApp.openById('1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4'); 
  var destination = ss.getSheetByName(ID);
    destination.appendRow([spanishTit,spanishHtml,cat,tags,ID]);
}