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
                            return data
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
            .catch()

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
    }
}

export {
    Mutation
    as
    default
}