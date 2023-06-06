const mongoose = require("mongoose");
mongoose.mongoose.connect('mongodb+srv://logan:logan%402000@inotebook-cluster.cflpmda.mongodb.net/notebookDB?retryWrites=true&w=majority')
    .then(() => { console.log("connected") })
    .catch((error) => { console.log(error) });
