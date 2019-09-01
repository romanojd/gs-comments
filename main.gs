var debug = false;

function enableComments() {
  var doc = DocumentApp.getActiveDocument();
  var file = DriveApp.getFileById(doc.getId());
  var viewers = file.getViewers();
  var viewer_list = [];
  
  for (var user = 0; user < viewers.length; user++) {
    var email = viewers[user].getEmail();
    if (email != '') {
      viewer_list.push(email);
    }
  }
  
  try {
    if (debug) {
      postMessage('[debug] add commenters: \n' + viewer_list);
    } else {
      file.addCommenters(viewer_list);
    }
  } catch(err) {
    // user is not a valid google account
    postMessage(err.name + ': ' + err.message);
  }
}

function disableComments() {
  var doc = DocumentApp.getActiveDocument();
  var file = DriveApp.getFileById(doc.getId());
  var viewers = file.getViewers();
  var viewer_list = [];
  
  // create viewer list and revoke permissions
  try {
    for (var user = 0; user < viewers.length; user++) {
      var email = viewers[user].getEmail();
      if (email != '') {
        viewer_list.push(email);
        if (debug) {
          postMessage('[debug] remove commenter: ' + email);
        } else {
          file.removeCommenter(email);
        }
      }
    }
  } catch(err) {
    // ???
    postMessage(err.name + ': ' + err.message);
  }
  
  // add viewer list back view-only
  try {
    if (debug) {
      postMessage('[debug] add viewers \n' + viewer_list);
    } else {
      file.addViewers(viewer_list);
    }
  } catch(err) {
    // user is not a valid google account
    postMessage(err.name + ': ' + err.message);
  }
}

function postMessage(msg) {
  var ui = DocumentApp.getUi();
  ui.alert('Debug', msg, ui.ButtonSet.OK);  
}
