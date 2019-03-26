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
       items: [{
                href: "ious",
                src: require("./imgs/iSlider-1.jpg"),
            }, {
                href: "home",
                src: require("./imgs/iSlider-1.jpg"),
            }],

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

