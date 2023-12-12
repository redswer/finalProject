import './EventPageItem.css'
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { event_item_list_context } from "../../../../Data/ProductOriginData_context";
import axios from 'axios';

function EventPageItem() {
    const event_data = useContext(event_item_list_context);

    const EventItemList = ({ id, title, image, view_image, end_image, date }) => {
        return (
            <ul>
                <li className='event_item_list'>
                    <Link to={`/EventPageItemContent/${id}`}>
                        <div>
                            <img className='event_view_image' src={view_image} alt={title} />
                            <h3 className='event_title'>{title}</h3>
                            <div className='event_date'>{date}</div>
                        </div>
                    </Link>
                </li>
            </ul>
        )
    }

    const [couponList, setCouponList] = useState([]);
    useEffect(() => {
        axios
            .get('/test/couponList')
            .then((response) => {
                setCouponList(response.data);
                console.log(`서버연결 성공 =>`, response.data);
            }).catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    const Coupon = ({ key, couponCode, title, discount_rate, image, start, end, moddate, regdate }) => {
        const [isPopupOpen, setPopupOpen] = useState(false);

        const handleButtonClick = () => {
            console.log('쿠폰코드확인' + couponCode);
            console.log('Opening popup');
            setPopupOpen(true);

            const loginInfo = JSON.parse(sessionStorage.getItem('user'));
            const userId = loginInfo ? loginInfo.id : null;

            const data = {
                coupon_code: couponCode,
                id: userId
            };

            // 쿠폰 받기 성공 시 서버로 요청 보내기
            axios.post('/test/userCouponGet', data, {

            })
                .then(response => {
                    console.log('유저쿠폰 받기 성공!' + response.data);
                })
                .catch(error => {
                    console.error('유저쿠폰 받기 실패:', error);
                });
        };

        const handleClosePopup = () => {
            console.log('Closing popup');
            setPopupOpen(false);
        };
        return (
            <div className='coupon_box'>
                <div>{couponCode}</div>
                <div className='coupon_box_title'>{title}</div>
                <img className='coupon_box_image' src={image} />
                <br />
                <button onClick={handleButtonClick}>받기</button>

                {isPopupOpen && (
                    <div className="popup" onClick={handleClosePopup}>
                        {/* 팝업 컨텐츠 */}
                        <div className="popup_content">
                            <span className="close">쿠폰 받기 성공!</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="event_list_container">
            <div className='event_item'>
                <span className='event_page_title'>이벤트</span>
            </div>
            <hr className='event_page_title_hr' />
            {event_data.map((event, index) => (
                <EventItemList
                    key={index}
                    id={event.id}
                    title={event.title}
                    image={event.image}
                    view_image={event.view_image}
                    end_image={event.end_image}
                    date={event.date}
                />
            ))}
            <div className="App">
                {couponList.map((coupon, index) => (
                    <Coupon
                        key={coupon.coupon_code}
                        couponCode={coupon.coupon_code}
                        title={coupon.title}
                        discount_rate={coupon.discount_rate}
                        image={coupon.image}
                        start={coupon.start}
                        end={coupon.end}
                        moddate={coupon.moddate}
                        regdate={coupon.regdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default EventPageItem;