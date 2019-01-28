<template>
    <div class="admin-goods">
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <span>admin Goods</span>
                </nav>
            </div>
        </div>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">filter productName:</span>
                    <input type="text" placeholder="input productName" />
                </div>
                <div class="accessory-result">
                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                 <li>
                                    <div class="pic">
                                        <a href="javascript:void(0)"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548672099185&di=c81129fabc4a257247ac4956c7450f4a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F01%2F65%2F58de763fad9c9_610.jpg" alt="新增商品"></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">新增商品</div>
                                        <div class="price" >+-∞</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m"  @click="modalShow=true">新增商品</a>
                                        </div>
                                    </div>
                                </li>
                                <li v-for="(item,index) in goodsList" :key="index">
                                	<div  @click="delGoods(item.productId)" class="close-warp" title="删除此商品">
					                    <button class="goods_pic_close"> </button>
                                	</div>
                                    <div class="pic">
                                        <a href="javascript:void(0)"><img v-lazy="item.productUrl" :alt="item.productName"></a>
                                    </div>
                                    <div class="main">
                                        <div class="name" v-text="item.productName"></div>
                                        <div class="price" v-text="item.salePrice"></div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="updateGoods(item)">修改商品</a>
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
        </div>
        <Modal :modal-show="modalShow" @close="closeModal">
            <div slot="message">
	            <div class="error-wrap">
	                    <span class="error error-show" v-show="errorTip">{{}} 不能为空！</span>
	            </div>
                <ul>
                    <li class="regi_form_input"><i class="input_name">商 品 名:</i>
                        <input type="text" tabindex="1"  autofocus autocomplete class="regi_login_input" style="left: 70px" v-model.trim="goodsFrom.productName" required autocomplete/>
                    </li>
                    <li class="regi_form_input noMargin"><i class="input_name">商品价格：</i>
                        <input type="text" tabindex="2" class="regi_login_input" style="left: 70px" v-model.trim="goodsFrom.salePrice" required autocomplete />
                    </li>
                    <li class="regi_form_input noMargin"><i class="input_name">商品链接：</i>
                        <input type="text" tabindex="3" class="regi_login_input" style="left: 70px" v-model.trim="goodsFrom.productUrl" required autocomplete />
                    </li>
                </ul>
            </div>
            <div slot="btnGroup" @click="modalShow=false">
                <a class="btn btn--m" >取消</a>
                <a class="btn btn--m btn--red" @click="headleGoods">确认</a>
            </div>
        </Modal>
         <Modal :modal-show="modalShowDel" @close="closeModal">
            <p slot="message">
                您确定要删除此商品吗？
            </p>
            <div slot="btnGroup" @click="modalShowDel=false">
                <a class="btn btn--m" >取消</a>
                <a class="btn btn--m btn--red" @click="delGoodsOk">确定</a>
            </div>
        </Modal>
    </div>
</template>
<script>
import '@/assets/css/product.css'
import infiniteScroll from 'vue-infinite-scroll'
import Modal from '@/components/modal'
export default {
    name: 'goodsList',
    directives: { infiniteScroll },
    components: {
        Modal
    },
    data() {
        return {
            goodsFrom:{},
            goodsList: [],
            loadImg: require('@/assets/loading/loading-spinning-bubbles.svg'),
            loading: true,
            modalShow: false,
            modalShowDel: false,
            errorTip: false,
            productId:null,
            delProductId:null,
            page: 1,
            pageSize: 8,
            busy: false,
        }
    },
    mounted() {
        this.getGoodsList()

    },
    methods: {
        getGoodsList(flag) {
            this.loading = true
            let param = {
                page: this.page,
                pageSize: this.pageSize,
                sort: -1,
                priceLevel: 'all'
            }
            this.$axios.get('goods/list', { params: param }).then(res => {
                let data = res.data
                // console.log(JSON.stringify(data.result.list))
                if (data.status) {
                    alert(data.msg)
                } else {
                    if (flag) {
                        this.goodsList = this.goodsList.concat(data.result.list)
                        if (data.result.count) {
                            this.busy = false
                        } else {
                            this.busy = true
                        }
                    } else {
                        this.goodsList = data.result.list
                        this.busy = false
                    }
                    this.loading = false
                }
            })
        },
        // 加载更多
        loadMore() {
        	if (this.goodsList.length === 0 ) return
            this.busy = true;
            setTimeout(() => {
                this.page++
                this.getGoodsList(true)
                this.busy = false;
            }, 1000);
        },
        // 点击修改商品
        updateGoods(goods){
        	this.productId = null;
        	this.productId = goods.productId;
        	this.goodsFrom = Object.assign({},this.goodsFrom,goods)
        	this.modalShow = true;
        },
        // 新增 && 修改商品
        headleGoods(){
        	console.log(this.productId,'from___data:',this.goodsFrom)
        	// 修改商品
        	if (this.productId) {
        		this.$axios.post('goods/headleGoods',this.goodsFrom).then(res=>{
        			let data = res.data
        			if (data.status) {
        				alert("修改失敗：",data.msg)
        			}else{
        				this.getGoodsList()
        			}
        		})
        	}else{ // 新增商品
        		this.$axios.post('goods/headleGoods',this.goodsFrom).then(res=>{
        			let data = res.data
        			if (data.status) {
        				alert("新增失敗：",data.msg)
        			}else{
        				this.getGoodsList()
        			}
        		})
        	}
        },
        // 点击删除商品
        delGoods(id){
        	this.delProductId =null
        	this.delProductId = id
        	this.modalShowDel = true
        },
        // 确认删除商品
        delGoodsOk(){
        		this.$axios.post('goods/del',{productId:this.delProductId}).then(res=>{
        			let data = res.data
        			if (data.status) {
        				alert("刪除失敗：",data.msg)
        			}else{
        				this.getGoodsList()
        			}
        		})
        },
        // 关闭模态框
        closeModal() {
            this.modalShow = false
            this.modalShowDel = false
        }
    }

}
</script>
<style scoped>
.input_name{
	 float: left;
	 margin-left: 8px;
}

.goods_pic_close:before, .goods_pic_close:after {
  position: absolute;
  top: 16px;
  left: -4px;
  content: "";
  width: 44px;
  height: 3px;
  background: #d7d8dd;
  -webkit-transition: -webkit-transform .5s ease-out;
  transition: -webkit-transform .5s ease-out;
  transition: transform .5s ease-out;
  transition: transform .5s ease-out, -webkit-transform .5s ease-out;
}

.goods_pic_close:before {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.goods_pic_close:after {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.goods_pic_close:hover:before, .goods_pic_close:hover:after {
	background-color:#d1434a;;
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
}

.goods_pic_close:hover:before {
	background-color:#d1434a;;
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

.goods_pic_close:hover:after {
	background-color:#d1434a;;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>