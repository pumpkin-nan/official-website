<template>
  <div style="width: 800px; height: 800px">
    <div id="app">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.key"
          :label="item.label"
          :name="item.name"
        >
          <div class="mainContent">
            <component
              :is="item.tab"
              v-if="item.name === activeName"
              :name="item.key"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Map from "./map.vue";
import Map2 from "./map2.vue";
import tailwind from "./styleTest.vue";
export default {
  components: { Map, Map2, tailwind },
  data() {
    return {
      tabs: [
        {
          label: "地图1",
          name: "first",
          tab: "Map",
        },
        {
          label: "地图2",
          name: "second",
          tab: "Map2",
        },
        {
          label: "tailwind",
          name: "three",
          tab: "tailwind",
        },
      ],
      activeName: "first",
    };
  },
};
</script>
<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
