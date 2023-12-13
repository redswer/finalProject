import * as React from 'react-daum-postcode';
import DaumPostcode from 'react-daum-postcode';
import './SearchAddressPopup.css';
import { useState } from 'react';

function SearchAddressPopup({ isOpen, onClose }) {
    const [address_zip, setAddress_zip] = useState('');
    const [address, setAddress] = useState('');
    const [address_detail, setAddress_detail] = useState('');

    const [insertAddressButton, setInsertAddressButton] = useState(true);

    const handleComplete = (data) => {
        let selectedAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

        if (data.userSelectedType === 'R') {
            let detailAddr = '';

            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                detailAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                detailAddr += detailAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            if (detailAddr !== '') {
                detailAddr = ` (${detailAddr})`;
            }

            setAddress_detail(detailAddr);
        } else {
            setAddress_detail('');
        }

        setAddress_zip(data.zonecode);
        setAddress(selectedAddress);
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = selectedAddress;
    };

    function changeButton() {
        address_zip
            ? setInsertAddressButton(false) : setInsertAddressButton(true);
    }

    const insertAddress = () => {
        axios({
            uri: '',
            method: '',
            headers: '',
            data: {

            }
        }).then(

        )
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='SearchAddressPopup'>
            <div className='search_address_popup_content'>
                <div className='DaumPostcode'>
                    <DaumPostcode onComplete={handleComplete}></DaumPostcode>
                </div>
                <div>
                    <input
                        type="text"
                        id="sample6_postcode"
                        name='address_zip'
                        placeholder="우편번호"
                        value={address_zip}
                        onKeyUp={changeButton}
                        onChange={(e) => onAddress_zip(e.target.value)}
                        readOnly
                    />
                    <br />
                    <input
                        type="text"
                        id="sample6_address"
                        name='address'
                        placeholder="주소"
                        value={address}
                        onKeyUp={changeButton}
                        onChange={(e) => onAddress(e.target.value)}
                        readOnly
                    />
                    <br />
                    <input
                        type="text"
                        id="sample6_detailAddress"
                        name='address_detail'
                        placeholder="상세주소"
                        autoComplete='off'
                        value={address_detail}
                        onKeyUp={changeButton}
                        onChange={(e) => {
                            setAddress_detail(e.target.value);
                            onAddress_detail(e.target.value);
                        }}
                    />
                </div>
                <div className='search_address_btn_container'>
                    <button type="button" className='insertAddress_btn'
                        onClick={insertAddress}
                        disabled={insertAddressButton}>
                        확인
                    </button>
                    <button type="button" onClick={onClose} className='SearchAddress_btn'>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchAddressPopup;