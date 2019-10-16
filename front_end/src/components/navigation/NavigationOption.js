import React from "react"
import "./NavigationOption.css"

const NavigationOption = (props) => {
    if (props.img) {
        return (
            <li className="img">
                <img src={props.img} alt={props.img} />
                <a id={props.id} href={props.link}>{props.title}</a>
            </li>
        )
    }
    else {
        return (
            <li className={props.align}>
                <a id={props.id} href={props.link}>{props.title}</a>
            </li>
        )
    }
}

export default NavigationOption
