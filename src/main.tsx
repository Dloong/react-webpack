import React from 'react'
import ReactDom from "react-dom"
import Header from "./views/Header"
import Content from "./views/Content"

function Search () {
    return (
        <div>
            <Header />
            <Content />
            <div>这是一个react的test page</div>
        </div>
    )
}

ReactDom.render(
    <Search />,
    document.getElementById("root")
)