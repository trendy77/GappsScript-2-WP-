var MAX_ROWS =5;
var OV_SHEETID ='1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk';

function fileFindr(){
  // GETS ALL SHEETS WITHIN 'POSTS' FOLDER ---> LISTS ON 'ALL' SHEET
var sofar = kickIt('filefind'); var splits=1; 
var scriptProperties = PropertiesService.getScriptProperties(); var lastExecution = ScriptProperties.getProperty('lastEx');
 Logger.log('lastEx is :'+lastExecution); 
   if( lastExecution === null ){
   lastExecution = 2;   Logger.log('lastEx was null, is now :'+ lastExecution); ScriptProperties.setProperty('lastEx',lastExecution);
    }
    Logger.log('lastEx is :'+lastExecution); 
var overview = SpreadsheetApp.openById(OV_SHEETID);       
    // REMOVES DUPES FROM ALL SHEET //var theRes = AUTOJUNEfiledupCheck(OV_SHEETID);
var newSH = overview.getSheetByName("ALL");
 var total = split(sofar);  
    var postFold = DriveApp.getFoldersByName('posts');
   while (postFold.hasNext()) { 
   var fold = postFold.next();
   var files = fold.getFilesByType(MimeType.GOOGLE_SHEETS);              
         while (files.hasNext()) { 
         var file = files.next();
   var chnam = file.getName();   Logger.log('now processing postsheet: ' + chnam); var idfile=file.getId(); var url = file.getUrl();
 hideContentCol(idfile);
 var thrtow = ([[lastExecution,chnam,idfile,url]]);
  newSH.getRange(lastExecution,1,1,4).setValues(thrtow);
sofar = split(sofar);  splits++;lastExecution++;
        }
     var childFold = fold.getFolders();     
   while (childFold.hasNext()) {    
       var chfilder = childFold.next();
       var chnam = chfilder.getName();Logger.log('now processing postsheet: posts/' + chnam);
       var files = chfilder.getFilesByType(MimeType.GOOGLE_SHEETS);              
         while (files.hasNext()) {
     var file = files.next();      var idfile=file.getId();      var nam = file.getName();     var url = file.getUrl();
 Logger.log('now processing sheet: posts/' + chnam + '/'+ nam);
 hideContentCol(idfile);
 var thrtow = ([[lastExecution,nam,idfile,url]]);
 newSH.getRange(lastExecution,1,1,4).setValues(thrtow);
 sofar = split(sofar);
 lastExecution++;  splits++;
 }
 }
 }
 var total = holdUp(sofar);
 var aver = (total/splits);
 Logger.log('time total ' +total + ' Average split '+ aver);
if (lastExecution>=newSH.getLastRow()){
lastExecution=2;
}
scriptProperties.setProperty('lastEx',lastExecution);
}

function duprCheck(){
    // runs for MAX_ROWS
      // Duplicate Check
var sofar = kickIt('dupCheck');
var splits=0;
var scriptProperties = PropertiesService.getScriptProperties(); var lastDExecution = ScriptProperties.getProperty('lastDEx');
 Logger.log('lastDEx is :'+lastDExecution);
   if( lastDExecution === null || lastDExecution == 83 ){
   lastDExecution = '2';   Logger.log('lastDEx was null or 2, is now :'+ lastDExecution); ScriptProperties.setProperty('lastDEx',lastDExecution);
  }
 var overview = SpreadsheetApp.openById(OV_SHEETID); var newSH = overview.getSheetByName("ALL");
var daa = newSH.getRange(lastDExecution,3,MAX_ROWS,1).getValues();
 for (var cc in daa){
 var idtochk = daa[cc];
 Logger.log('daa[cc] is:');Logger.log(daa[cc]);
 var thisone = SpreadsheetApp.openById(idtochk);
   var chnam = thisone.getName();   Logger.log('now processing postsheet: ' + chnam); var idfile=thisone.getId(); var url = thisone.getUrl();
 var theRes = AUTOJUNEfiledupCheck(idfile);
sofar = split(sofar); 
var dupes = newSH.getRange(lastDExecution,10).getValue(); dupes=dupes+theRes[4];
var preDiff = newSH.getRange(lastDExecution,5,1,6).setValues([[sofar, theRes[0],theRes[1],theRes[2],theRes[3],dupes]]);
splits++;
lastDExecution++;
}
 if( lastDExecution === null || lastDExecution == 83 ){
   lastDExecution = '2';   Logger.log('lastDEx was null or 2, is now :'+ lastDExecution); ScriptProperties.setProperty('lastDEx',lastDExecution);
  }
  var total = holdUp(sofar);
  var aver = (total/splits);
  Logger.log('time total ' +total + ' Average split '+ aver);
ScriptProperties.setProperty('lastDEx',lastDExecution);
}


function hideContentCol(id){
    var spreadsheet = SpreadsheetApp.openById(id);
  try {
  var sheet = spreadsheet.getSheetByName("Sheet1");
// This hides the second column
   var range = sheet.getRange("B1"); sheet.hideColumn(range);
} catch(e){
SpreadsheetApp.flush();
 }
}

function AUTOJUNEfiledupCheck(ssid){
    // PROVIDE A SHEET ID, THIS WILL RUN DUPLICATE CHECK
        // --> RETURNS:  LINES, tagged, NOTTAGGED, n/a-tagged, dupe or 0
var spreadsheet = SpreadsheetApp.openById(ssid);
        try { 
          var sheet = spreadsheet.getSheetByName("Sheet1");
          var data = sheet.getDataRange().getValues();
        } catch(e) { 
        var sIheet = spreadsheet.insertSheet("Sheet1"); var sheet = spreadsheet.getSheetByName("Sheet1"); var somet = sheet.getRange(1,1,1,8).setValues('tit','cont','url','cat','source','img','date','tags');
         }
  var lines = 0; var tagged = 0; var notTagged=0;var dupe=0; var newData = new Array(); var naTag = 0;
    for(i in data){
    var row = data[i];
   var duplicate = false;
    if(isCellEmpty(row[7])){
      notTagged++;
      } 
      if (!isCellEmpty(row[7])){
        if (row[7] == 'N/A'){
      naTag++
      } else { 
      tagged++;
      }
     }
   for(j in newData){
  if(row[0] == newData[j][0] && row[1] == newData[j][1] && row[2] == newData[j][2]){
  duplicate = true;dupe++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
   }  }
  sheet.clearContents();
  sheet.getRange(2, 1, newData.length, newData[0].length).setValues(newData);
  var res2 = (['linesRem','tagged', 'notTagged','naTags','dupesFound']);
  var res11 = ([lines,tagged,notTagged,naTag,dupe]);
     var titlez = sheet.getRange(1,9,1,5).setValues([res2]);
     var preDiff = sheet.getRange(2,9,1,5).setValues([res11]);
  return (res11);
}