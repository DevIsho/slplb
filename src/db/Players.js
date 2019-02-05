import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const PlayerSchame = mongoose.Schema({
    name: {
        type: String
    },
    team: {
        type: String
    },
    number: {
        type: String
    },
    nationality: {
        type: String
    },
    age: {
        type: String
    },
    dob: {
        type: String
    },
    height: {
        type: String
    },
    position: {
        type: String
    },
    appearances: {
        type: String
    },
    subs: {
        type: String
    },
    cleanSheets: {
        type: String
    },
    goals: {
        type: String
    },
    assists: {
        type: String
    }
});


const PlayerModel = mongoose.model('Player', PlayerSchame);
export {
    PlayerModel as
    default
}