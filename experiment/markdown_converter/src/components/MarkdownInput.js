import React from "react";

const MarkdownInput = props => {
    return (
        <div className="markdown">
            <textarea
                id="area"
                cols="100"
                rows="55"
                autoFocus={true}
                value={props.textareaValue}
                onChange={props.onChange}
            ></textarea>
        </div>
    );
};

export default MarkdownInput;
