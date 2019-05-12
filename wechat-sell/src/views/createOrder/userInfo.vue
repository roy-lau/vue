<template>
  <div class="user-info">
    <Toast v-model="toastShow" type="text" :time="800" is-show-mask :text="toastText"></Toast>
    <Group title="个人信息" label-align="left">
      <x-input title="姓名" v-model="name" :required="true"></x-input>
      <x-input title="电话" v-model="phone" :max="13" is-type="china-mobile" :required="true"></x-input>
    </Group>
    <Group title="选择预约时间">
      <datetime
        v-model="time"
        format="YYYY-MM-DD HH:mm"
        @on-change="changeDateTime"
        title="时间"
        year-row="{value}年"
        month-row="{value}月"
        day-row="{value}日"
        hour-row="{value}点"
        minute-row="{value}分"
        confirm-text="完成"
        cancel-text="取消"
      />
    </Group>
    <br>
    <x-button type="primary" @click.native="toCreateOrder">确定</x-button>
  </div>
</template>
<script>
import { Toast, Group, Cell, XInput, Datetime, XButton } from "vux";
import { mapMutations } from "vuex";
export default {
  components: {
    Toast,
    Group,
    Cell,
    XInput,
    Datetime,
    XButton
  },
  data() {
    return {
      name: "",
      phone: "",
      time: "",
      toastShow: false,
      toastText: "hi"
    };
  },
  created() {
    document.title = "用户信息";
  },
  methods: {
    // 时间变化 触发
    changeDateTime(value) {
      this.time = value;
    },
    //   回创建订单
    toCreateOrder() {
      if (!this.name) {
        this.toastText = "您忘记填写姓名了";
        this.toastShow = true;
        return;
      } else if (!this.phone) {
        this.toastText = "您忘记填写手机号了";
        this.toastShow = true;
        return;
      } else if (!this.time) {
        this.toastText = "您忘记选择填写时间了";
        this.toastShow = true;
        return;
      }
      this.setUserInfo({
        name: this.name,
        phone: this.phone,
        time: this.time
      });
      this.$router.push("/create-order");
    },
    ...mapMutations({
      setUserInfo: "SET_ORDER_USER_INFO"
    })
  }
};
</script>
