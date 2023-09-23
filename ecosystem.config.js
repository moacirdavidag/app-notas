module.exports = {
  apps : [{
    name: "app",
    script: "./index.js",
    instance: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
