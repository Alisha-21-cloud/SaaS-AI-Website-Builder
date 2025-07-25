import Prismjs from "prismjs"
import { useEffect } from "react"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-python"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"

import "./code-theme.css"

interface props {
    code: string
    lang: string
}

export function CodeView({
    code,
    lang
}: props) {
    useEffect(() => {
        Prismjs.highlightAll()
    }, [code])

    return (
        <pre
            className="p-2 bg-transparent border-none rounded-none m-0 text-xs"
        >
            <code
                className={`language-${lang}`}
            >
                {code}
            </code>
        </pre>
    )
}