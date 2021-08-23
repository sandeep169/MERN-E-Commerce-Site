export default function Rating(props) {
    // const {rating,numReviews}=props;
    const {rating}=props;

    return (<>
   
        <div  className="rating">
           <span> <i className={rating >=1
            ? "fa fa-star"
            : rating>=0.5
            ?"fa fa-star-half-o"  //{/* again one more condition inside turnery operator : if true den =>half star */}
            :"fa fa-star-o"}  //{/*empty star */}
            ></i> </span>  
            <span> <i className={rating >=2
            ? "fa fa-star"
            : rating>=1.5
            ?"fa fa-star-half-o"  //{/* again one more condition inside turnery operator : if true den =>half star */}
            :"fa fa-star-o"}  //{/*empty star */}
            ></i> 
            </span>

            <span> <i className={rating >=3
            ? "fa fa-star"
            : rating>=2.5
            ?"fa fa-star-half-o"  //{/* again one more condition inside turnery operator : if true den =>half star */}
            :"fa fa-star-o"}  //{/*empty star */}
            ></i> </span> 
            
            <span> <i className={rating >=4
            ? "fa fa-star"
            : rating>=3.5
            ?"fa fa-star-half-o"  //{/* again one more condition inside turnery operator : if true den =>half star */}
            :"fa fa-star-o"}  //{/*empty star */}
            ></i> </span> 
              
            <span> <i className={rating >=5
            ? "fa fa-star"
            : rating>=4.5
            ?"fa fa-star-half-o"  //{/* again one more condition inside turnery operator : if true den =>half star */}
            :"fa fa-star-o"}  //{/*empty star */}
            ></i> </span> 
            {/* <span>{numReviews+' Review' }</span> */}
        </div>
       
        </>
    )
}