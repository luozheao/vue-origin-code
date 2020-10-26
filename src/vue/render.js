/*
 * @Author: luozheao
 * @Date: 2020-10-21 10:00:39
 * @LastEditTime: 2020-10-26 10:32:34
 * @LastEditors: Please set LastEditors
 * @Description:  vue核心部件
 * @FilePath: \vue2.0-test\vue3.0_demo\src\vue\render.js
 */
import domOper from './domOper.js'
export function renderVNode(vNode, container) {
    patch(container._vNode, vNode, container)
    container._vNode = vNode
}

function patch(n1, n2, container) {
    if (typeof n2 == 'string') {
        // "字符串"节点
        domOper.setText(container, n2)
    } else if (typeof n2.tag == 'object') {
        // 组件
        mountComponent(n2, container)
    } else if (typeof n2.tag == 'string') {
        //普通标签
        if (n1 == undefined) {
            mountElement(n2, container)
        } else {
            patchElement(n1, n2, container)
        }
    }
}

function mountComponent(vNode, container) {
    let { tag, props } = vNode
    tag = Object.assign({}, tag)
    let state = tag.data ? reactiveFn(tag.data()) : null
    watcherFn(() => {
        renderVNode(tag.setup(props, state), container)
    })
}

function mountElement(vNode, container) {
    let el = vNode.el = domOper.createElement(vNode, container)
    domOper.setAttribute(el, vNode.props)
    domOper.insert(container, el)
    let children = vNode.children
    if (typeof children == 'string') {
        domOper.setText(el, children)
    } else if (Array.isArray(children)) {
        children.forEach(child => {
            renderVNode(child, el)
        })
    }
}

function patchElement(n1, n2, container) {
    let el = n2.el = n1.el
        // 比对属性
    patchProps(n1.props, n2.props, el)
        // 比对孩子
    patchChildren(n1.children, n2.children, el)
}

function patchChildren(prev, next, el) {
    if (prev == next) return

}

function patchProps(prev, next, el) {
    if (prev == next) return
    domOper.patchAttribute(prev, next, el)
}

let action
    //  行为收集(行为=控制+显示) 
export function watcherFn(fn) {
    action = fn //记录,便于执行fn时存储
    fn()
    action = null //清空,避免执行行为时,再次收集
}
// 设置响应化
export function reactiveFn(state) {
    return new Proxy(state, {
        get(target, key) {
            track(target, key)
            return target[key]
        },
        set(target, key, value, receiver) {
            let res = Reflect.defineProperty(target, key, { value }, receiver)
            res && trigger(target, key)
            return res
        }
    })
}

// {name:'',age:''}:{
//     name:[effect1,effect2],
//     age:[]
// }

let trackSum = new WeakMap()
    //依赖收集
function track(target, key) {
    let trackTarget = trackSum.get(target)
    if (!trackTarget) {
        trackSum.set(target, (trackTarget = new Map()))
    }
    let trackTargetChild = trackTarget.get(key)
    if (!trackTargetChild) {
        // trackTargetChild = []
        trackTarget.set(key, (trackTargetChild = new Set()))
    }
    // trackTarget.set(key, [action, ...trackTargetChild])
    if (action && !trackTargetChild.has(action)) {
        trackTargetChild.add(action)
    }
    console.log(trackSum)
}
//依赖触发
function trigger(target, key) {
    let trackTarget = trackSum.get(target)
    if (!trackTarget) return
    let trackTargetChild = trackTarget.get(key)
    if (!trackTargetChild) return
    trackTargetChild.forEach(fn => fn())
}