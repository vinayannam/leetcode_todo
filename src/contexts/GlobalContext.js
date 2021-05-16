import React, { Component, createContext } from 'react';


export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
  state = {
    prefersDarkMode: localStorage.getItem('darkMode') !== null ? JSON.parse(localStorage.getItem('darkMode')) : false,
    anchorMenuEl: null,
    menuSelectedIndex: 0,
    todoLists: ['amazon', 'bloomberg'],
    data: null,
    editable: null
  }
  
  componentDidMount(){
    this.getData()
  }

  getData = () => {
    const updateData = (data) => {
      this.setState({
        data: data,
        editable: new Array(data.length).fill(false)
      })
    }
    const currentList = this.state.todoLists[this.state.menuSelectedIndex]
    fetch(`data/${currentList}.json`
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      // done, review, comment
      data.forEach((item, index) => {
        data[index].push(false)
        data[index].push(false)
        data[index].push('')
      })
      var cache = localStorage.getItem(currentList)
      if (cache){
        cache = JSON.parse(cache) 
        if (cache.done){
          for(let index in cache.done){
            data[index][4] = true;
          }
        }
        if (cache.review){
          for(let index in cache.review){
            data[index][5] = true;
          }
        }
        if (cache.comment){
          for(let index in cache.comment){
            data[index][6] = cache.comment[index];
          }
        }
      }  
      updateData(data)
    });
  }

  toogleDarkMode = (event) => {
    localStorage.setItem('darkMode', event.target.checked)
    this.setState({
      prefersDarkMode: event.target.checked
    })
  }

  handleClickMenuItem = (event) => {
    this.setState({
      anchorMenuEl: event.currentTarget
    })
  }

  handleTodoClose = (event) => {
    this.setState({
      anchorMenuEl: null
    })
  }

  handleTodoClick = (event, index) => {
    this.setState({
      anchorMenuEl: null,
      menuSelectedIndex: index
    })
    this.getData()
  }

  handleLanding = (event) => {
    this.setState({
      anchorMenuEl: null
    })
  }

  updateEditable = (index) => {
    const old_editable = this.state.editable
    old_editable[index] = !old_editable[index]
    this.setState({
      editable: old_editable
    })
  }

  updateQuestion = (e, i, j, store) => {
    const currentList = this.state.todoLists[this.state.menuSelectedIndex]
    var cache = JSON.parse(localStorage.getItem(currentList))
    const old_data = this.state.data
    if (cache === null){
      cache = {}
    }
    if (j === 4){
      if (cache.done){
        if(i in cache.done){
          delete cache.done[i]
        }else{
          cache.done[i] = true
        }
      }else{
        cache.done = {}
        cache.done[i] = true
      }
      old_data[i][j] = !old_data[i][j]
    }
    if (j === 5){
      if (cache.review){
        if(i in cache.review){
          delete cache.review[i]
        }else{
          cache.review[i] = true
        }
      }else{
        cache.review = {}
        cache.review[i] = true
      }
      old_data[i][j] = !old_data[i][j]
    }
    if (j === 6){
      if (store){
        if (!cache.comment){
          cache.comment = {}
        }
        if (e.target.value){
          cache.comment[i] = e.target.value
        }else{
          if (i in cache.comment){
            delete cache.comment[i]
          }
        }
      }
      old_data[i][j] = e.target.value
    }
    if (store){
      localStorage.setItem(currentList, JSON.stringify(cache))
    }
    this.setState({
      data: old_data
    })
  }

  values = () => {
    return {
      ...this.state,
      toggleDarkMode: this.toogleDarkMode,
      handleTodoClose: this.handleTodoClose,
      handleClickMenuItem: this.handleClickMenuItem,
      handleTodoClick: this.handleTodoClick,
      handleLanding: this.handleLanding,
      updateEditable: this.updateEditable,
      updateQuestion: this.updateQuestion
    }
  }

  render() { 
    return (
      <GlobalContext.Provider value={this.values()}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
 
export default GlobalContextProvider;