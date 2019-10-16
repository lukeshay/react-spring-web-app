import React from "react"
import NavigationOption from "./NavigationOption.js"
import "./NavigationBar.css"

const NavigationBar = () => (
    <ul className="navigation-bar">
        <NavigationOption
            id="active"
            align="left"
            title="Home"
            link="/Home"/>
        <NavigationOption
            align="left"
            title="Classes"
            link="/classes"/>
        <NavigationOption
            align="left"
            title="Reminders"
            link="/reminders"/>
        <NavigationOption
            align="left"
            title="Calendar"
            link="/calendar"/>
        <NavigationOption
            align="right"
            img="./white-circle.png"
            title="Account"
            link="/account"/>
    </ul>
)


export default NavigationBar
