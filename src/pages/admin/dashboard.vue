<template>
  <div>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-5">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Сонгогчдын тоон статистик</h1>

        </div>
      </div>
    </portal>
    <div id="supersetContainer"></div>
  </div>
</template>

<script>
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "~/plugins/core/axios";
export default {
  components:{


  },
  data() {
    return {
      loading: false,
      dashboardData: {},
    }
  },

  computed: {
  },
  methods: {
    getData() {
      this.initDashboard();
    },
    onReadyDashboard(){
    },

    async  loginAndGetDashboardData(id) {
      try {
        const data = {
          password: 'embed',
          provider: 'db',
          refresh: true,
          username: 'embed'
        };

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://analytics.electionanalytics.live/api/v1/security/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data)
        };
        const response = await axios(config);

        try {
          const data = {
            user: {
              username: 'embed',
              first_name: 'embed',
              last_name: 'embed'
            },
            resources: [
              {
                type: 'dashboard',
                id: id
              }
            ],
            rls: []
          };

          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://analytics.electionanalytics.live/api/v1/security/guest_token/',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + response.data.access_token, // Replace with your actual access token
            },
            data: JSON.stringify(data)
          };
          const response2 = await axios(config);
          return response2.data.token;
        }
        catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async initDashboard(){
      const token  = await this.loginAndGetDashboardData("f32133da-9b56-46e7-94b0-fc10c9a6feda");

      await embedDashboard({
        id: "f32133da-9b56-46e7-94b0-fc10c9a6feda", // given by the Superset embedding UI
        supersetDomain: "https://analytics.electionanalytics.live",
        mountPoint: document.getElementById("supersetContainer"), // any html element that can contain an iframe
        fetchGuestToken: () => token,
        dashboardUiConfig: { // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional)
          hideTitle: true,
          filters: {
            expanded: false,
          }
        },
      });
    }
  },
  mounted() {
    this.getData();

  }
}
</script>


<style lang="scss">
#supersetContainer {
  width: 100%;
  height: calc(100vh - 100px);
  iframe {
    width: 100%;
    height: calc(100vh - 100px);
  }
}
</style>
