var indico = require('indico.io');
indico.apiKey =  '7757e7fda1d6a89efbd1cc07880cc78f';
var collection = indico.Collection('my_collection');

// Adding Data
collection.addData([["text1", "label1"], ["text2", "label2"], ...])

  // Training
  .train()

  // Waiting for Collection to be trained
  .wait()

  // Predicting once the model is ready!
  .predict("This is awesome!")

  // Viewing results
  .then(console.log);