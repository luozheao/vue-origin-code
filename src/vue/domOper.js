/*
 * @Author: your name
 * @Date: 2020-10-21 09:59:20
 * @LastEditTime: 2020-10-23 18:04:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2.0-test\vue3.0_demo\src\vue\domoper.js
 */
import { renderVNode, watcherFn, reactiveFn } from './render'
export default {
    insert(el, target) {
        el.appendChild(target)
    },
    createElement(item, el) {
        let { tag, props } = item

        return document.createElement(tag)

    },
    setAttribute(el, props) {
        if (!props) return
        Object.keys(props).forEach(key => {
            if (key == 'events') {
                let events = props[key]
                Object.keys(events).forEach(event => {
                    el.addEventListener(event, events[event])
                })
            } else {
                el.setAttribute(key, props[key])
            }
        })
    },
    patchAttribute(prev, next, el) {
        Object.keys(prev).forEach(key => {
            if (!next.hasOwnProperty(key) && key != 'events') {
                el.removeAttribute(key)
            }
        })
        Object.keys(next).forEach(key => {
            if (key != 'events') {
                el.setAttribute(key, next[key])
            }
        })

        let prevEvents = prev['events'] || {}
        let nextEvents = next['events'] || {}
        Object.keys(prevEvents).forEach(event => {
            let nextEvent = nextEvents[event]
            if (!nextEvent) {
                el.removeEventListener(event, nextEvent)
            }
        })
        Object.keys(nextEvents).forEach(event => {
            let prevEvent = prevEvents[event]
            if (prevEvent) {
                el.removeEventListener(event, prevEvent)
            }
            el.addEventListener(event, nextEvents[event])
        })

    },
    setText(el, text) {
        el.append(text)
    }
}