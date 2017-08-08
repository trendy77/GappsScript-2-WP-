//RESET:: RESPONSES AND SUCCESS/FAILS COUNTERS
// ON OPEN / ON INSTALL - ADD UI FOR SHEET

function reset(){
// FIRST DELETE ALL CURRENT TALLY....
  var overview = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4/edit'); 
  var newSH = overview.getSheetByName("LIVE");
  var uptoSpot = newSH.getRange(2,21,8,newSH.getMaxColumns())
    uptoSpot.clearContent(); 
  // RESET THE COUNTERS...
  var winLoss = newSH.getRange(2,18,8,3);
    winLoss.clearContent(); 
    // SET UP2SPOTS BACK
}   
  
function onInstall(e){
start();onOpen();
}

function onOpen() {
 SpreadsheetApp.getUi().createMenu('TrenDupChk')
 .addItem('iterate on MASTERTP', 'fileInterateTP').addItem('feedrTP(4x dupecheck MSTR)', 'TIMRMASTRfeedrTP').addItem('start', 'start')
.addItem('getALL 5 Lines', 'getALLfiveLines')
 .addItem('dupLIVEcheck', 'dupLIVEcheck').addItem('reset', 'reset').addItem('sendLine', 'sendLine')
  .addToUi();
}
  
// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}