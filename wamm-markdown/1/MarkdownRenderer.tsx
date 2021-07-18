import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import * as gfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
}

const _MarkdownRenderer = (props: MarkdownRendererProps) => {
    const markdownRenderers = {
        //tableCell: (value: any) => { return <td {...value} className={classes.tableCell} /> },
        //tableHead: (value: any) => { return <th {...value} className={classes.tableHead} /> },
        //table: (value: any) => { return <table {...value} className={classes.table} /> }
        //math: (props: any) => { return <BlockMath math={props.value} /> },
        //inlineMath: (props: any) => { return <InlineMath math={props.value} /> }
    };

    return (
        <div style={{ whiteSpace: "pre-wrap" }}>
            <ReactMarkdown
                plugins={[gfm] as any}
                source={props.content}
                renderers={markdownRenderers}
            />
        </div>
    );
}

export const MarkdownRenderer = React.memo(_MarkdownRenderer);