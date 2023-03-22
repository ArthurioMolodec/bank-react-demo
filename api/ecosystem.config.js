module.exports = {
   apps: [
      {
         name: "strapi",
         cwd: "/var/www/react-bank-api/api",
         script: "npm",
         args: "start",
         env: {
            NODE_ENV: "development",
         },
         env_production: {
            NODE_ENV: "production",
         },
      },
   ],
};
