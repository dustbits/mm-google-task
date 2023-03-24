const NodeHelper = require("node_helper");
const {google} = require("googleapis");

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, config) {
    if (notification === "GET_TASKS") {
      this.getTasks(config);
    }
  },

  async getTasks(config) {
    try {
      const tasks = await this.fetchTasksFromGoogle(config);
      this.sendSocketNotification("TASKS_RESULT", tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  },

  async fetchTasksFromGoogle(config) {
    // Use the provided apiKey and other necessary credentials to connect to the Google Tasks API
    const auth = new google.auth.JWT(/* Your authentication parameters */);

    const tasksApi = google.tasks({version: "v1", auth});
    const result = await tasksApi.tasks.list({
      tasklist: "@default", // Change to the desired tasklist ID
      maxResults: config.maxTasks,
    });

    return result.data.items;
  },
});
