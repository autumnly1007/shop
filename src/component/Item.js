function Item(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.idx + 1}.jpg`} width="80%" />
      <h4>{props.item.title}</h4>
      <p>{props.item.price}</p>
    </div>
  );
}

export default Item;
