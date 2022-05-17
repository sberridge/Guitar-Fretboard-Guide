import React from "react";
import {render} from '@testing-library/react';
import App from "..";


const createApp = (props:{title:string}) => {
    return <App
        title={props.title}
    ></App>
}

describe("Main App Test",()=>{
    it("should render the app",()=>{

        const comp = render(createApp({title: "MyApp"}));
        expect(comp.baseElement).toMatchSnapshot();
        expect(comp.queryByRole("heading", {name: "MyApp"})).toBeTruthy();

    })
})
