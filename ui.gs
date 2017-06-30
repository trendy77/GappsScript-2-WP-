
function reset(){
    // DELETE TALLY....
  var overview = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk'); 
  var newSH = overview.getSheetByName('live');
 
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
 .addItem('fileFindr', 'fileFindr').addItem('Dupe', 'duprCheck').addItem('run', 'sendLine').addItem('send', 'sendLine')
.addItem('get infoALL', 'getALLfiveLines')
 .addItem('dupLIVEcheck', 'dupLIVEcheck').addItem('reset', 'reset')  //.addItem('spanFromEngSheet', 'eZtranslate')
  .addToUi();
}

 function onEdit(e){
  // IF line has been sent , the refill
  var range = e.values;
 
  Logger.log(  range.values[3] );
}


  
// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}