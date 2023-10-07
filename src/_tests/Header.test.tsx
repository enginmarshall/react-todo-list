import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header test', () => {
    test("The header is shown on the page", () => {
        const headline = "This is a header";
        render(<Header headerType={'h1'} headerText={headline} />)
        expect(screen.getByText(headline)).toBeDefined();
    })
});