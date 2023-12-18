import './UpdateAddressPopup.css';

function UpdateAddressPopup({ isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="UpdataAddressPopup">
            <div className='update_address_popup_content'>
                <div>
                    <span>주소명</span>
                    <input type="text" />
                </div>
                <div>
                    <span>주소</span>
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>
                <div>
                    <span>연락처</span>
                    <input type="text" />
                </div>
                <div>
                    <span>수령인</span>
                    <input type="text" />
                </div>
            </div>
        </div>
    );
}

export default UpdateAddressPopup;