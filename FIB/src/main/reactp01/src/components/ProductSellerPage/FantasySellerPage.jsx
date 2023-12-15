// import './UiBox/SellerPageCommonCSS.css';
// import { useContext, useState, useEffect } from 'react';
// import SideButton from '../SideButton';
// import { book_list_context } from '../Data/ProductOriginData_context';
// import SellerProductCard from './UiBox/SellerProductCard';
// import BasketPreviewBox from './UiBox/BasketPreviewBox';
// import ProductSellerCategoryBar from './UiBox/ProductSellerCategoryBar';


// const FantasySellerPage = () => {
//   //
//   const [scrollY, setScrollY] = useState(0);

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   //

//   const data = useContext(book_list_context);



//   const bestbookList = data.filter((d) => {
//     return d.category === '판타지'
//   });

//   const rankDummy = bestbookList.sort(
//     function (a, b) {
//       return b.salesRate - a.salesRate;
//     });

//   // console.log(rankDummy[0]);

//   const bookList = rankDummy.map((d, i) => (
//     <SellerProductCard
//       rank={i}
//       key={d.id}
//       id={d.id}
//       title={d.title}
//       price={d.price}
//       writer={d.writer}
//       type={d.type}
//       image={d.image}
//       intro_image={d.intro_image}
//       publisher={d.publisher}
//       publishDate={d.publishDate}
//       compiler={d.compiler}
//       from={d.from}
//       category={d.category}
//       salePer={d.salePer}
//       salesRate={d.salesRate}
//       summary={d.summary}
//     // sellCount
//     />
//   ));


//   return (
//     <div className='seller_page_container'>

//       <div className='product_seller_categorybar_container' style={{ transform: `translateY(${scrollY}px)` }}>
//         <ProductSellerCategoryBar />
//       </div>

//       <div className='basket_preview_box_container' style={{ transform: `translateY(${scrollY}px)` }}>
//         <BasketPreviewBox />
//       </div>


//       <div className='seller_product_List_container'>
//         <div className='seller_product_page_titlebox'>
//           <span className='seller_product_page_title'>판타지</span>
//           <span className='seller_product_page_sub_title'>형용할 수 없는 압도감과 몰입감의 세계로.</span>
//         </div>

//         <hr className='seller_product_page_titlebox_hr' />

//         <div className='seller_product_bookList'>
//           {bookList}
//         </div>
//       </div>
//       <SideButton />
//     </div>


//   );
// };

// export default FantasySellerPage;
