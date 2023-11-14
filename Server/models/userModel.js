const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true, unique: true },
    birthdate: { type: String, required: true },
});

userSchema.statics.checkUserExistence = async function (email, user_name, phonenumber) {
    const existingEmail = await this.findOne({ email });
    const existingUsername = await this.findOne({ user_name });
    const existingPhonenumber = await this.findOne({ phonenumber });

    if (existingEmail) {
        throw new Error('Email already exists');
    }
    if (existingUsername) {
        throw new Error('Username already exists');
    }
    if (existingPhonenumber) {
        throw new Error('Phonenumber already exists');
    }

    return true;
};

userSchema.statics.register = async function (first_name, last_name, user_name, email, password, phonenumber, birthdate) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword,
            phonenumber,
            birthdate,
        });
        return await user.save();
    } catch (error) {
        throw error;
    }
};

userSchema.statics.login = async function (email) {
    try {
        const user = await this.findOne({ email });
        return user || "Email is not found";
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
