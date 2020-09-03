const Mutations = {
    /*  createUser(parent, args, ctx, info) {
         global.users = global.users || [];
         //create a user
         let { id, name } = args
         const user = { id, name }
         global.users.push(user)
         return user
 
     }, */
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: {...args }
        }, info)
        return item
    },
    async updateItem(parent, args, ctx, info) {
        //first take a copy of updates
        const updates = {...args }
            //remove id from the updates
        delete updates.id
        const item = await ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
        return item
    }
};

module.exports = Mutations;