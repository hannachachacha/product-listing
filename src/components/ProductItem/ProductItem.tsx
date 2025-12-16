import './product-card.css';
import type { Product } from '../../features/products/productsSlice';

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductItem({ product, onClick }: Props) {
  return (
    <div
      className="card product-card"
      onClick={() => onClick(product)}
    >
      <div className="card-image">
        <figure className="image product-image">
          <img src={product.image} alt={product.title} />
        </figure>
      </div>

      <div className="card-content product-content">
        <p className="product-title">{product.title}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
}

