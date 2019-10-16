import React from "react"
import NavigationOption from "./NavigationOption.js"
import "./NavigationBar.css"


const NavigationBar = () => (
    <ul className="navigation-bar">
        <NavigationOption
            title="Recipes"
            link="/recipes"/>
        <NavigationOption
            title="New Recipe"
            link="/new/recipe"/>
    </ul>
)


export default NavigationBar
