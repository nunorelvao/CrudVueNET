import Vue from 'vue';

export default Vue.component('my-toast',
    {
        template: '<div></div>',
        data: function () {
            return {

            }
        },
        mounted: function () {
            if (this.myShow)
                this.makeToast();
        },
        props: {
            show: {
                type: Boolean,
                required: false
            },
            variant: {
                type: String,
                required: false,
                default: ""
            },
            toasttitle: {
                type: String,
                required: true,
                default: "N/A"
            },
            toasttext: {
                type: String,
                required: true,
                default: "N/A"
            },
            append: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        watch: {
            show: function (newVal, oldVal) {
                console.log(this.myToastText + " - " + this.toasttext)
                if (newVal === true)
                    this.makeToast();
            }
        },
        methods: {
            makeToast() {

                this.$bvToast.toast(this.toasttext, {
                    title: this.toasttitle,
                    variant: this.variant,
                    solid: true,
                    autoHideDelay: 5000,
                    appendToast: this.append
                })
            }
        }
    }
)
