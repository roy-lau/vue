<template>
    <div class="goods-list">
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <span>Goods</span>
                </nav>
            </div>
        </div>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">Price
                        <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterby}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)"
                                :class="{'cur':priceChecked === 'all'}"
                                @click="priceChecked = 'all'">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilter">
                                <a href="javascript:void(0)"
                                :class="{'cur':priceChecked === index}"
                                @click="setPriceFilter(index)">
                                    {{price.startPrice}} - {{price.endPrice}}
                                </a>
                            </dd>
                        </dl>
                    </div>
                    <!-- search result accessories list -->
                    <!-- <img src="http://localhost:8080/assets/imgs/logo.png" alt="" /> -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="item.productImage" alt="hello"></a>
                                    </div>
                                    <div class="main">
                                        <div class="name" v-text="item.productName"></div>
                                        <div class="price" v-text="item.salePrice"></div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                                    <img :src="loadImg" alt="loading……" v-show="loading"/>
                                    <!-- <span v-show="!loading">我也是有底线的……</span> -->
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-overlay" v-show="overFlag" @click="closePop"></div>
        </div>
        <Modal :modal-show="modalShow" @close="closeModal">
            <p slot="message"> 请先登录，否则无法加入购物车！</p>
            <div slot="btnGroup" @click="modalShow=false">
                <a class="btn btn--m" >关闭</a>
            </div>
        </Modal>
        <Modal :modal-show="modalShowCart" @close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
              </svg>

            加入购物车成功！
            </p>
            <div slot="btnGroup" @click="modalShowCart=false" class="btn-area">
                <a class="btn btn--m" >继续购物</a>
                <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
            </div>
        </Modal>
    </div>
</template>
<script>

import infiniteScroll from 'vue-infinite-scroll'
import Modal from '@/components/modal'
export default {
    name: 'goodsList',
    directives: {infiniteScroll},
      components: {
        Modal
    },
    data() {
        return {
            goodsList: {
                "status": "0",
                "result": [{
                        "productId": "10001",
                        "productName": "小米6",
                        "prodcutPrice": "2499",
                        "prodcutImg": require("./imgs/mi6.jpg")
                    }]
            },
            priceFilter: [{
                startPrice: '00.00',
                endPrice: '100.00',
            }, {
                startPrice: '100.00',
                endPrice: '500.00',
            }, {
                startPrice: '500.00',
                endPrice: '1000.00',
            }, {
                startPrice: '1000.00',
                endPrice: '5000.00',
            }],
            loadImg:require('./imgs/loading-spinning-bubbles.svg'),
            loading: true,
            sortFlag:true,
            modalShow: false,
            modalShowCart:false,
            page:1,
            pageSize:8,
            priceChecked: 'all',
            busy: false,
            filterby: false,
            overFlag: false,
        }
    },
    mounted() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(flag) {
            if (this.goodsList.count<8) return
            let param = {
                page: this.page,
                pageSize:this.pageSize,
                sort: this.sortFlag?1:-1,
                priceLevel:this.priceChecked
            }
            this.loading = true
            this.$axios.get('goods/list',{params:param}).then(res => {
                this.loading = false
                console.log(res)
                let data = res.data
                if (data.status) {
                    alert(data.msg)
                }else{
                    if (flag) {
                        this.goodsList = this.goodsList.concat(data.result.list)
                        if (data.result.count) {
                            this.busy = false
                        }else{
                            this.busy = true
                        }
                    }else{
                        this.goodsList = data.result.list
                        this.busy = false
                    }
                }
            })
        },
        // 商品排序
        sortGoods(){
            this.sortFlag = !this.sortFlag
            this.page = 1
            this.getGoodsList()
        },
        // 点击价格区间
        setPriceFilter(index) {
            this.priceChecked = index
            this.page = 1
            this.getGoodsList()
            this.closePop()
        },
        // 加载更多
        loadMore(){
            this.busy = true;
              setTimeout(() => {
                this.page ++
                this.getGoodsList(true)
                this.busy = true;
              }, 1000);
        },
        // 加入购物车
        addCart(productId){
            this.$axios.post('goods/addCart',{productId:productId}).then(res =>{
                let data = res.data
                if (data.status) {
                    this.modalShow = true;
                }else{
                    this.modalShowCart= true
                }
            })
        },
        // 关闭模态框
        closeModal(){
            this.modalShow = false
        },
        // 显示
        showFilterPop() {
            this.filterby = true
            this.overFlag = true
        },
        // 关闭
        closePop() {
            this.filterby = false
            this.overFlag = false
        },

    }

}
</script>