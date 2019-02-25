<template>
    <div class="footers">
        <footer class="footer">
            <div class="footer__wrap">
                <div class="footer__secondary">
                    <div class="footer__inner">
                        <div class="footer__region">
                            <span>{{$t('home.changeLang')}} : </span>
                            <select class="footer__region__select" @change="onChangeLang">
                                <option value="zh_CN">中文</option>
                                <option value="en_US">USA</option>
                            </select>
                        </div>
                        <div class="footer__secondary__nav">
                            <span>{{$t('home.copyright')}}</span>
                            <a href="https://github.com/roy-lau/vue/tree/master/project/mall">
                                {{$t('home.about')}}
                              </a>
                            <a href="https://github.com/roy-lau">
                                {{$t('home.dev')}}
                              </a>
                            <a href="https://github.com/roy-lau/vue/blob/master/LICENSE">
                                {{$t('home.privacy')}}
                              </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'footers',
    props: {
        msg: String
    },
    methods: {
        // 切换语言
        onChangeLang(e) {
            this.$store.commit('changeLang', e.target.value)
            this.$i18n.locale = e.target.value;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>