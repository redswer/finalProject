import './JoinMembershipServer.css';
import { Link } from 'react-router-dom';

function JoinMembershipServer() {

    return (
        <div className='JoinMembershipServer d-flex'>
            <div>
                <h1>회원가입 완료</h1>
            </div>

            <div>
                <img src="./img/fox_logo.png" alt="#" />
            </div>

            <button>
                <Link to="/LogIn">
                    <h2>
                        로그인 페이지로 돌아가기
                    </h2>
                </Link>
            </button>
        </div>
    );
}

export default JoinMembershipServer;