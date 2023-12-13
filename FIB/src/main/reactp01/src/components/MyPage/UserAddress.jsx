import { useState } from "react";
import SearchAddressPopup from "./SearchAddressPopup";
import './UserAddress.css';

function UserAddress() {
    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [address_zip, setAddress_zip] = useState(JSON.parse(sessionStorage.user).address_zip);
    const [address, setAddress] = useState(JSON.parse(sessionStorage.user).address);
    const [address_detail, setAddress_detail] = useState(JSON.parse(sessionStorage.user).address_detail);

    const [isSearchAddressPopupOpen, setSearchAddressPopupOpen] = useState(false);

    const openSearchAddressPopup = () => {
        setSearchAddressPopupOpen(true);
    };

    const closeSearchAddressPopup = () => {
        setSearchAddressPopupOpen(false);
    };

    return (
        <div className="UserAddress">
            <div className="index_text"><h1>배송지 관리</h1></div>
            <div>
                <div className="insert_address_button">
                    <button onClick={openSearchAddressPopup}>배송지 등록</button>
                </div>
                <SearchAddressPopup
                    isOpen={isSearchAddressPopupOpen}
                    onClose={closeSearchAddressPopup}
                ></SearchAddressPopup>
                <table className="user_address_table">
                    <fieldset>
                        <tr className="user_address_column user_address_index_column">
                            <th>기본 배송지</th>
                            <th>별칭</th>
                            <th>주소</th>
                            <th>연락처</th>
                            <th>받는 사람</th>
                            <th>관리</th>
                        </tr>
                        <tr className="user_address_column">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button>수정</button>
                                <button>삭제</button>
                            </td>
                        </tr>
                    </fieldset>
                </table>
            </div>
        </div>
    );
}

export default UserAddress;