import _ from 'lodash';
const Mutation = {
    Fixture(parent, args, ctx, info) {
        let body = _.pick(args, ['date']);
        body.games = [];

        body.games.push(_.pick(args, ['home', 'away']));

        return ctx.db.Fixtures.find({
                date: body.date
            })
            .then(data => {

                if (data.length > 0) {
                    data.map(fixture => {
                        ctx.db.Fixtures.findOneAndUpdate({
                            _id: fixture._id
                        }, {
                            $push: {
                                games: _.pick(args, ['home', 'away'])
                            }
                        }, {
                            new: true
                        }).then(data => {
                            return data;
                        })
                    })
                } else {
                    new ctx.db.Fixtures(body).save()
                        .then(data => {
                            return data
                        })
                        .catch(e => console.log())
                }
            })
            .catch(e => {
                console.log(e);
            });

    },
    Team(parent, args, {
        db
    }, info) {
        let body = _.pick(args, ['name', 'image', 'stadium']);

        let team = new db.Teams(body);
        return team.save()
            .then(team => {
                return team;
            })
            .catch(e => {
                console.log(e);
            })
    },
    Player(parent, args, {
        db
    }, info) {
        let body = _.pick(args, [
            'name',
            'team',
            'number',
            'nationality',
            'age',
            'dob',
            'height',
            'position'
        ]);

        let player = new db.Player(body);
        return player.save()
            .then(player => {
                return player;
            })
            .catch(e => {
                console.log(e);
            })
    },
    Results(parent, args, ctx, info) {
        let body = _.pick(args, ['date', 'season']);
        body.games = [];

        body.games.push(_.pick(args, ['home', 'away', 'homeGoals', 'awayGoals']));

        return ctx.db.Results.find({
                date: body.date
            })
            .then(data => {

                if (data.length > 0) {
                    data.map(results => {
                        ctx.db.Results.findOneAndUpdate({
                            _id: results._id
                        }, {
                            $push: {
                                games: _.pick(args, ['home', 'away', 'homeGoals', 'awayGoals'])
                            }
                        }, {
                            new: true
                        }).then(data => {
                            console.log(data);

                            return data
                        })
                    })
                } else {
                    new ctx.db.Results(body).save()
                        .then(data => {
                            console.log(data);
                            return data
                        })
                        .catch(e => console.log())
                }
            })
            .catch()

    },
    newMatch(parent, args, ctx, info) {
        let match = new ctx.db.Match(args)
        return match.save()
            .then(match => {
                return ctx.db.Fixtures.findOneAndUpdate({
                        'games._id': args.gameId
                    }, {
                        $set: {
                            'games.$.assign': true
                        }
                    }, {
                        new: true
                    })
                    .then(fix => {
                        let customFix, fixture;

                        fixture = fix;

                        customFix = fix.games;

                        customFix = customFix.filter(g => {
                            if (g.assign === 'false')
                                return g;
                        });

                        fixture.games = customFix;

                        return fixture;
                    })
                    .catch(e => {
                        console.log(e);
                    })

            })
            .catch(e => {
                console.log(e);

            })
    },
    LiveTime(parent, {
        id,
        time
    }, ctx, info) {
        return ctx.db.Match.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    time
                }
            }, {
                new: true
            })
            .then(match => {
                let Time = {
                    _id: match._id,
                    time: match.time
                }

                ctx.pubsub.publish('time', {
                    Time
                })
                return match;
            })
            .catch(e => {
                console.log(e);
            });
    },

    // Table
    Table(parent, args, {
        db
    }, info) {

        let season = args.season;
        let tb = {};

        tb.season = season;
        tb.table = [];

        return db.Table.find({
            season
        }).then(data => {
            if (data.length == 0) {

                let body = _.pick(args, ['team', 'gf', 'ga']);

                body.played = 1;

                if (args.status === "W") {
                    body.point = 3
                    body.win = 1
                    body.lost = 0
                    body.draw = 0
                } else if (args.status === "D") {
                    body.point = 1
                    body.win = 0
                    body.lost = 0
                    body.draw = 1
                } else {
                    body.point = 0
                    body.win = 0
                    body.lost = 1
                    body.draw = 0
                }

                body.form = _.pick(args, ['result', 'status']);

                tb.table.push(body)
                let table = new db.Table(tb);
                table.save()
                    .then(data => {
                        return data
                    })
            } else {

                let body = _.pick(args, ['team', 'gf', 'ga']);

                if (args.status === "W") {
                    body.point = 3
                    body.win = 1
                    body.lost = 0
                    body.draw = 0
                } else if (args.status === "D") {
                    body.point = 1
                    body.win = 0
                    body.lost = 0
                    body.draw = 1
                } else {
                    body.point = 0
                    body.win = 0
                    body.lost = 1
                    body.draw = 0
                }

                body.form = _.pick(args, ['result', 'status']);

                return db.Table.findOneAndUpdate({
                        'table.team': args.team
                    }, {
                        $inc: {
                            'table.$.played': 1,
                            'table.$.gf': args.gf,
                            'table.$.ga': args.ga,
                            'table.$.win': body.win,
                            'table.$.lost': body.lost,
                            'table.$.draw': body.draw,
                            'table.$.point': body.point
                        },
                        $push: {
                            'table.$.form': body.form
                        }
                    }, {
                        new: true
                    })
                    .then(data => {

                        if (!data) {
                            let body = _.pick(args, ['team', 'gf', 'ga']);

                            body.played = 1;

                            if (args.status === "W") {
                                body.point = 3
                                body.win = 1
                                body.lost = 0
                                body.draw = 0
                            } else if (args.status === "D") {
                                body.point = 1
                                body.win = 0
                                body.lost = 0
                                body.draw = 1
                            } else {
                                body.point = 0
                                body.win = 0
                                body.lost = 1
                                body.draw = 0
                            }

                            body.form = _.pick(args, ['result', 'status']);

                            db.Table.findOneAndUpdate({
                                season
                            }, {
                                $push: {
                                    'table': body
                                }
                            }, {
                                new: true
                            }).then(data => {
                                return data
                            })

                        } else return data
                    });
            }
        })

    },

    // News
    News(parent, args, {
        db
    }, info) {

        let body = _.pick(args, ['title', 'subTitle', 'image', 'news']);
        body.date = new Date().toISOString();

        let news = new db.News(body);
        return news.save()
            .then(data => {
                return data
            })
        
    }
}

export {
    Mutation
    as
    default
}