import { formatCurrency } from "../../scripts/utils/money.js";

//  create a suite: formar currency
describe('Test suite: formatCurrency', () => {
    it('convert cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('work with 0: edge case: edge case', () => {
        expect(formatCurrency(0)).toEqual('0.00'); 
    });

    it('rounds up to the nearest cents: edge case', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('should format 2000.4 as $20.00: edge case', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00')
    })

    it('Catch non number param: edge case', () => {
        expect(formatCurrency("2000.4")).toEqual(NaN);
    })
});


