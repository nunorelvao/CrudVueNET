<template>
  <div class="home">
    <h1 v-html="title">{{ title }}</h1>

    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="0"
        controls
        indicators
        background="#ababab"
        img-width="800"
        img-height="200"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide>
          <h5>.Net Api Backend 3.1</h5>
          <p>The power of .Net Core 3.1</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt=".Net Api Backend 3.1"
                src="https://raw.githubusercontent.com/dotnet/docs/cb475ed45f881e9462e34764480d3b0ebce85e91/docs/images/hub/netcore.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>Vue.js</h5>
          <p>The power and simplicity of Vue.js</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="Vue.js"
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>TypeScript</h5>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="TypeScript"
                src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>OKTA Authentication</h5>
          <p>Flow with Oauth 2 and Okta Widget</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="OKTA Authentication"
                text="The power and simplicity of Vue.js"
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Okta_logo.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>Simple Data Storage</h5>
          <p>for now SQL Lite DB, easy implementation with any other DB provider</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="Simple Data Storage"
                text="The power and simplicity of Vue.js"
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/SQLite370.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>Azure Hosted</h5>
          <p>Free App Service 1GB Memory max 60 min per month usage for testing only</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="Azure Hosted"
                text="The power and simplicity of Vue.js"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>GitHub</h5>
          <p>CI/CD With GitHub Actions (Build docker Image to DockerHub Registry)</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                class="github-svg"
                alt="GitHub"
                text="The power and simplicity of Vue.js"
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <h5>DockerHub</h5>
          <p>Docker Hub Registry to store Docker Image</p>
          <template v-slot:img>
            <div class="fixed-img-carrousel">
              <img
                alt="DockerHub"
                text="The power and simplicity of Vue.js"
                src="https://cdn.worldvectorlogo.com/logos/docker.svg"
                width="auto"
                height="200"
              />
            </div>
          </template>
        </b-carousel-slide>
      </b-carousel>

      <p class="mt-4">
        Slide #: {{ slide }}
        <br />
        Sliding: {{ sliding }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "Made by Nuno Relvao",
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
  font-family: fantasy;
}

.fixed-img-carrousel {
  min-height: 200px;
  line-height: 200px;
  display: block;
  padding: 30px 0 130px 0;
  background-color: dimgrey;
}
</style>