import React from "react";
import "./NavigationOption.css";

export default class NavigationOption extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.img) {
            return (
                <li className="img">
                    <img src={this.props.img} alt={this.props.img} />
                    <a href={this.props.link}>{this.props.title}</a>
                </li>
            );
        }
        else {
            return (
                <li className={this.props.align}>
                    <a href={this.props.link}>{this.props.title}</a>
                </li>
            );
        }
    }
}
