import React from 'react';
import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';

test("Renders without errors", ()=> {
    render(<BubblePage />)
});

test('Fetches data and renders the bubbles on mounting', async() => {
    const bubbles = await screen.getByLabelText('bubble-wrap')
    render(<BubblePage />)
    expect(bubbles).toBeInTheDocument()
})