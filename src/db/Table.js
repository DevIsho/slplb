import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString()
}

const TableSchame = mongoose.Schema({
    team: {type: String, required: true},
    played: {type: String},
    win: {type: String},
    draw: {type: String},
    lost: {type: String},
    gf: {type: String},
    ga: {type: String},
    form: [{
        result: {type: String}
    }],
    point: {type: String},
    pos: {type: String}
});


const TableModel = mongoose.model('Table', TableSchame);
export {
    TableModel as
    default
}