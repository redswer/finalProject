import './UiBox/SellerPageCommonCSS.css';
import { useContext, useState, useEffect } from 'react';
import SideButton from '../SideButton';
import { book_list_context } from '../Data/ProductOriginData_context';
import SellerProductCard from './UiBox/SellerProductCard';
import BasketPreviewBox from './UiBox/BasketPreviewBox';
import ProductSellerCategoryBar from './UiBox/ProductSellerCategoryBar';


const ForeignSellerPage = () => {
  //
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //

  const data = useContext(book_list_context);



  const bestbookList = data.filter((d) => {
    return d.from === '해외'
  });

  const rankDummy = bestbookList.sort(
    function (a, b) {
      return b.salesRate - a.salesRate;
    });

  // console.log(rankDummy[0]);

  const bookList = rankDummy.map((d, i) => (
    <SellerProductCard
      rank={i}
      key={d.id}
      id={d.id}
      title={d.title}
      price={d.price}
      writer={d.writer}
      type={d.type}
      image={d.image}
      intro_image={d.intro_image}
      publisher={d.publisher}
      publishDate={d.publishDate}
      compiler={d.compiler}
      from={d.from}
      category={d.category}
      salePer={d.salePer}
      salesRate={d.salesRate}
      summary={d.summary}
    // sellCount
    />
  ));


  return (
    <div className='seller_page_container'>

      <div className='product_seller_categorybar_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <ProductSellerCategoryBar />
      </div>

      <div className='basket_preview_box_container' style={{ transform: `translateY(${scrollY}px)` }}>
        <BasketPreviewBox />
      </div>


      <div className='seller_product_List_container'>
        <div className='seller_product_page_titlebox'>
          <span className='seller_product_page_title'>해외 도서</span>
          <span className='seller_product_page_sub_title'>해외에서 출판된 도서 순위입니다.</span>
        </div>

        <hr className='seller_product_page_titlebox_hr' />

        <div className='seller_product_bookList'>
          {bookList}
        </div>
      </div>
      <SideButton />
    </div>


  );
};

export default ForeignSellerPage;
