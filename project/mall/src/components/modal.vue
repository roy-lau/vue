<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':modalShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">
					<!-- title -->
                    </div>
                    <button class="md-close" @click="closeModal">close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
						<!--  -->
						<slot name="message"></slot>
                    </div>
                    <div class="login-wrap">
                    	<slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="modalShow" @click="closeModal"></div>
    </div>
</template>
<script type="text/javascript">
	export default{
		props:['modalShow'],
		methods: {
			closeModal(){
				this.$emit("close")
				trigger("click")
			},
		}
	}
</script>