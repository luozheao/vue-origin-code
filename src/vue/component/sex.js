/*
 * @Author: your name
 * @Date: 2020-10-21 10:55:35
 * @LastEditTime: 2020-10-23 16:51:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2.0-test\vue3.0_demo\src\vue\component\sex.js
 */
import {
    renderVNode,
    reactiveFn,
    watcherFn,
} from '../render.js'

export default {
    data() {
        return {
            name: 'luozheao',
            age: 31
        }
    },
    setup(props, state) {
        return {
            tag: 'div',
            props: {
                class: 'haha',
                events: {
                    onclick() {
                        state.age += 1
                    }
                }
            },
            children: `我是子组件${props.name},年龄:${state.age}`
        }
    }
}