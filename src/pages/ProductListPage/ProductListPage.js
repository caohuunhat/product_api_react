import React, { Component } from 'react'
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import callAPI from './../../utils/apiCaller';
import { Link } from 'react-router-dom';

class ProductListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        callAPI('products', 'GET', null)
            .then(res => {
                this.setState({
                    products: res.data
                });
            });
    }

    showProducts = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (<ProductItem
                    key={index}
                    product={product}
                    index={index}
                    onDelete={this.onDelete}
                />)
            });
        }
        return result;
    }

    onDelete = (id) => {
        let { products } = this.state;
        callAPI(`products/${id}`, 'DELETE', null)
            .then(res => {
                if (res.status === 200) {
                    let index = this.findIndex(products, id)
                    if (index !== -1) {
                        products.splice(index, 1);
                        this.setState({
                            products: products
                        })
                    }
                }
            });
    }

    findIndex = (products, id) => {
        let result = -1;
        products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        })
        return result;
    }

    render() {
        // let { products } = this.props;
        let { products } = this.state;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to="/product/add" className="btn btn-info mb-10">Thêm sản phẩm</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        )
    }
}
export default (ProductListPage);
