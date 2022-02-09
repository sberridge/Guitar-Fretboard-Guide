import React, { useEffect } from "react";

type ModalProps = {
    title: string
    onClose: CallableFunction
    triggerId: string
}

type ModalState = {
    open: boolean
}

class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props:ModalProps) {
        super(props);
        this.state = {
            open: false
        };

        
    }

    componentDidMount() {
        let trigger = document.getElementById(this.props.triggerId);
        trigger?.addEventListener('click',(e)=>{
            e.preventDefault();
            this.handleTrigger();
        })
    }

    handleTrigger() {
        console.log('hi');
        this.setState({
            open: !this.state.open
        });
    }

    render() {

        let classes = [
            "modal"
        ];
        if(this.state.open) {
            classes.push("open");
        }

        return <div className={classes.join(" ")}>
            <h1>{this.props.title}</h1>
            <div className='modal__content'>
                <p>Hello</p>
            </div>
        </div>
    }
}

export default Modal;