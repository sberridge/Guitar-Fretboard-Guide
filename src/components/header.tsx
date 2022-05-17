import React from "react";
type HeaderProps = {
    title: string
}
export default function Header(props:HeaderProps) {
    return <header className="app-header">                
        <h1 className="app-header__title">{props.title}</h1>
    </header>
}