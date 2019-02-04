import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const MatchSchame = mongoose.Schema({
    date: {
        type: String
    },
    status: {
        type: String
    },
    time: {
        type: String
    },
    reporter: {
        type: String
    },
    live: {
        type: String
    },
    home: {
        type: String
    },
    away: {
        type: String
    },
    details: {
        LineUp: {
            LineUp: {
                home: [{
                    type: String
                }],
                away: [{
                    type: String
                }]
            },
            substitute: {
                home: [{
                    type: String
                }],
                away: [{
                    type: String
                }]
            },
            substitutions: {
                home: [{
                    type: String
                }],
                away: [{
                    type: String
                }]
            }
        },
        matchInfo: {
            yellowCard: [{
                time: {
                    type: String
                },
                player: {
                    type: String
                }
            }],
            redCard: [{
                time: {
                    type: String
                },
                player: {
                    type: String
                }
            }],
            goals: [{
                time: {
                    type: String
                },
                player: {
                    type: String
                }
            }]
        },
        statistics: {
            onTarget: {
                type: Number
            },
            offTarget: {
                type: Number
            },
            possession: {
                type: Number
            },
            corners: {
                type: Number
            },
            offsides: {
                type: Number
            },
            fouls: {
                type: Number
            },
            goalKicks: {
                type: Number
            }
        }
    }
});


const MatchModel = mongoose.model('Match', MatchSchame);
export {
    MatchModel as
    default
}