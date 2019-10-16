import React from "react"
import "./NavigationOption.css"

const NavigationOption = (props) => (
    <li className="navigation-option">
        <a href={props.link}>{props.title}</a>
    </li>
)

export default NavigationOption
