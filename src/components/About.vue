<template>
    <div class="about">
        <h1>{{ msg }}</h1>
        <p>
            This is a proof of concept of a prototype.
        </p>
    </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'About this app'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
