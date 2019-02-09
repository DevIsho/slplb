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
    }]
});


const TeamModel = mongoose.model('Team', TeamSchame);
export {
    TeamModel as
    default
}