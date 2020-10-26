<!--
 * @Author: your name
 * @Date: 2020-09-28 11:32:41
 * @LastEditTime: 2020-10-26 11:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2.0-test\vue3.0_demo\src\App.vue
-->
<template> 
   <HelloWorld msg="Welcome to Your Vue.js App"/>
   <div id="container"></div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import MyCompSex from './vue/component/sex.js'
    import {
        renderVNode,
        reactiveFn,
        watcherFn,

    } from './vue/render.js'
    import {
        ref,
        computed,
        onMounted,
        h,
        watch,
        watchEffect,
        reactive,
        toRefs
    } from 'vue'
    export default {
        component: {
            HelloWorld
        },
        setup(props, context) {

            // 最长递增子序列
            let arr = [2, 1, 6, 3, 7, 8, 5, 7, 2, 9]

            // 1.动态规划


            onMounted(() => {
                let container = document.getElementById('container')
                let state = reactiveFn({
                    name: 'luojie',
                    age: 18,
                    love: 'haha'
                })

                let oldVNode = {
                    tag: 'div',
                    props: {
                        class: 'luo',
                        style: "color:red;",
                        events: {
                            click: () => {
                                alert(1)
                            }
                        }
                    },
                    children: 'hello diff'
                }

                renderVNode(oldVNode, container)
                setTimeout(() => {
                    let newVNode = {
                        tag: 'div',
                        props: {
                            class: 'luozheao',
                            style: "color:blue;",
                            events: {
                                click: () => {
                                    alert(2)
                                }
                            }
                        },
                        children: 'hello luozheao'
                    }
                    renderVNode(newVNode, container)
                }, 1000);

                // watcherFn(() => {
                //     // diff 算法
                //     // jie.innerText = `姓名:${state.name},年龄:${state.age}` 
                //     let vNode = {
                //         tag: 'div',
                //         props: {
                //             class: 'luo'
                //         },
                //         children: [{
                //             tag: 'span',
                //             props: {
                //                 class: 'jie',
                //                 style: 'color:red;',
                //                 events: {
                //                     onclick() {
                //                         state.age += 1
                //                     }
                //                 }
                //             },
                //             children: `姓名:${state.name},年龄:${state.age}`
                //         }, {
                //             tag: MyCompSex,
                //             props: {
                //                 name: 'a1'
                //             }, // 
                //             children: '' // 插槽
                //         }, {
                //             tag: MyCompSex,
                //             props: {
                //                 name: 'a2'
                //             }, // 
                //             children: '' // 插槽
                //         }]
                //     }
                //     renderVNode(vNode, container)
                // })


            })
            return {
                HelloWorld
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>