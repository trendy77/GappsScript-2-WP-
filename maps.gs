function locationsMap() {
  // Get the sheet named 'offices'
  var sheet = SpreadsheetApp.openById('1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4').getSheetByName('OFFICES');

  // Store the restaurant name and address data in a 2-dimensional array called
  // restaurantInfo. This is the data in cells A2:B4
  var restaurantInfo = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();

  // Create a new StaticMap
  var restaurantMap = Maps.newStaticMap();

  // Create a new UI Application, which we use to display the map
  var ui = UiApp.createApplication();

  // Create a grid widget to use for displaying the text of the restaurant names
  // and addresses. Start by populating the header row in the grid.
  var grid = ui.createGrid(restaurantInfo.length + 1, 3);
  grid.setWidget(0, 0, ui.createLabel('Store #').setStyleAttribute('fontWeight', 'bold'));
  grid.setWidget(0, 1, ui.createLabel('Store Name').setStyleAttribute('fontWeight', 'bold'));
  grid.setWidget(0, 2, ui.createLabel('Address').setStyleAttribute('fontWeight', 'bold'));

  // For each entry in restaurantInfo, create a map marker with the address and
  // the style we want. Also add the address info for this restaurant to the
  // grid widget.
  for (var i = 0; i < restaurantInfo.length; i++) {
    restaurantMap.setMarkerStyle(Maps.StaticMap.MarkerSize.MID,
                                 Maps.StaticMap.Color.GREEN,
                                 i + 1);
    restaurantMap.addMarker(restaurantInfo[i][1]);

    grid.setWidget(i + 1, 0, ui.createLabel((i + 1).toString()));
    grid.setWidget(i + 1, 1, ui.createLabel(restaurantInfo[i][0]));
    grid.setWidget(i + 1, 2, ui.createLabel(restaurantInfo[i][1]));
  }

  // Create a Flow Panel widget. We add the map and the grid to this panel.
  // The height needs to be able to accomodate the number of restaurants, so we
  // use a calculation to scale it based on the number of restaurants.
  var panel = ui.createFlowPanel().setSize('500px', 515 + (restaurantInfo.length * 25) + 'px');

  // Get the URL of the restaurant map and use that to create an image and add
  // it to the panel. Next add the grid to the panel.
  panel.add(ui.createImage(restaurantMap.getMapUrl()));
  panel.add(grid);

  // Finally, add the panel widget to our UI instance, and set its height,
  // width, and title.
  ui.add(panel);
  ui.setHeight(515 + (restaurantInfo.length * 25));
  ui.setWidth(500);
  ui.setTitle('Restaurant Locations');

  // Make the UI visible in the spreadsheet.
  SpreadsheetApp.getActiveSpreadsheet().show(ui);
}
