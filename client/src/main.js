import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    sendMessage: function(message) {
      console.log(this.$connection);
      this.$connection.send(message);
    }
  },
})

// Event bus... Cool!
export const bus = new Vue();

const app = new Vue({
  vuetify,
  router,
  render: h => h(App),
  created: function() {
    console.log("Starting connection to WebSocket Server")
    var HOST = location.origin.replace(/^http/, 'ws')
    var ws = new WebSocket(HOST);
    Vue.prototype.$connection = new WebSocket(ws);

    Vue.prototype.$connection.onmessage = function(event) {
      if (event && event.data) {
        const parsedData = event.data.split(':');
        const roomId = parsedData.shift();
        const msgType = parsedData.shift();

        if (msgType && roomId) {
          let responseObj = {roomId: roomId, data: parsedData}
          console.log(responseObj);
          bus.$emit(msgType, responseObj);
        }
      }

    }

    Vue.prototype.$connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the websocket server...")
    }

    Vue.prototype.$connection.onclose = function(event) {
      console.log(event)
      console.log("Closed connection to websocket server...")
    }

    Vue.prototype.$connection.onerror = function(event) {
      console.log(event)
      console.log("Error with the connection to the websocket server...")
    }

  }
});
app.$mount('#app')
