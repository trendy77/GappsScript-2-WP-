var LASTLIVE = 6;   // LAST line of posts to send on ov/sheet

function reset(){
    // DELETE TALLY....
  var overview = SpreadsheetApp.getActiveSpreadsheet(); 
  var newSH = overview.getSheetByName('live');
  // RESET THE COUNTERS...
  var xeros =([0,0,0]);
  var winLoss = newSH.getRange(2,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(3,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(4,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(5,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(6,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(7,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(8,18,1,3).setValues([xeros]);
  var winLoss = newSH.getRange(9,18,1,3).setValues([xeros]);
  // SET UP2SPOTS BACK
}   
  
function onInstall(e){
start();onOpen();
}

function onOpen() {
 SpreadsheetApp.getUi().createMenu('TrenDupChk').addItem('ID checkUI', 'IDUI') .addItem('dupUI', 'dupUI') .addItem('linerefill', 'linerefill')
 .addSeparator().addItem('getAllfivelines', 'getALLfiveLines').addItem('duprCheck', 'duprCheck') .addItem('checkLive', 'checkLive')
 .addSeparator().addItem('SENDLine', 'sendLine')
.addItem('reset', 'reset').addItem('uiFoldFile', 'uiFoldFile').addItem('fileFindr', 'fileFindr')
.addItem('dupLIVEcheck', 'dupLIVEcheck').addToUi();
}
  
function linerefill() {
   var ui = SpreadsheetApp.getUi();
 var response = SpreadsheetApp.getActiveSheet();

   for (var r=2;r<=LASTLIVE;r++){
var res = ref(r);
     var nextSht = SpreadsheetApp.openById(res);
     var name = nextSht.getName();var url = nextSht.getUrl();
     var tthhh = ([name,url]);
       var the = response.getRange(r, 1,1,2).setValues([tthhh]); 
 }  
 }


// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}

function uiFoldFile(){
  var ui = SpreadsheetApp.getUi();
 var response = ui.prompt('Finding sheets in folder? - default is'+ FOLDER, ui.ButtonSet.YES_NO);
 // Process the user's response.
 if (response.getSelectedButton() == ui.Button.YES) {
var resyy = response.getResponseText;
     var res = fileChecker(resyy);
 } else if (response.getSelectedButton() == ui.Button.NO) {
    fileChecker(FOLDER);
 }   
  SpreadsheetApp.getUi().alert( res[0]+res[1] +res[2]+res[3]);
}

function dupUI(){
var ui = SpreadsheetApp.getUi();
 var response = ui.prompt('enter ID or liinr == no to dupecheck', ui.ButtonSet.YES_NO);
 // Process the user's response.
 if (response.getSelectedButton() == ui.Button.YES) {
var res = AUTOJUNEfiledupCheck(response.getResponseText());
 } else if (response.getSelectedButton() == ui.Button.NO) {
   var ress = response.getResponseText();
   var res = AUTOJUNEfiledupCheck(ress);
 } else {
   Logger.log('The user clicked the close button in the dialog\'s title bar.');
 }


}

function idcheck(){
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var id = spreadsheet.getId();
  Logger.log(id);
  var res11 = ([id]);
     return (res11);
}

function IDUI(){
var ui = SpreadsheetApp.getUi();var ddui = SpreadsheetApp.getActiveSheet();var idd = ddui.getSheetId();
 var response = ui.prompt('check sheetid?this 1 is '+idd, ui.ButtonSet.YES_NO);
 if (response.getSelectedButton() == ui.Button.YES) {
  var res = idcheck();
 SpreadsheetApp.getUi().alert('id is'+idd);
}
}