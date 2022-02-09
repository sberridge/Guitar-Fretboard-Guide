import React, { MouseEventHandler } from 'react';

type ButtonProps = {
    label: string
    id: string
    callback?: MouseEventHandler
}

class Button extends React.Component<ButtonProps> {
    
    constructor(props:ButtonProps) {
        super(props);
    }
    render() {
        return <button id={this.props.id} onClick={this.props.callback}>{this.props.label}</button>
    }
}

export default Button;