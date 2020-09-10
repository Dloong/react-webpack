/* eslint-disable react/destructuring-assignment */
import React from "react"
import ReactDOM from "react-dom"
import { CircularProgress, Backdrop } from "@material-ui/core"

const defaultState = {
  show: false,
  progress: 0,
}

class ProgressLoading extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { ...defaultState }
  }

  show() {
    // 开始显示
    this.setState({
      show: true,
    })
  }
  done() {
    // 结束隐藏
    this.setState({
      show: false,
    })
  }
  render() {
    return this.state.show ? (
        <Backdrop style={{ zIndex: 9999 }} open={this.state.show}>
            <div>
                <CircularProgress />
            </div>
        </Backdrop>
    ) : null
  }
}
// 创建元素追加到body
const div = document.createElement("div")
const props = {}
document.body.append(div)

// eslint-disable-next-line react/no-render-return-value
const Box = ReactDOM.render(React.createElement(ProgressLoading, props), div)

export default Box
