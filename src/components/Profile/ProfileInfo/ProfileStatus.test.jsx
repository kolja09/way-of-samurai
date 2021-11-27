import React from "react";
import ProfileStatus from "./ProfileStatus";
import { create } from 'react-test-renderer'


describe('ProfileStatus component', () =>{
    test('status from props should be in the state',() =>{
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra.com')
    });

    test('after creation span should be displayed',() =>{
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull();
    })

    test("after creation input shouldn't be displayed",() =>{
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        const root = component.root;
        expect(() =>{
            let input = root.findByType('input');
        }).toThrow();
    })

    test("after creation span should be displayed",() =>{
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com');
    })

})