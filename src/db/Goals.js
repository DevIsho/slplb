import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString()
}

const GoalsSchame = mongoose.Schema({
    title: {type: String, required: true},
    subitle: {type: String},
    image: {type: String},
    Goals: {type: String},
    date: {type: String}
});


const GoalsModel = mongoose.model('New', GoalsSchame);
export {
    GoalsModel as
    default
}