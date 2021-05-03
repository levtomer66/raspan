<template>
  <div  class="content countdown-timer">
    <p>Machine: {{ json_obj.machine.TotalResults }} Dates</p>
    <p> {{ json_obj.machine.Results }} </p>
    <br /><br />
    <p>Navigation: {{ json_obj.navigation.TotalResults }} Dates</p>
    <p> {{ json_obj.navigation.Results }} </p>
    <a href="https://myvisit.com/#!/home/service/6142"><span>Link</span></a>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');
.content {
  max-width: 900px;
  margin: auto;
  text-align: center;
}
:root {
  --backgroundColor: rgba(246, 241, 209);
  --colorShadeA: rgb(106, 163, 137);
  --colorShadeB: rgb(121, 186, 156);
  --colorShadeC: rgb(150, 232, 195);
  --colorShadeD: rgb(187, 232, 211);
  --colorShadeE: rgb(205, 255, 232);
}
* {
  box-sizing: border-box;
}
*::before, *::after {
  box-sizing: border-box;
}
body {
  font-family: 'Amatic SC', 'OpenSans', sans-serif;
  font-size: 3rem;
  line-height: 2;
  display: flex;
          align-items: center;
          justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: var(--backgroundColor);
}

</style>

<script>
  export default {
    data() {
      return {
        json_obj: {}
      }
  },
  fetch() {
    this.$axios.get("/api/raspan").then(response => {
      console.log(response);
      this.json_obj = response.data

    })
  },
  created() {
    
  },
  methods: {
    
  }

  }
</script>
