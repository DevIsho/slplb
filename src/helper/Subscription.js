const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info){
            let count = 0;
            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count');
        }
    },
    Time:{
        subscribe(parent, args, {pubsub}, info){
            return pubsub.asyncIterator('time')
        }
    }
}

export {Subscription as default}