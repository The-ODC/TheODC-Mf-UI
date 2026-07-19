import ProductCard from "./index";

const product = {
  name: "Grilled Veggie Pizza",
  description: "Crispy pizza base topped with grilled vegetables and cheese.",
  price: 12.5,
  discountPrice: 9.99,
  stock: 8,
  category: "Pizza",
  folderLocation: "products",
  images: ["pizza.jpg"],
};

export default {
  title: "SharedComponents/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  product,
  assetsBaseUrl: "https://example.com/assets",
  detailTo: "/product/1",
  onAdd: () => alert("Added to cart"),
};

export const OutOfStock = Template.bind({});
OutOfStock.args = {
  product: { ...product, stock: 0 },
  assetsBaseUrl: "https://example.com/assets",
  detailTo: null,
  onAdd: () => {},
  addLabel: "Sold out",
  showStock: true,
};
