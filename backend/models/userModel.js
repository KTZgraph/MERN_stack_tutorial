const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unikalne pole
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static methods - modele z mongoose od razu z nimi przychodzą
// są to wbudowane metody jak create, find, delete etc są to funckje która za nas coś robią z bazą danych
// ale też możemy sami zrobić nasze własne funckje

//stastic sgnup method
// mojaSchema.statics.metodaJakaChce
// NIE MOŻNA UŻYWAĆ ARROW FUNCTION, bo używamy słowa kluczowe this - trzeba użyć zwykłej asynchronicznej funckji
// userSchema.statics.signup = async (email, password) => {
userSchema.statics.signup = async function (email, password) {
  // walidacja pól
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // WARNING npm install bcrypt
  // additional static method on method
  // 1 sprawdzam czy email już isntieje, jeśli duplikat to nawet nie próbuję coś robić

  // to nie zadziaął bo nie mam moeldu ale mogę się odnieść do tego obiektu przez this
  // const exist = await User.findOne
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //   hashowanie hasła z solą, argument to liczba rund do generowania soli
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //   zapisać zahashowane hasło w bazie z emailem
  const user = await this.create({ email, password: hash });

  return user;
};

// zwraca model stworozny na podstawie Schema
module.exports = mongoose.model("User", userSchema);
