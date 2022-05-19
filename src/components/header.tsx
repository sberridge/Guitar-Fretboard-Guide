import React from "react";
type HeaderProps = {
    title: string
}
export default function Header({title}:HeaderProps) {
    return <header className="app-header">                
        <h1 className="app-header__title">{title}</h1>
    </header>
}