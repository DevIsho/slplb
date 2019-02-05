import mongoose from "mongoose";
import Teams from "./Team";
import Fixtures from "./Fixture";
import Results from "./Result";
import News from "./News";
import Table from "./Table";
import Match from "./MatchUpdate";
import Player from "./Players";

//'mongodb://isho:isho1%40gmail.com@ds223015.mlab.com:23015/slplb_database'
mongoose.connect('mongodb://isho:isho1%40gmail.com@ds223015.mlab.com:23015/slplb_database');

const db = {
    Teams,
    Fixtures,
    Results,
    News,
    Table,
    Match,
    Player
}

export { db as default }