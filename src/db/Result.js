import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const ResultSchame = mongoose.Schema({
    season: {
        type: String
    },
    date: {
        type: String
    },
    games: [{
        home: {
            type: String
        },
        away: {
            type: String
        },
        homeGoals: {
            type: Number
        },
        awayGoals: {
            type: Number
        },
        lineUp: {
            starting: [{
                home: [{
                    type: String
                }],
                away: [{
                    type: String
                }]
            }],
            substitutes: [{
                home: [{
                    type: String
                }],
                away: [{
                    type: String
                }]
            }],
            substitution: [{
                home: [{
                    time: {
                        type: String
                    },
                    in: {
                        type: String
                    },
                    out: {
                        type: String
                    }
                }],
                away: [{
                    time: {
                        type: String
                    },
                    in: {
                        type: String
                    },
                    out: {
                        type: String
                    }
                }]
            }]
        },
        matchDetials: {
            yellowCard: [{
                home: [{
                    player: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }],
                away: [{
                    player: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }]
            }],
            redCard: [{
                home: [{
                    player: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }],
                away: [{
                    player: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }]
            }],
            goal: [{
                home: [{
                    player: {
                        type: String
                    },
                    goal: {
                        type: String
                    },
                    og: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }],
                away: [{
                    player: {
                        type: String
                    },
                    goal: {
                        type: String
                    },
                    og: {
                        type: String
                    },
                    time: {
                        type: String
                    }
                }]
            }]
        },
        stats: [{
            name: {
                type: String
            },
            stats: {
                home: {
                    type: String
                },
                away: {
                    type: String
                }
            }
        }]
    }]
});


const ResultModel = mongoose.model('Result', ResultSchame);
export {
    ResultModel as
    default
}