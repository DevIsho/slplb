import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString()
}

const NewsSchame = mongoose.Schema({
    title: {type: String, required: true},
    subitle: {type: String},
    image: {type: String},
    news: {type: String},
    date: {type: String}
});


const NewsModel = mongoose.model('New', NewsSchame);
export {
    NewsModel as
    default
}