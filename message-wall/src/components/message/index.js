import { createVNode, render } from "vue";
import Message from './index.vue'

//创建一个div
const divNode = createVNode('div')

//将创建的div放入body中
render(divNode, document.body)

//创建div的虚拟dom用来给vue监测
const div = divNode.el

//封装消息提示组件
const sendMessage = ({ message, type }) => {
    //创建message组件
    const messageNode = createVNode(Message, { message, type })
    //将message组件节点加入到创建的div中
    render(messageNode, div)
    console.log(div);
    
    //3s后自动卸载
    setTimeout(() => {
        render(null, div)
    }, 3000);
}

export default sendMessage


