Module.register("mm-google-task", {
   defaults: {
      api_key: "",
      list_id: "",
      max_results: 10,
   },

   start: function () {
      this.tasks = [];
      this.getData();
   },

   getStyles: function () {
      return ["mm-google-task.css"];
   },

   getTemplate: function () {
      return "templates/template.njk";
   },

   getTemplateData: function () {
      return { tasks: this.tasks };
   },

   getData: function () {
      if (this.config.api_key !== "" && this.config.list_id !== "") {
         var url = `https://www.googleapis.com/tasks/v1/lists/${this.config.list_id}/tasks?key=${this.config.api_key}&maxResults=${this.config.max_results}`;
         this.sendSocketNotification("mm-google-task-GET_DATA", url);
      }
   },

   socketNotificationReceived: function (notification, payload) {
      if (notification === "mm-google-task-DATA_RECEIVED") {
         this.tasks = payload.items;
         this.updateDom();
      }
   },
});
