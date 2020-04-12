<template>
  <section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Persons & Connections</h1>
          <h2 class="subtitle">Simple UI for Persons and their Connections</h2>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="notification">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Person">
            <Persons/>
          </b-tab-item>
          <b-tab-item label="Connections">
            <Connections/>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import Persons from './components/Persons';
import Connections from './components/Connections';

export default {
  components: {
    Persons,
    Connections
  },
  data() {
    return {
      activeTab: 0,
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
