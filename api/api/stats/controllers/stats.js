'use strict';

const getMyStats = async ctx => {
   try {
      
      const { accId, daysPast = 30 } = ctx.params;

      const dateLimit = +new Date() - daysPast * 24 * 60 * 60 * 1000;

      const getStats = await strapi.query('stats').findOne();

      const accDetails = { type, currency, number };

      if (!getStats) {
         strapi.services.errors.throwError(400, 'No stats available, use dummy data creator');
      }

      const currentUser = ctx.state.user;

      const myAccount = await strapi
         .query('account')
         .findOne({ id: accId, owner: currentUser.id });

      if (!myAccount) {
         return ctx.throw(400, 'no-account');
      }


      // Stats: income, expenses for specific user
      const incomeStatsRes = getStats.income_stats
         .filter(el => +el.account === +accId && el.type === 'income' && +new Date(el.collected_at) >= dateLimit)
         .map(el => ({ ...el }));
      const expensesStatsRes = getStats.expenses_stats
         .filter(el => +el.account === +accId && el.type === 'expenses' && +new Date(el.collected_at) >= dateLimit)
         .map(el => ({ ...el }));

      return {
         accDetails: myAccount,
         data: [
            ...incomeStatsRes,
            ...expensesStatsRes   
         ]
      };
   } catch (error) {
      strapi.services.errors.throwError(400, error.message);
   }
};

module.exports = {
   getMyStats
};
