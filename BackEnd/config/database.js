const mongoose = require("mongoose");

const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL
        , {
            useNewUrlParser: true, useUnifiedTopology: true
        }
    )
        .then((data) => {
            console.log(`Mongodb Connected with Server ${data.connection.host}`);
        });
    // .catch((error) => {
    //     console.log(error);
    // });
};

module.exports = connectDatabase;
