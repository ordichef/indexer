const dotenv = require('dotenv')
dotenv.config()
const name = 'indexer_' + process.env.NODE_ENV
const nameCron = 'cron_' + process.env.NODE_ENV



module.exports = {
  apps: [
    {
      name: name,
      script: 'yarn',
      args: 'start',
      // interpreter: '/bin/bash -c',
      time: true,
      exec_mode : "fork",
      autorestart: true,
      // max_restarts: 50,
      watch: false,
      max_memory_restart: '4G',
      // instances: "max",
    },
    {
      name: nameCron,
      script: 'yarn',
      args: 'cron',
      // interpreter: '/bin/bash -c',
      time: true,
      exec_mode : "fork",
      autorestart: true,
      // max_restarts: 50,
      watch: false,
      max_memory_restart: '4G',
      // instances: "max",
    },
  ],
  deploy: {
    production: { 
      user: 'root',
      host: ['18.143.123.214'],
      key: 'deploy.key',
      ref: 'origin/main',
      exec_mode: "fork",
      repo: 'git@github.com:abcxyzmn/indexer.git',
      path: '/data/www/brc-indexer',
      'post-setup': 'ls -la && pwd',
      'post-deploy':
      'yarn && pm2 reload ecosystem.config.js --env production --update-env && pm2 save',
      // postinstall: "$(yarn bin)/pm2 install typecsript"
    },
    develop: { 
      user: 'root',
      host: '18.143.123.214',
      key: 'deploy.key',
      ref: 'origin/develop',
      repo: 'git@github.com:abcxyzmn/indexer.git',
      path: '/data/www/hmnd',
      'post-setup': 'ls -la && pwd',
      'post-deploy':
      'yarn && pm2 reload ecosystem.config.js --env develop  --update-env&& pm2 save',
    }
  },
}