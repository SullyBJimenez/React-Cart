// Ex 2 - remove any item from navbar with less than minStock in stock
// write out both the name and the number in stock in format apple:2
function NavBar({ menuitems, minstock }) {
  const { Card, Button } = ReactBootstrap;
  const [stock, setStock] = React.useState(menuitems);
  const [cart, setCart] = React.useState([]);

  const moveToCart = (e) => {
    let [name, num] = e.target.innerHTML.split(":");
    if (num <= 0) return; //zero items in stock
    let item = stock.filter((item) => item.name == name);
    let newStock = stock.map((item) => {
      if (item.name == name) {
        item.instock--;
      }
      return item;
    });

    setStock([...newStock]);
    setCart([...cart, ...item]);
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };

  let list1 = menuitems.filter(item => item.instock >= minstock);
  let list2 = list1.map((item, index) => {
    return (<Button key={index.toString()} onClick={moveToCart}>
      {item.name}:{item.instock}
      </Button>
    );
  });

  // note that React needs to have a single Parent
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {list2}
      </ul>;
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

function Cart({ cartitems }) {
  const { Card, Button } = ReactBootstrap;
  console.log("rendering Cart");
  const updatedList = cartitems.map((item, index) => {
    return <Button key={index}>{item.name}</Button>;
  });
  return (
    <ul style={{ listStyleType: "none" }} key="cart">
      {updatedList}
    </ul>
  );
}

const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear", instock: 0 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 }
];

ReactDOM.render(
  <NavBar menuitems={menuItems} minstock={2} />,
  document.getElementById("root")
);
