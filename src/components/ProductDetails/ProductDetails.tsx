import './product-details.css';
import type { Product } from '../../features/products/productsSlice';
import { useEffect } from 'react';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({ product, onClose }: Props) {
  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{product.title}</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>

        <section className="modal-card-body">
          <figure className="image product-details-image">
            <img src={product.image} alt={product.title} />
          </figure>

          <p className="mb-3">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="mb-4">{product.description}</p>

          <p className="title is-4">${product.price}</p>

        </section>

        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
