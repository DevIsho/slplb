import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const LiveMatchSchame = mongoose.Schema({
    date: {
        type: String
    },
    home: {
        type: String
    },
    away: {
        type: String
    },
    reporter: {
        type: String
    },
    lineUp: {
        home: {
            Starting: [{
                type: String
            }],
            Substitutes: [{
                type: String
            }],
            Substitutions: [{
                in: {type: String},
                out: {type: String}
            }]
        },
        away: {
            Starting: [{
                type: String
            }],
            Substitutes: [{
                type: String
            }],
            Substitutions: [{
                in: {type: String},
                out: {type: String}
            }]
        }
    },
    matchDetails: [{
        action: {type: String},
        player: {type: String},
        team: {type: String},
        time: {type: String}
    }]
});


const LiveMatchModel = mongoose.model('LiveMatch', LiveMatchSchame);
export {
    LiveMatchModel as
    default
}