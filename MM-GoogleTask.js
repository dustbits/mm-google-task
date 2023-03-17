Module.register("MM-GoogleTask", {
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
      return ["MM-GoogleTask.css"];
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
         this.sendSocketNotification("MM-GoogleTask-GET_DATA", url);
      }
   },

   socketNotificationReceived: function (notification, payload) {
      if (notification === "MM-GoogleTask-DATA_RECEIVED") {
         this.tasks = payload.items;
         this.updateDom();
      }
   },
});
