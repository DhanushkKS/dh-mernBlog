const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.statics.Register = async function (email, password, confirmPassword) {
    if (!email || !password || !confirmPassword) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Emal isn;t valid")
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email alrady use')
    }
    if (password !== confirmPassword) {
        throw Error("Passwords doesn't match")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    //create user
    const user = await this.create({ email, password: hash })
    return user
    //static method ekak
    /**
     * mulin balanawa all fields fill welada kiyala
     * it passe balanawa email eka validda kiyala
     * it passe kalin e email eken user kenek innwd kiyala balanwa
     * it passe password ekai confirm password ekai harida kiyala balanawa
     * e okkoma harinam,
     * bcrypt eken salt ekak hada gannnw
     * it passe hash function ekak use karala slat ekai ekka, password eka hash karanwa.
     * e okkoma karala iwara unama userwa create karanwa, passe userwa return karanwa.
     */

}
UserSchema.statics.Login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled in")
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid email")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("User doesn'exist please register")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect password")
    }
    return user;
    //mekath static method ekak
    /**
     * kalin wagem blnw email validda all fields filled da kiyala.
     * e okkoma harinam balanawa adala email ekata user kenek innnawada kiyala.
     * user kenek innwnwam password eka compare krala balanawa database eke ekai adala user enter karapu passwrod ekai harida kiayala
     * e okkoma harinam userwa return karanwa.
     */
}