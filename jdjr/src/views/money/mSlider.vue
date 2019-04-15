<template>
  <article>
    <Slider :items="items" :cname="$style.slider"/>
  </article>
</template>
<script>
import Slider from "@/components/slider";
export default {
  components: {
    Slider
  },
  data() {
    return {
      items: [
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/mSlider-1.jpg"),
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/mSlider-2.png"),
        }
      ],

    };
  }
};
</script>
<style lang="scss" module>
@import "@/assets/css/element.scss";
.slider {
  margin-top: 120px;
  img {
    width: 100%;
  }
}
</style>

