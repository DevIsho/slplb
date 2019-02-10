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
    Report(parent, {
        reporter
    }, ctx, info) {
        return ctx.db.Match.findOne({
                reporter: reporter
            })
            .then(news => {
                return news
            })
            .catch(e => {
                console.log(e);
            });
    },
    NextGame(parent, args, ctx, info) {
        return ctx.db.Fixtures.findOne()
            .sort({
                date: 1
            })
            .then(fixtures => {
                return fixtures
            })
            .catch(e => {
                console.log(e);
            });
    },
    Table(parent, args, ctx, info) {
        return ctx.db.Table.find()
            .then(table => {

                table.map(data => {
                    data.table.map((row, index) => {
                        let gd = row.gf - row.ga

                        if (gd > 0) {
                            row.gd = "+" + gd
                        } else {
                            row.gd = gd
                        }

                    });
                })

                table.map(data => {
                    function compare(a, b) {
                        if (a.point > b.point)
                            return -1;
                        if (a.point < b.point)
                            return 1;

                        return 0;
                    }


                    data.table.sort(compare);

                    return data;
                })

                return table
            })
            .catch(e => {
                console.log(e);
            });
    },
    onTable(parent, args, ctx, info) {
        return ctx.db.Table.find()
            .then(table => {
                table.map(data => {
                    data.table.map((row, index) => {
                        let gd = row.gf - row.ga

                        if (gd > 0) {
                            row.gd = "+" + gd
                        } else {
                            row.gd = gd
                        }

                    });
                })

                table.map(data => {
                    function compare(a, b) {
                        if (a.point > b.point)
                            return -1;
                        if (a.point < b.point)
                            return 1;

                        return 0;
                    }


                    data.table.sort(compare);

                    return data;
                })

                let inx, onTable = '',
                    testTable;

                table.map(tb => {
                    tb.table.map((t, index) => {
                        t.pos = index + 1;
                        return t;
                    })

                    tb.table.find((t, index) => {
                        if (t.team === args.id) {
                            inx = index;
                            return t;
                        }
                    })

                    testTable = tb.table;

                    return tb;
                })

                if (inx !== 0) {
                    if (inx + 2 <= testTable.length) {
                        onTable = testTable.slice(inx - 1, inx + 2);
                    } else {
                        onTable = testTable.slice(inx - 2, inx + 1);
                    }
                } else {
                    onTable = testTable.slice(inx, inx + 3);
                }


                table.map(tb => {
                    tb.table = onTable;
                    return tb
                })

                return table;
            })
            .catch(e => {
                console.log(e);
            });
    },
    Fixtures(parent, args, ctx, info) {

        return ctx.db.Fixtures.find()
            .sort({
                date: 1
            })
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
            .sort({
                date: -1
            })
            .then(results => {
                return results
            })
            .catch(e => {
                console.log(e);
            });
    },
    Result(parent, args, ctx, info) {

        return ctx.db.Results.find()
            .select('games date _id')
            .then(results => {

                let result = results.map((res) => {

                    let data = res.games.filter(obj => {
                        if (obj.home === args.id || obj.away === args.id) {
                            return obj
                        }
                    })

                    return {
                        games: [data[0]],
                        date: res.date,
                        _id: res._id
                    };
                })

                result = result.filter(obj => {
                    return obj.games.find(g => {
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
    },

    // Squad
    Squad(parent, args, ctx, info) {
        return ctx.db.Player.find()
            .then(players => {
                let teamPlayers = players.map(p => {
                    if (p.team == args.id) {
                        return p;
                    }
                })

                let team = teamPlayers.filter(pl => {
                    if (pl != null) {
                        return pl;
                    }
                })


                return team;
                
                
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