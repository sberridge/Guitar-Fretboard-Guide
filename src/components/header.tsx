import React from "react";
type HeaderProps = {
    title: string
}
export default function Header({title}:HeaderProps) {
    return <header className="navbar">                
        <div className="navbar-brand">
            <div className="navbar-item">
                <h1 className="title is-3 has-text-light">{title}</h1>
            </div>
        </div>
        
    </header>;
}