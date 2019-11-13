import React, { useState, useEffect } from "react";
import MarkdownInput from "./components/MarkdownInput";
import HtmlOutput from "./components/HtmlOutput";
import { parseMarkdown } from "./tools/parse";

const App = props => {
    const [textareaValue, setTextareaValue] = useState("");
    const [htmlText, setHtmlText] = useState([]);

    const onChange = event => {
        setTextareaValue(event.target.value);
    };

    useEffect(() => {
        setHtmlText(parseMarkdown(textareaValue));
    }, [textareaValue]);

    return (
        <>
            <MarkdownInput onChange={onChange} textareaValue={textareaValue} />
            <HtmlOutput htmlText={htmlText} />
        </>
    );
};

export default App;
