import mongoose from 'mongoose';
import dbConfig from "./app/config/db.config.js";
import User from "./app/models/user.js";

const dbSetup = (callback) => {
  mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const count = await User.estimatedDocumentCount();
      if (count === 0) {
        const admin = new User({
          name: "Bassem Elsayed",
          bio: "Hello From My Black Box",
          email: "bassemelsayd072@gmail.com",
          password: "bassem2751959@",
          gender: "male",
          birthdate: new Date("1997-05-22"),
          role: "admin",
        });
        admin
          .save()
          .then((saved_admin) => console.log("Admin Added: ", saved_admin))
          .catch((error) => console.log("Admin Error: ", error));
      }
      callback();
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

export default dbSetup;
