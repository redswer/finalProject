import { Link } from "react-router-dom";


function HeaderCategory() {


    return (
        <div className="header_category">
            <nav>
                <div className="header_maincategory">
                    <ul className="header_maincategory_list">
                        <li className="header_maincategory_menu_category">
                            <Link to="/ProductListPage?domestic=1&category=0&genre=0">국내도서</Link>
                        </li>
                        <li className="header_maincategory_menu_category">
                            <Link to='/ProductListPage?domestic=2&category=0&genre=0'>해외도서</Link>
                        </li>
                        <li className="header_maincategory_menu_category">
                            <Link to='/BestSellerPage'>베스트 셀러</Link>
                        </li>
                        <li className="header_maincategory_menu_category">
                            <Link to='/ItemPage'>도서용품</Link>
                        </li>
                        <li className="header_maincategory_menu_category">
                            <Link to='/EventPage'>이벤트·쿠폰</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default HeaderCategory;