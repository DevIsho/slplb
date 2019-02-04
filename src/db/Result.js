import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const ResultSchame = mongoose.Schema({
    date: {
        type: String
    },
    visible: {
        type: Boolean
    },
    game: [{
        home: {
            type: String
        },
        away: {
            type: String
        },
        venu: {
            type: String
        },
        homeTeam: {
            type: String
        },
        awayTeam: {
            type: String
        }
    }]
});


const ResultModel = mongoose.model('Result', ResultSchame);
export {
    ResultModel as
    default
}