const Query = {
    Teams(parent, args, ctx, info) {
        return ctx.db.Teams.find()
            .sort('name')
            .exec()
            .then(teams => {
                return teams
            })
            .catch(e => {
                console.log(e);
            });
    },
    Team(parent, args, ctx, info) {
        return ctx.db.Teams.findById(args.id)
            .then(team => {
                return team
            })
            .catch(e => {
                console.log(e);
            });
    },
    Players(parent, args, ctx, info) {
        return ctx.db.Player.find()
            .then(players => {
                return players
            })
            .catch(e => {
                console.log(e);
            });
    },
    Player(parent, args, ctx, info) {
        return ctx.db.Player.findById(args.id)
            .then(player => {
                return player
            })
            .catch(e => {
                console.log(e);
            });
    },
    Matches(parent, args, ctx, info) {
        return ctx.db.Match.find()
            .then(match => {
                return match;
            })
            .catch(e => {
                console.log(e);
            });
    },
    LiveMatch(parent, args, ctx, info) {
        return ctx.db.Fixtures.findOne()
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
            });
    },
    OneNews(parent, args, ctx, info) {
        return ctx.db.News.findById(args.id)
            .then(news => {
                return news
            })
            .catch(e => {
                console.log(e);
            });
    },
    Report(parent, {reporter}, ctx, info) {
        return ctx.db.Match.findOne({reporter: reporter})
            .then(news => {
                return news
            })
            .catch(e => {
                console.log(e);
            });
    },
    NextGame(parent, args, ctx, info) {
        return ctx.db.Fixtures.findOne()
            .then(fixtures => {
                return fixtures
            })
            .catch(e => {
                console.log(e);
            });
    },
    Table(parent, args, ctx, info) {
        return ctx.db.Table.find()
            .sort({
                point: -1
            })
            .exec()
            .then(table => {
                table.map(row => {
                    let gd = parseInt(row.gf) - parseInt(row.ga)

                    if (gd > 0) {
                        row.gd = "+" + gd
                    } else {
                        row.gd = gd
                    }
                });

                function compare(a, b) {
                    if (a.gd > b.gd)
                        return -1;
                    if (a.gd < b.gd)
                        return 1;
                    return 0;
                }

                table.sort(compare);

                return table
            })
            .catch(e => {
                console.log(e);
            });
    },
    onTable(parent, args, ctx, info) {
        return ctx.db.Table.find()
            .sort({
                point: -1
            })
            .exec()
            .then(table => {
                table.map(row => {
                    let gd = parseInt(row.gf) - parseInt(row.ga)

                    if (gd > 0) {
                        row.gd = "+" + gd
                    } else {
                        row.gd = gd
                    }
                });

                function compare(a, b) {
                    if (a.gd > b.gd)
                        return -1;
                    if (a.gd < b.gd)
                        return 1;
                    return 0;
                }

                table.sort(compare);

                table = table.map((obj, index) => {
                    obj.pos = index + 1;
                    return obj
                });

                let inx;

                table.find((obj, index) => {
                    if (obj.team === args.id) {
                        inx = index;
                        return index;
                    }

                })

                let onTable = '';

                if (inx !== 0) {
                    if (inx + 2 <= table.length) {
                        onTable = table.slice(inx - 1, inx + 2);
                    } else {
                        onTable = table.slice(inx - 2, inx + 1);
                    }
                }else{
                    onTable = table.slice(inx, inx + 3);
                }

                return onTable
            })
            .catch(e => {
                console.log(e);
            });
    },
    Fixtures(parent, args, ctx, info) {

        return ctx.db.Fixtures.find()
            .then(fixtures => {
                return fixtures
            })
            .catch(e => {
                console.log(e);
            });
    },
    Fixture(parent, args, ctx, info) {

        return ctx.db.Fixtures.find()
            .select('games date _id')
            .then(fixtures => {

                let fixture = fixtures.map((fix) => {
                    let data = fix.games.filter(obj => {
                        if (obj.home === args.id || obj.away === args.id) {
                            return obj
                        }
                    })

                    return {
                        games: [data[0]],
                        date: fix.date,
                        _id: fix._id
                    };
                })

                fixture = fixture.filter(obj => {
                    return obj.games.find(g => {
                        if (g !== undefined) {
                            return obj
                        }
                    })
                })

                return fixture
            })
            .catch(e => {
                console.log(e);
            });
    },
    Results(parent, args, ctx, info) {

        return ctx.db.Results.find()
            .then(results => {
                return results
            })
            .catch(e => {
                console.log(e);
            });
    },
    Result(parent, args, ctx, info) {

        return ctx.db.Results.find()
            .select('game date _id')
            .then(results => {

                let result = results.map((res) => {

                    let data = res.game.filter(obj => {
                        if (obj.home === args.id || obj.away === args.id) {
                            return obj
                        }
                    })

                    return {
                        game: [data[0]],
                        date: res.date,
                        _id: res._id
                    };
                })

                result = result.filter(obj => {
                    return obj.game.find(g => {
                        if (g !== undefined) {
                            return obj
                        }
                    })
                })

                return result
            })
            .catch(e => {
                console.log(e);
            });
    },
    News(parent, args, ctx, info) {

        return ctx.db.News.find()
            .then(news => {
                return news
            })
            .catch(e => {
                console.log(e);
            });
    }
}


export {
    Query as
    default
}