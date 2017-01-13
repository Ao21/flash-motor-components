interface BenefitItem {
	description: string;
	inHeader: boolean;
	included: boolean;
}

interface BreakdownItem {
	description: string;
	price: Price;
	discount: boolean;
}
interface ProductItem {
	name: string;
	id: string;
	benefits: BenefitItem[];
	breakdown: BreakdownItem[];
	premium: {
		monthly: {
			deposit: Price;
			installments: {
				number: number;
				installment: Price;
			}
			apr: string;
		};
		annual: {
			deposit: Price;
			installments: {
				number: number;
				installment: Price;
			}
			apr: string;
		};
	};
}

interface Quote {
	reference: string;
	products: ProductItem[];
	paymentFrequency: string;
	activeProduct: string;
}
