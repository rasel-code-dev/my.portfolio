import React, {useContext} from "react";

import { MyContext } from "./AppWrapper"

function connect(HOC, actions){
  return function (props){
    
    let state = useContext(MyContext)
  
    function actionsFn(){
      return recursiveFunction()
    }
  
    function recursiveFunction(){
      let m = {}
      for (const funcName in actions) {
        m[funcName] = function (...payload) {
          const nestedActionFn = actions[funcName](...payload)
          nestedActionFn(dispatch, {...state})
        }
      }
      // return function of modified version
      // that return with dispatch, and state in side actions
      return m
    }
    
  
    function dispatch(data){
      let updatedState = state.callback(data)
      return updatedState
    }
    
    return (
      <MyContext.Consumer>
        { (value=> {
          return (
            <HOC
              {...props}
              {...value}
              {...actionsFn()}
            />
          )
        })
        }
      </MyContext.Consumer>
    )
  }
}


export default connect