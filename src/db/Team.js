import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const TeamSchame = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    stadium: {
        type: String
    },
    staff: [{
        role: {
            type: String
        },
        name: {
            type: String
        }
    }],
    squad: [{
        name: {
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
        pos: {
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
    }]
});


const TeamModel = mongoose.model('Team', TeamSchame);
export {
    TeamModel as
    default
}