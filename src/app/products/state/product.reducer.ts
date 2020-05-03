import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    produtos: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

export function reducer(state: ProductState, action): ProductState {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            console.log('state antigo ', state);
            console.log('payload: ', action.payload);
            return {
                ...state,
                showProductCode: action.payload
            };

            default:
                return state;
    }
}
