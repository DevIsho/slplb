import mongoose from "mongoose";
import Teams from "./Team";
import Fixtures from "./Fixture";
import Results from "./Result";
import News from "./News";
import Table from "./Table";
import Match from "./MatchUpdate";

mongoose.connect('mongodb://localhost/SLAFA');

const db = {
    Teams,
    Fixtures,
    Results,
    News,
    Table,
    Match
}

export { db as default }