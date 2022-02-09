
import { useState } from "react"
import Header from "./header"
export default function Layout({ children }:{children:any}) {
    const [state, setState] = useState({
        title: "Guitar Tutor"
    });
    return (
        <>
            <Header
                title={state.title}
            ></Header>
            <main>{ children }</main>
        </>
    )
}