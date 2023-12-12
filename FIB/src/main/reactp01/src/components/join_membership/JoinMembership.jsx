import './JoinMembership.css';
import SearchAddress from '../SearchAddress';
import SideButton from '../SideButton';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios';

function JoinMembership() {
    const navigate = useNavigate();

    const [emailName, setEmailName] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);
    const [phone_numberValid, setPhone_numberValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);

    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const nameRegex = /^[가-힣a-zA-Z]*$/;
    const phoneNumberRegex = /^010\d{7,8}$/;

    const handleEmailDomainChange = (event) => {
        const selectedDomain = event.target.value;
        setEmailDomain(selectedDomain);

        // "직접입력"이 아닌 경우에만 값을 설정
        if (selectedDomain === '직접입력') {
            setEmailDomain('');
        } else {
            setEmailDomain(selectedDomain);
        }
    };

    const validateEmail = () => {
        if (!emailDomain.includes('.') || emailName === '') {
            setEmailError('유효한 이메일 형식이 아닙니다.');
            setEmailValid(false);
        } else {
            setEmailError('');
            setEmailValid(true);
        }
    }
    const validatePassword = () => {
        if (password.length < 7 || password.length > 15) {
            setPasswordError('비밀번호는 7자 이상, 15자 이하여야 합니다.');
            setPasswordValid(false);
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호에는 특수문자가 하나 이상 포함되어야 합니다.');
            setPasswordValid(false);
        } else {
            setPasswordError('');
            setPasswordValid(true);
        }
    }
    const validatePasswordCheck = () => {
        if (password !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
            setPasswordCheckValid(false);
        } else {
            setPasswordCheckError('');
            setPasswordCheckValid(true);
        }
    }
    const validateName = () => {
        if (name.length < 2 || !nameRegex.test(name)) {
            setNameError('유효한 이름이 아닙니다.');
            setNameValid(false);
        } else {
            setNameError('');
            setNameValid(true);
        }
    }
    const validatePhone_number = () => {
        if (!phoneNumberRegex.test(phone_number)) {
            setPhone_numberError('유효한 전화번호 형식이 아닙니다.');
            setPhone_numberValid(false);
        } else {
            setPhone_numberError('');
            setPhone_numberValid(true);
        }
    }

    // ===========================================
    // ** 주소 입력 여부

    const [hideAddressSearch, setHideAddressSearch] = useState(false);
    const [hideAfterAddressInput, setHideAfterAddressInput] = useState(false);

    const handleAfterAddressInputCheckbox = () => {
        setHideAfterAddressInput(!hideAfterAddressInput);

        // 주소 다음에 입력 체크박스 체크 시, 주소 검색 창도 숨겨지도록 함
        if (!hideAfterAddressInput) {
            setHideAddressSearch(true);
        }
    }

    // ============================================
    // ** 체크박스 선택

    const checkboxData = [
        { id: 'join_membership_agree_use', title: '이용약관', link: '/Use' },
        { id: 'join_membership_agree_community', title: '커뮤니티 이용약관', link: '/Community' },
        { id: 'join_membership_agree_privacy', title: '개인정보 수집 및 이용', link: '/Privacy' },
        { id: 'email', title: '이메일', link: '/Mail' },
        { id: 'sms', title: '문자/카카오톡', link: '/TextMessage' }
    ]

    // 필수 약관 동의
    const requiredCheckboxes = [
        'join_membership_agree_use',
        'join_membership_agree_community',
        'join_membership_agree_privacy'
    ];

    const [checkbox, setCheckbox] = useState([]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {

        // 필수 선택 해제 시 경고 창
        if (requiredCheckboxes.includes(id)) {
            if (!checked) {
                alert('필수 약관에 동의해주세요');
            }
        }

        // 단일 선택 시 체크된 아이템 배열에 추가
        if (checked) {
            setCheckbox(prev => [...prev, id]);

            // 단일 선택 해제 시 체크된 아이템 제외한 배열
        } else {
            setCheckbox(checkbox.filter((el) => el !== id));
        }

        changeButton();
    }

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {

        // 전체 선택 시
        if (checked) {
            const idArray = [];
            checkboxData.forEach((el) => { idArray.push(el.id) });
            setCheckbox(idArray);

            // 전체 선택 해제 시
        } else {
            setCheckbox([]);
        }
    }

    // ==========================================================
    // ** 회원가입 버튼 활성화

    const [joinMembershipButton, setJoinMembershipButton] = useState(true);

    function changeButton() {
        emailDomain.includes('.') && passwordRegex.test(password) && password.length >= 7 &&
            password.length <= 15 && name.length >= 2 && emailName != '' &&
            nameRegex.test(name) && password === passwordCheck &&
            phone_number.length >= 10 && phone_number.length <= 11 &&
            checkbox.includes('join_membership_agree_use') &&
            checkbox.includes('join_membership_agree_community') &&
            checkbox.includes('join_membership_agree_privacy')
            ? setJoinMembershipButton(false) : setJoinMembershipButton(true);
    }

    useEffect(() => {
        changeButton();
    }, [checkbox]);

    // =============================================================
    // ** 엔터 키 누름
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'email_name') {
                document.getElementById('domain_select').focus();
            } else if (e.target.id === 'domain_select') {
                document.getElementById('email_domain').focus();
            } else if (e.target.id === 'email_domain') {
                document.getElementById('join_membership_pw').focus();
            } else if (e.target.id === 'join_membership_pw') {
                document.getElementById('join_membership_pw_check').focus();
            } else if (e.target.id === 'join_membership_pw_check') {
                document.getElementById('phone_number').focus();
            } else if (e.target.id === 'phone_number') {
                document.getElementById('join_membership_name').focus();
            }
        }
    }

    // =============================================================
    // ** 데이터 전송
    const id = `${emailName}@${emailDomain}`;
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();

    const [address_zip, setAddress_zip] = useState('');
    const [address, setAddress] = useState('');
    const [address_detail, setAddress_detail] = useState('');

    const onAddressZip = (zip) => {
        setAddress_zip(zip);
    }

    const onAddress = (addr) => {
        setAddress(addr);
    }

    const onAddressDetail = (detail) => {
        setAddress_detail(detail);
    }

    function submitButton() {
        const selectedYear = yearRef.current.value;
        const selectedMonth = monthRef.current.value;
        const selectedDay = dayRef.current.value;

        axios({
            url: "/user/join",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                password: password,
                phone_number: phone_number,
                name: name,
                address_zip: address_zip,
                address: address,
                address_detail: address_detail,
                birthday: `${selectedYear}${selectedMonth}${selectedDay}`,
                ad_check_email: checkbox.includes('email'),
                ad_check_sms: checkbox.includes('sms')
            }
        }).then((res) => {
            alert(res.data);

            navigate("/LogIn");
        }).catch((error) => {
            // if (error.response) {
            //     // 서버가 응답을 반환한 경우
            //     console.error("Login error - Server responded with data:", error.response.data);
            //     console.error("Status code:", error.response.status);
            //     console.error("Headers:", error.response.headers);

            // } else if (error.request) {
            //     // 서버에 요청이 전송되었지만 응답이 없는 경우
            //     console.error("Login error - No response received:", error.request);

            // } else {
            //     // 요청을 보내기 전에 오류가 발생한 경우
            //     console.error("Login error - Request setup error:", error.message);

            // }
            alert(error.response.data);
            // window.location.reload();
        });
    }

    return (
        <div className='JoinMembership d-flex'>
            <div className='join_membership_main_text d-flex'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        className="bi bi-person-fill-add" viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path
                            d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                </div>
                <div>
                    <h1>회원가입</h1>
                </div>
            </div>
            <form className='join_membership_form'>
                <fieldset className='join_membership_fieldset'>
                    <div className='d-flex'>
                        <div className='join_membership_section_1'>기본 정보 입력
                            <div className='join_membership_section_1_info'>(필수)</div>
                        </div>
                        <div className='join_membership_section_2 d-flex'>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {emailValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;이메일(아이디)
                                </span>
                                <span>
                                    <label htmlFor="id"></label>
                                    <input id='email_name' name='email_name' value={emailName}
                                        autoComplete='off' type="text" required
                                        onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setEmailName(e.target.value);
                                            setEmailError('');
                                        }}
                                        onBlur={validateEmail} /> @ &nbsp;
                                    <input id='email_domain' type="text" value={emailDomain}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setEmailDomain(e.target.value);
                                            setEmailError('');
                                        }}
                                        onBlur={validateEmail} /> &nbsp;
                                    <select onChange={handleEmailDomainChange} onKeyDown={handleEnterKey} onBlur={validateEmail} id='domain_select'>
                                        <option>직접입력</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="hanmail.com">hanmail.com</option>
                                        <option value="yahoo.co.kr">yahoo.co.kr</option>
                                    </select>
                                    {emailError && <div className="join_error-message">{emailError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {passwordValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;비밀번호
                                </span>
                                <span>
                                    <input id='join_membership_pw' name='password' type="password"
                                        placeholder='특수문자 포함, 7자리 이상' minLength={7} autoComplete='off' required
                                        value={password} autoCapitalize='off' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError('');
                                            setPasswordCheckValid(false);
                                        }}
                                        onBlur={validatePassword} />
                                    {passwordError && <div className="join_error-message">{passwordError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {passwordCheckValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;비밀번호 확인
                                </span>
                                <span>
                                    <input id='join_membership_pw_check' name='password_check'
                                        type="password" minLength={7} autoComplete='off' required
                                        value={passwordCheck} autoCapitalize='off' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPasswordCheck(e.target.value);
                                            setPasswordCheckError('');
                                            setPasswordCheckValid(false);
                                        }}
                                        onBlur={validatePasswordCheck}
                                    />
                                    {passwordCheckError && <div className="join_error-message">{passwordCheckError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {phone_numberValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;휴대전화
                                </span>
                                <span>
                                    <input type="text" required className='phone_number' id='phone_number'
                                        value={phone_number} placeholder='010으로 시작하는 숫자만' onKeyUp={changeButton}
                                        onKeyDown={handleEnterKey}
                                        onChange={(e) => {
                                            setPhone_number(e.target.value);
                                            setPhone_numberError('');
                                        }}
                                        onBlur={validatePhone_number} />
                                </span>
                                {phone_numberError && <div className="join_error-message">{phone_numberError}</div>}
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>
                                    {nameValid && <span className='check_circle'><FaCheckCircle /></span>}&nbsp;이름
                                </span>
                                <span>
                                    <input id='join_membership_name' name='name'
                                        type="text" autoComplete='off' maxLength={100} required
                                        value={name} placeholder='2자 이상의 한글 또는 영어'
                                        onKeyUp={changeButton}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setNameError('');
                                        }}
                                        onBlur={validateName} />
                                    {nameError && <div className="join_error-message">{nameError}</div>}
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>성별</span>
                                <span className='join_membership_radio'>
                                    <input id='male' name='sex' type="radio" required />
                                    <label htmlFor="male">남자</label>
                                    <input id='female' name='sex' type="radio" />
                                    <label htmlFor="female">여자</label>
                                </span>
                            </div>
                            <div>
                                <span className='join_membership_basic_span'>생년월일</span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="year_birth"></label>
                                    <select ref={yearRef} id="year_birth">
                                        <option defaultValue="2023">2023</option>
                                        <option defaultValue="2022">2022</option>
                                        <option defaultValue="2021">2021</option>
                                        <option defaultValue="2020">2020</option>
                                        <option defaultValue="2019">2019</option>
                                        <option defaultValue="2018">2018</option>
                                        <option defaultValue="2017">2017</option>
                                        <option defaultValue="2016">2016</option>
                                        <option defaultValue="2015">2015</option>
                                        <option defaultValue="2014">2014</option>
                                        <option defaultValue="2013">2013</option>
                                        <option defaultValue="2012">2012</option>
                                        <option defaultValue="2011">2011</option>
                                        <option defaultValue="2010">2010</option>
                                        <option defaultValue="2009">2009</option>
                                        <option defaultValue="2008">2008</option>
                                        <option defaultValue="2007">2007</option>
                                        <option defaultValue="2006">2006</option>
                                        <option defaultValue="2005">2005</option>
                                        <option defaultValue="2004">2004</option>
                                        <option defaultValue="2003">2003</option>
                                        <option defaultValue="2002">2002</option>
                                        <option defaultValue="2001">2001</option>
                                        <option defaultValue="2000">2000</option>
                                        <option defaultValue="1999">1999</option>
                                        <option defaultValue="1998">1998</option>
                                        <option defaultValue="1997">1997</option>
                                        <option defaultValue="1996">1996</option>
                                        <option defaultValue="1995">1995</option>
                                        <option defaultValue="1994">1994</option>
                                        <option defaultValue="1993">1993</option>
                                        <option defaultValue="1992">1992</option>
                                        <option defaultValue="1991">1991</option>
                                        <option defaultValue="1990">1990</option>
                                        <option defaultValue="1989">1989</option>
                                        <option defaultValue="1988">1988</option>
                                        <option defaultValue="1987">1987</option>
                                        <option defaultValue="1986">1986</option>
                                        <option defaultValue="1985">1985</option>
                                        <option defaultValue="1984">1984</option>
                                        <option defaultValue="1983">1983</option>
                                        <option defaultValue="1982">1982</option>
                                        <option defaultValue="1981">1981</option>
                                        <option defaultValue="1980">1980</option>
                                        <option defaultValue="1979">1979</option>
                                        <option defaultValue="1978">1978</option>
                                        <option defaultValue="1977">1977</option>
                                        <option defaultValue="1976">1976</option>
                                        <option defaultValue="1975">1975</option>
                                        <option defaultValue="1974">1974</option>
                                        <option defaultValue="1973">1973</option>
                                        <option defaultValue="1972">1972</option>
                                        <option defaultValue="1971">1971</option>
                                        <option defaultValue="1970">1970</option>
                                        <option defaultValue="1969">1969</option>
                                        <option defaultValue="1968">1968</option>
                                        <option defaultValue="1967">1967</option>
                                        <option defaultValue="1966">1966</option>
                                        <option defaultValue="1965">1965</option>
                                        <option defaultValue="1964">1964</option>
                                        <option defaultValue="1963">1963</option>
                                        <option defaultValue="1962">1962</option>
                                        <option defaultValue="1961">1961</option>
                                        <option defaultValue="1960">1960</option>
                                        <option defaultValue="1959">1959</option>
                                        <option defaultValue="1958">1958</option>
                                        <option defaultValue="1957">1957</option>
                                        <option defaultValue="1956">1956</option>
                                        <option defaultValue="1955">1955</option>
                                        <option defaultValue="1954">1954</option>
                                        <option defaultValue="1953">1953</option>
                                        <option defaultValue="1952">1952</option>
                                        <option defaultValue="1951">1951</option>
                                        <option defaultValue="1950">1950</option>
                                    </select> 년
                                </span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="month_birth"></label>
                                    <select ref={monthRef} id="month_birth" required>
                                        <option defaultValue="01">01</option>
                                        <option defaultValue="02">02</option>
                                        <option defaultValue="03">03</option>
                                        <option defaultValue="04">04</option>
                                        <option defaultValue="05">05</option>
                                        <option defaultValue="06">06</option>
                                        <option defaultValue="07">07</option>
                                        <option defaultValue="08">08</option>
                                        <option defaultValue="09">09</option>
                                        <option defaultValue="10">10</option>
                                        <option defaultValue="11">11</option>
                                        <option defaultValue="12">12</option>
                                    </select> 월
                                </span>
                                <span className='join_membership_birth'>
                                    <label htmlFor="day_birth"></label>
                                    <select ref={dayRef} id="day_birth" required>
                                        <option defaultValue="01">01</option>
                                        <option defaultValue="02">02</option>
                                        <option defaultValue="03">03</option>
                                        <option defaultValue="04">04</option>
                                        <option defaultValue="05">05</option>
                                        <option defaultValue="06">06</option>
                                        <option defaultValue="07">07</option>
                                        <option defaultValue="08">08</option>
                                        <option defaultValue="09">09</option>
                                        <option defaultValue="10">10</option>
                                        <option defaultValue="11">11</option>
                                        <option defaultValue="12">12</option>
                                        <option defaultValue="13">13</option>
                                        <option defaultValue="14">14</option>
                                        <option defaultValue="15">15</option>
                                        <option defaultValue="16">16</option>
                                        <option defaultValue="17">17</option>
                                        <option defaultValue="18">18</option>
                                        <option defaultValue="19">19</option>
                                        <option defaultValue="20">20</option>
                                        <option defaultValue="21">21</option>
                                        <option defaultValue="22">22</option>
                                        <option defaultValue="23">23</option>
                                        <option defaultValue="24">24</option>
                                        <option defaultValue="25">25</option>
                                        <option defaultValue="26">26</option>
                                        <option defaultValue="27">27</option>
                                        <option defaultValue="28">28</option>
                                        <option defaultValue="29">29</option>
                                        <option defaultValue="30">30</option>
                                        <option defaultValue="31">31</option>
                                    </select> 일
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='d-flex'>
                        <div className='join_membership_section_1'>부가 정보 입력
                        </div>
                        <div>
                            <div className='join_membership_section_2 d-flex'>
                                <span className='join_membership_checkbox d-flex'>
                                    <input id='join_membership_address_checkbox' name='join_membership_address_checkbox'
                                        type="checkbox" checked={hideAfterAddressInput}
                                        onChange={handleAfterAddressInputCheckbox} />
                                    <label htmlFor="join_membership_address_checkbox">
                                        주소는 다음에 입력합니다. 단, 주소가 없으면 경품 이벤트 추첨에서 제외될 수 있습니다.</label>
                                </span>
                            </div>
                            {!hideAfterAddressInput &&
                                (<SearchAddress onAddress_zip={onAddressZip} onAddress={onAddress} onAddress_detail={onAddressDetail} className={hideAddressSearch ? 'hidden' : ''} />)}
                        </div>
                    </div>
                    <hr />

                    <div className='d-flex'>
                        <div className='join_membership_section_1'>약관 동의
                            <div className='join_membership_section_1_info'>(*는 필수)</div>
                        </div>
                        <div className='join_membership_section_2'>
                            <div className='join_membership_check_all d-flex'>
                                <input id='join_membership_agree_all' name='join_membership_agree_all'
                                    type="checkbox" onChange={(e) => { handleAllCheck(e.target.checked) }}
                                    checked={checkbox.length === checkboxData.length ? true : false} />
                                <label htmlFor="join_membership_agree_all">모든 약관에 동의합니다</label>
                            </div>
                            <div>
                                {checkboxData.map((checkboxData, key) => (
                                    <div key={key} className='join_membership_agree_checkbox d-flex'>
                                        <span>
                                            <input type='checkbox'
                                                name={`ad_check_${checkboxData.id}`}
                                                id={checkboxData.id}
                                                onChange={(e) => { handleSingleCheck(e.target.checked, checkboxData.id); }}
                                                checked={checkbox.includes(checkboxData.id) ? true : false}
                                                {...(requiredCheckboxes.includes(checkboxData.id) && { required: true })} />
                                        </span>
                                        <label htmlFor={checkboxData.id}>{checkboxData.title}
                                            {requiredCheckboxes.includes(checkboxData.id) && <span className="required-indicator">&nbsp;*</span>}
                                        </label>
                                        <Link to={checkboxData.link}
                                            className='join_membership_termsOfService_detail'>자세히 보기
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className='join_membership_hr' />

                    <div className='join_membership_btn_div'>
                        <button className='join_membership_submit_btn' type='button' onClick={submitButton}
                            disabled={joinMembershipButton}>회원 가입하기
                        </button>
                    </div>
                </fieldset>
            </form>
            <SideButton />
        </div >
    );
}
export default JoinMembership;