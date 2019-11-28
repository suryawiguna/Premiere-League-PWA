var dbPromised = idb.open("teams", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {keyPath: "id"});
  teamsObjectStore.createIndex("name", "name", {unique: false});
  teamsObjectStore.createIndex("shortName", "shortName", {unique: false});
  teamsObjectStore.createIndex("crestUrl", "crestUrl", {unique: false});
  teamsObjectStore.createIndex("venue", "venue", {unique: false});
  teamsObjectStore.createIndex("address", "address", {unique: false});
  teamsObjectStore.createIndex("phone", "phone", {unique: false});
  teamsObjectStore.createIndex("website", "website", {unique: false});
});

function saveThis(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      var data = {
          id: team.id,
          name: team.name,
          shortName: team.shortName,
          crestUrl: team.crestUrl,
          venue: team.venue,
          address: team.address,
          phone: team.phone,
          website: team.website,
      }
      store.add(data);
      return tx.complete;
    })
    .then(function() {
      alert("Team has been saved.");
      window.location.href = '/#home';
    }).catch(function(error) {
        alert('Team already saved.');
        window.location.href = '/#saved';
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByTitle(title) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      var titleIndex = store.index("name");
      var range = IDBKeyRange.bound(name, name + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function removeThis(id) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
    }).then(function() {
        alert('Team has been removed');
        window.location.href = '/#saved';
    });
}
