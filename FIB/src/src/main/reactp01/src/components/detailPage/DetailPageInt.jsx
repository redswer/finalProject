import './DetailPageInt.css';

function DetailPageInt({ oneProductWriterJoin }) {

    const { intro_image, content, writer, introduction } = oneProductWriterJoin;

    /*
        - const contentSplit = content.split(',');
            → 에러 : Cannot read properties of undefined (reading 'split')
            → 아래 코드로 변경
    */
    // const contentSplit = (content || '').split(',');

    // window.addEventListener("load", function () {
    //     let result = '';

    //     for (let i = 0; i < contentSplit.length; i++) {
    //         if (contentSplit[i] != null) {
    //             result += contentSplit[i];
    //             console.log(contentSplit[i]);
    //         }
    //     }
    //     document.getElementById('int_contents_R').innerText = result;
    // });

    return (
        <div className="int">
            <div className="int_int d-flex">
                <div className="int_int_L">상품소개</div>
                <div className="int_int_R">
                    <img src={`../img/${intro_image}`} />
                </div>
            </div>

            <hr className='DetailPage_line' />

            <div className="int_contents" style={{ display: content ? 'flex' : 'none' }}>
                <div className="int_contents_L">목차</div>
                <div className="int_contents_R" id="int_contents_R">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default DetailPageInt;