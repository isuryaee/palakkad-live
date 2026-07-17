/**
 * LivePalakkad PM2 Configuration
 * 
 * Usage:
 *   Development:   pm2 start ecosystem.config.js --env development
 *   Production:    pm2 start ecosystem.config.js --env production
 *   Monitor:       pm2 monit
 *   View logs:     pm2 logs
 *   Restart all:   pm2 restart all
 *   Stop all:      pm2 stop all
 *   Delete all:    pm2 delete all
 *   Save state:    pm2 save
 *   Resurrect:     pm2 resurrect
 */

module.exports = {
  apps: [
    {
      name: "livepalakkad",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "./",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      merge_logs: true,
      // Auto-restart if app crashes
      autorestart: true,
      // Watch for file changes (development only)
      // watch: ["app", "lib", "prisma"],
      // ignore_watch: ["node_modules", "logs", ".next"],
      // Max memory before restart
      max_memory_restart: "500M",
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 5000,
      shutdown_with_message: true,
    },
  ],

  // Cluster mode log streaming
  watch: false,
  
  // Node.js specific settings
  "node_args": "--max-old-space-size=2048",
};
