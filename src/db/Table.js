import mongoose from 'mongoose'
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const TableSchame = mongoose.Schema({
    season: {
        type: String
    },
    table: [{
        team: {
            type: String,
            required: true
        },
        played: {
            type: Number
        },
        win: {
            type: Number
        },
        draw: {
            type: Number
        },
        lost: {
            type: Number
        },
        gf: {
            type: Number
        },
        ga: {
            type: Number
        },
        form: [{
            status: {
                type: String
            },
            result: {
                type: String
            }
        }],
        point: {
            type: Number
        }
    }]
});


const TableModel = mongoose.model('Table', TableSchame);
export {
    TableModel as
    default
}