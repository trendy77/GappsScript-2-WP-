var LASTLIVE = 6;   // LAST line of posts to send on ov/sheet

// orgBiz sheet
var FOLDER = 'IFTTT';
var SHEETNAME = "live";
var SHEETID = '1PbbruGcceDl6M8xWsXWPom1TB5YmyzcQoKNeNm-XoaQ';
 
function fileChecker(){
  // 
 var postFold = DriveApp.getFoldersByName('IFTTT');
   var newData = new Array();   var lastEx=1;
  while (postFold.hasNext()) { 
    var fold = postFold.next();
     var files = fold.searchFiles('mimeType = "' + MimeType.GOOGLE_SHEETS + '"');
     while (files.hasNext()) {
       var thisone = files.next();
       var spreadsheet = SpreadsheetApp.open(thisone);
       var uuu = spreadsheet.getId();
       Logger.log(uuu);
        var nam = spreadsheet.getName();    
       var url = spreadsheet.getUrl();
           var thrtow = ([lastEx,nam,uuu,url]);
  var overview = SpreadsheetApp.getActiveSpreadsheet()    
var newSH = overview.getSheetByName('orgbizALL');
  var newSHc = newSH.getRange(lastEx, 1, 1, 4).setValues([thrtow]);
           lastEx++;
          }
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
      naTag++;
      } else { 
      tagged++;
      }
     }
   for(j in newData){
  if(row[0] == newData[j][0] && row[1] == newData[j][1]){
  duplicate = true;dupe++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
   }  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
  var res2 = (['linesRem','tagged', 'notTagged','naTags','dupesFound']);
  var res11 = ([lines,tagged,notTagged,naTag,dupe]);
     var titlez = sheet.getRange(1,9,1,5).setValues([res2]);
     var preDiff = sheet.getRange(2,9,1,5).setValues([res11]);
  return (res11);
} 

function checkLive() {
    // checks LIVE sheets for tagged
    // numleft and n/a tagged
 Logger.log('checking live sheets');
   var overview = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = overview.getSheetByName("live"); 
    var check = sheet.getRange(2,3,(LASTLIVE-1),1).getValues();
      for (var t in check){
         var number = 2;
         var ssid = check[t];  
        var open = SpreadsheetApp.openById(ssid);
        var nam = open.getName();         var urll = open.getUrl();    
        var results = AUTOCheck(ssid);
              if (results[4]){
           //    SpreadsheetApp.getUi().alert('sheet ' +ssid +'found dupes: ' + results[4]);
                Logger.log('found DUPES -- ' + results[4]); 
               }
      
          Logger.log(results); 
        var fffr = ([nam,urll]); var numss = ([results[0],results[1],results[2],results[3],results[4]]);
    var lineIn = sheet.getRange(number,1,1,2).setValues([fffr]);
      var linedIn = sheet.getRange(number,4,1,5).setValues([numss]);
      number++;
      }
}
 


function checkAll() {
// READS IDs from SHEETNAME and RUNS AUTOcheckNumNTags
var overview = SpreadsheetApp.openById(SHEETID); 
 var sheet = overview.getSheetByName(SHEETNAME);

  var check = sheet.getRange(2,3,5,1).getValues();
for (var t=1;t<5;t++){
  var ssid = check[t];  
  var results = AUTOcheckNumNTags(ssid);
var thiss = sheet.getRange((t+1),4,1,1).setValues([results]);
}
}

function AUTOcheckNumNTags(ssid){
var numberLeft = 0;  var naTag = 0; var tagged = 0;   var notTagged = 0;   var unsure=0; var ss = SpreadsheetApp.openById(ssid); var ssnam = ss.getName();var ssurl = ss.getUrl();
 var sheet = ss.getSheetByName("Sheet1");  var rows=sheet.getRange(1,8,sheet.getMaxRows(),1).getValues(); var left = sheet.getLastRow();
     var data = sheet.getDataRange().getValues(); for(i in data){
       var row = data[i];
    if(isCellEmpty(row[7])){
      notTagged++;
      } 
      if (!isCellEmpty(row[7])){
        if (row[7] == 'N/A'){
      naTag++;
      } else { 
      tagged++;
      }
     }
     }
     var res2 = (['linesRem','tagged', 'notTagged','naTags']);
  var res11 = (data.length,tagged,notTagged,naTag);
    // var titlez = sheet.getRange(1,4,1,4).setValues([res2]);
   // var preDiff = sheet.getRange(2,9,1,4).setValues([res11]);
Logger.log(res11);
return (res11);
}




function dupeIt(ssid){
    var spreadsheet = SpreadsheetApp.openById(ssid);
    var sheet = spreadsheet.getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  var lines = 0;var diffCh=0;
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
   for(j in newData){
     if(row[0] == newData[j][0] && row[1] == newData[j][1]){
  duplicate = true; diffCh++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
  }  }
  sheet.clearContents();
 var fffd = sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
   var res11 = ([['diffCh',diffCh, 'linesRem',lines]]);
 var fff= sheet.getRange(1, 9, 1,4).setValues(res11);
  return(res11);
 }