var assert = require('assert');

// INSERT OPERATION
// --------------------------------------------------------------------
exports.insertDocument = function(db, document, collection, callback) {
      // Get the documents collection
  var coll = db.collection(collection);
      // Insert some documents
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection "
                 + collection);
    callback(result);
  });
};

// SELECT OPERATION
// ---------------------------------------------------------
exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

// DELETE OPERATION
// --------------------------------------------------------------------
exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Delete the document
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
};

// UPDATE OPERATION
// ----------------------------------------------------------------------------
exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document
  coll.updateOne(document
    , { $set: update }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};