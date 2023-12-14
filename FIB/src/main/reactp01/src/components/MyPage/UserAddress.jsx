import { useEffect, useState } from "react";
import InsertAddressPopup from "./InsertAddressPopup";
import './UserAddress.css';
import axios from "axios";
import { MdOutlineRefresh } from "react-icons/md";



function UserAddress() {
    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [addressList, setAddressList] = useState([]);
    const [isSearchAddressPopupOpen, setSearchAddressPopupOpen] = useState(false);

    const [checkedItems, setCheckedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const openSearchAddressPopup = () => {
        setSearchAddressPopupOpen(true);
    };

    const closeSearchAddressPopup = () => {
        setSearchAddressPopupOpen(false);
    };

    const loadAddressList = () => {
        axios({
            url: "/address/selectList",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                user_id: id
            }
        }).then((res) => {
            setAddressList(res.data);
        }).catch((error) => {
            alert('추가 실패' + error.data);
        });
    }

    useEffect(() => {
        loadAddressList();
    }, [id, selectAll, checkedItems])

    // =====================================
    // ** 체크박스 전체 선택
    const handleSelectAllChange = () => {
        setSelectAll((prevSelectAll) => !prevSelectAll);
        if (!selectAll) {
            setCheckedItems(addressList.map((addressData) => addressData.adress_code));
        } else {
            setCheckedItems([]);
        }
    }

    const refresh = () => {
        loadAddressList();
    }

    const handleCheckboxChange = (addressCode) => {
        setCheckedItems((prevItems) => {
            const index = prevItems.indexOf(addressCode);

            if (index === -1) {
                return [...prevItems, addressCode];
            } else {
                const updatedItems = [...prevItems];
                updatedItems.splice(index, 1);

                if (selectAll) {
                    setSelectAll(false);
                }
                return updatedItems;
            }
        });
    }
    console.log(checkedItems);

    // ========================================
    // ** 삭제

    const deleteSelectedAddress = () => {

        axios({
            url: "/address/delete",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: checkedItems
        }).then((res) => {
            alert('삭제 완료');
            refresh();
        }).catch((error) => {
            if (error.response) {
                // 서버가 응답을 반환한 경우
                console.error("Login error - Server responded with data:", error.response.data);
                console.error("Status code:", error.response.status);
                console.error("Headers:", error.response.headers);

            } else if (error.request) {
                // 서버에 요청이 전송되었지만 응답이 없는 경우
                console.error("Login error - No response received:", error.request);

            } else {
                // 요청을 보내기 전에 오류가 발생한 경우
                console.error("Login error - Request setup error:", error.message);
            }
        });
    }

    return (
        <div className="UserAddress">
            <div className="index_text"><h1>배송지 관리</h1></div>
            <div>
                <div className="insert_address_button d-flex">
                    <button onClick={deleteSelectedAddress}>삭제</button>
                    <div className="refresh_container d-flex">
                        <MdOutlineRefresh className="address_refresh" onClick={refresh} />
                        <button onClick={openSearchAddressPopup}>배송지 등록</button>
                    </div>
                </div>
                <InsertAddressPopup
                    isOpen={isSearchAddressPopupOpen}
                    onClose={closeSearchAddressPopup}
                ></InsertAddressPopup>
                <table className="user_address_table">
                    <thead>
                        <tr className="user_address_column user_address_index_column">
                            <th><input type="checkbox" onChange={handleSelectAllChange} checked={selectAll} /></th>
                            <th>주소 명</th>
                            <th>주소</th>
                            <th>연락처</th>
                            <th>수령인</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addressList.map((addressData, index) => (
                            <tr key={index} className="user_address_column">
                                <td>
                                    <input type="hidden" value={addressData.address_code} />
                                    <input type="checkbox"
                                        onChange={() => handleCheckboxChange(addressData.address_code)}
                                        checked={selectAll || checkedItems.includes(addressData.address_code)} />
                                </td>
                                <td className={addressData.basic_address ? "basic_address" : ""}>{addressData.basic_address ? '기본 배송지' : addressData.address_as}</td>
                                <td className="full_address">
                                    <div>{addressData.address_zip}</div>
                                    <div>{addressData.address}</div>
                                    <div>{addressData.address_detail}</div>
                                </td>
                                <td>{addressData.phone_number}</td>
                                <td>{addressData.name}</td>
                                <td>
                                    <button>수정</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserAddress;