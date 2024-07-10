import { connect } from "mongoose";

const connectDatabase = async () => {
    await connect(process.env.DB_URL
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

export default connectDatabase;
