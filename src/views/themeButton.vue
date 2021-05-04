<template>
  <div class="themeButton">
      <button>默认按钮</button>
      <button type="primary">主要按钮</button>
      <button type="success">成功按钮</button>
      <button type="info">信息按钮</button>
      <button type="warning">警告按钮</button>
      <button type="danger">危险按钮</button>
  </div>
</template>

<script>

export default {
  name: 'themeButton',
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme/mixin.scss';
.themeButton{
  text-align: center;
  margin: 50px 0;
  button{
    height: 40px;
    width: 120px;
    border-radius: 3%;
    border: 1px solid;
    cursor: pointer;
    color: $color-black-opacity6;
    &[type]{
      @include text_color('btn');
    }
    &[type="primary"]{
      @include bg_color('btn-primary');
      @include border_color('btn-primary');
      &:hover{
        @include bg_color('btn-primary-hover');
      }
    }
    &[type="success"]{
      @include bg_color('btn-success');
      @include border_color('btn-success');
      &:hover{
        @include bg_color('btn-success-hover');
      }
    }
    &[type="info"]{
      @include bg_color('btn-info');
      @include border_color('btn-info');
      &:hover{
        @include bg_color('btn-info-hover');
      }
    }
    &[type="warning"]{
      @include bg_color('btn-warning');
      @include border_color('btn-warning');
      &:hover{
        @include bg_color('btn-warning-hover');
      }
    }
    &[type="danger"]{
      @include bg_color('btn-danger');
      @include border_color('btn-danger');
      &:hover{
        @include bg_color('btn-danger-hover');
      }
    }
  }
}
</style>
