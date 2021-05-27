export default function CartScreen(props) {
    const productId =props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        :1;
    return(
        <>
        <div>
            <h1>cart screen</h1>
            <p> ADD to cart : productId : {productId} Qty : {qty}</p>
        </div>
        </>
    );
}