import React, { Component } from 'react';
import callAPI from './../../utils/apiCaller';
import { Link, Redirect } from 'react-router-dom';

class ProductActionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: false
        }
    }

    componentDidMount() {
        let { match } = this.props;
        if (match) {
            let id = match.params.id;
            callAPI(`products/${id}`, 'GET', null)
                .then(response => {
                    let data = response.data;
                    this.setState({
                        id: data.id,
                        txtName: data.name,
                        txtPrice: data.price,
                        chkbStatus: data.status
                    })
                })
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        e.preventDefault();
        let { id, txtName, txtPrice, chkbStatus } = this.state;
        let { history } = this.props;
        if (id) { // update
            // http://localhost:300/products/id => HTTP : PUT
            callAPI(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {
                alert('Cập nhập thành công !')
                if (alert) {
                    history.goBack();
                }
            })
                .catch((err)=> {
                    console.log(err);
                })
        } else {
            callAPI('products', 'POST', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {
                alert('Thêm thành công !')
                if (alert) {
                    history.goBack();
                }
            });
        }
    }

    render() {
        let { txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên sản phẩm: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá sản phẩm: </label>
                        <input
                            type="number" className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value=""
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                                Còn hàng
                        </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Trở lại
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Lưu lại</button>
                </form>
            </div>
        )
    }
}

export default ProductActionPage;
