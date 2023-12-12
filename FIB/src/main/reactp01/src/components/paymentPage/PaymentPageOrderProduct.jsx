import './PaymentPageOrderProduct.css';
import { ReactComponent as Icon } from './order_name_icon.svg';
import PaymentPageOrderProductAdd from './PaymentPageOrderProductAdd/PaymentPageOrderProductAdd';

function PaymentPageOrderProduct({ location_state }) {

    return (
        <div className="PaymentPageOrderProduct">
            <div className="order_name_box">
                <Icon className="order_name_icon" />
                <span className="order_name_design">주문 상품</span>
            </div>

            <div className="order_list_box">

                <table className="order_list_tb">

                    <colgroup>
                        <col className="order_list_cg_01" />
                        <col className="order_list_cg_02" />
                        <col className="order_list_cg_03" />
                        <col className="order_list_cg_04" />
                        <col className="order_list_cg_05" />
                    </colgroup>

                    <thead>
                        <tr>
                            <th colSpan="2">상품명</th>
                            <th>판매가</th>
                            <th>수량</th>
                            <th>합계</th>
                        </tr>
                    </thead>

                    <tbody>
                        <PaymentPageOrderProductAdd location_state={location_state} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentPageOrderProduct;