import React, {Component} from 'react';
import 'antd/dist/antd.css'
import store from './store'
import TodoListUI from './todoLIstUi'
import axios from 'axios'

import {changeInputAction , addItemAction ,deleteItemAction,getListAction} from './store/actionCreators'



// 我们要实现的是在TodoList的Demo中,只要文本框中的值改变就redux中store的值就跟着改变，
// 并且随着Redux中的state值改变，组件也跟着改变。

export default class TodoList extends Component {
    constructor(){
        super()
        this.state = store.getState()
        store.subscribe(this.storeChange) //订阅Redux的状态
    }
    componentWillMount() {
      axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{    
        const data = res.data
        const action = getListAction(data)
        store.dispatch(action)
      })
    }

    changeInputValue = (e) => {
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    handleClick = () => {
        const action = addItemAction()
        store.dispatch(action)
    }
    handleDelete = (index) => {
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    render() {
        return (
          <TodoListUI 
            inputValue={this.state.inputValue} 
            list={this.state.list} 
            changeInputValue={this.changeInputValue} 
            handleClick={this.handleClick} 
            handleDelete={this.handleDelete}
          />
        )
    }
}
