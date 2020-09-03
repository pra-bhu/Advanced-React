const { forwardTo } = require("prisma-binding")

const Query = {
    // users(parent, args, ctx, info) {
    //     global.users = global.users || [];

    //     return global.users
    // }
    /* async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items()
        return items
    } */
    items: forwardTo('db'),
    item: forwardTo('db')

};


module.exports = Query;