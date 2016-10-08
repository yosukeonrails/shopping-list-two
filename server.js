var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var _ = require('underscore');

var Storage = {
    add: function(name) {
        var item = {
            name: name,
            id: this.setId
        };
        this.items.push(item);
        this.setId += 1;
        return item;
    },

    delete: function(id) {

        var itemArray = this.items;
        var deletedItem;
        var i;
        for (i = 0; i < itemArray.length; i++) {

            // console.log(itemArray[i].id);
            // console.log(i+1);
            //for each ItemArray[i].id    1 ,2 ,3,4, == button pressed.
            // delete ItemArray[i]
            //
            if (itemArray[i].id == id) {
              deletedItem = itemArray[i];

                // console.log( 'this is the item array'+ itemArray[i].id);

                itemArray.splice(itemArray[i], 1);
            } else {
                console.log('it didnt run');
            }
          }

          return deletedItem;

    },
    update:function(id, newName){

      var itemArray = this.items;
      var i;
      for (i = 0; i < itemArray.length; i++) {

          // console.log(itemArray[i].id);
          // console.log(i+1);
          //for each ItemArray[i].id    1 ,2 ,3,4, == button pressed.
          // delete ItemArray[i]
          //
          if (itemArray[i].id == id) {
              // console.log( 'this is the item array'+ itemArray[i].id);
              itemArray[i].name= newName;

            return itemArray[i];

          } else {
              console.log('it didnt run');
          }
        }


    }

};

var createStorage = function() {
    var storage = Object.create(Storage);
    storage.items = [];
    storage.setId = 1;
    return storage;
};

var storage = createStorage();

storage.add('Broad bean');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});


app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});



app.delete('/items/:id', jsonParser, function(request, response) {

    var itemId = request.params.id;

    // IF NOT FOUND MATCHED IN THE SHOPPING LIST, ERROR
    // OR , TAKE THE ITEM AND TAKE IT OUT OF ARRAY


    var item = storage.delete(itemId);


    if(!item){
       response.sendStatus(404);
    } else {
      response.status(201).json(item);
    }

    console.log('this is ' + itemId);

});


app.put('/items/:id', jsonParser, function(request, response) {

    var itemId = request.params.id;
    var newName= request.body.name;

    // IF NOT FOUND MATCHED IN THE SHOPPING LIST, ERROR
    // OR , TAKE THE ITEM AND TAKE IT OUT OF ARRAY

    var item = storage.update(itemId, newName);

    if(!item){
       response.sendStatus(404);
    } else {
      response.status(200).json(item);
    }


});





exports.app = app;
exports.storage = storage;

app.listen(process.env.PORT || 8080, process.env.IP);
