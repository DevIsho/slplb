import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const FixtureSchame = mongoose.Schema({
    date: {
        type: String
    },
    games: [{
        home: {
            type: String
        },
        assign: {
            type: String
        },
        away: {
            type: String
        },
        venu: {
            type: String
        }
    }]
});


const FixtureModel = mongoose.model('Fixture', FixtureSchame);
export {
    FixtureModel as
    default
}