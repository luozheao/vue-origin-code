<!--
 * @Author: your name
 * @Date: 2020-09-28 11:32:41
 * @LastEditTime: 2020-10-20 11:43:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2.0-test\vue3.0_demo\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    {{preStr}}
    <h1 @click="onClick">{{ msg }}</h1>
 
  </div> 
</template>

<script>
    import {
        defineComponent,
        ref,
        PropType
    } from 'vue'

    import * as type from '../types/index.js'

    export default ({
        data() {
            return {
                preStr: 'hello!'
            }
        },
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        setup(props) {
            let abc = (a) => {
                cosnole.log(a)
            }


        },
        methods: {
            onClick() {
                console.log(process.env.VUE_APP_TEST)
                console.log(process.env.VUE_APP_TEST1, type.SET_NAME)
                this.preStr = 'hi!' // ok    preStr被推断成 string
                this.preStr = 123 // error number类型不能分配给string类型 
            }
        }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>