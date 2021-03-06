import {
  GraphQLServer,
  PubSub
} from 'graphql-yoga';
import Query from './helper/Query';
const express = require('express');
import Mutation from './helper/Mutation';
import Subscription from './helper/Subscription';
import db from './db/DriverToDB';
import _ from 'lodash';

const pubsub = new PubSub();
const port = process.env.PORT || 4000;

const resolvers = {
  Query,
  Subscription,
  Game: {
    home(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.home)
        .then(data => {
          return data
        })
    },
    away(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.away)
        .then(data => {
          return data
        })
    }
  },
  TB: {
    team(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.team)
        .then(data => {
          return data
        })
    }
  },
  Form: {
    result(parent, args, ctx, info) {
      return ctx.db.Results.find()
        .then(data => {

          return data
        })
    }
  },
  Player: {
    team(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.team)
        .then(player => {

          return player
        })
    }
  },
  // Live Match
  Match: {
    home(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.home)
        .then(data => {
          return data
        })
    },
    away(parent, args, ctx, info) {
      return ctx.db.Teams.findById(parent.away)
        .then(data => {
          return data
        })
    }
  },
  HomeLineUp: {
    Starting(parent, args, ctx, info) {

      let pl = parent.Starting.map(p => {
        return ctx.db.Player.findById(p)
          .then(player => {

            return player
          })
      });

      return pl;
      
    }
  },
  AwayLineUp: {
    Starting(parent, args, ctx, info) {
      let pl = parent.Starting.map(p => {
        return ctx.db.Player.findById(p)
          .then(player => {

            return player
          })
      });

      return pl;
    }
  },
  Mutation
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub
  }
})

server.express.use('/image', express.static('images'))

const option = {
  port,
  bodyParserOptions: {
    limit: "100mb",
    type: "application/json"
  }
}

server.start(option, () => console.log('Server is running on localhost:' + port))