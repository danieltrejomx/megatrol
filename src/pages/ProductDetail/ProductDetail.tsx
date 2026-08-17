 <div className="payment-item">🏪 Pago en OXXO Pay</div>
            <div className="payment-item">📦 Envío nacional 3-5 días hábiles</div>
            <div className="payment-item">🚚 Envío Gratis en pedidos desde $599</div>
          </div>
        </div>
      </div>
      {/* Extended Indications & How to Use Section */}
      <div className="how-to-use-section">
        <div className="container technical-details-grid">
          {product.indications && (
            <div className="tech-detail-card">
              <h2>📋 Indicaciones Terapéuticas</h2>
              <p>{product.indications}</p>
            </div>
          )}
          <div className="tech-detail-card">
            <h2>🧪 Modo de Uso y Dosificación</h2>
            <p>{product.howToUse}</p>
          </div>
          {product.formula && (
            <div className="tech-detail-card full-width">
              <h2>🌿 Composición y Fórmula Completa</h2>
              <p>{product.formula}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
            <h2>🧪 Modo de Uso y Dosificación</h2>
            <p>{product.howToUse}</p>
          </div>
          {product.formula && (
            <div className="tech-detail-card full-width">
              <h2>🌿 Composición y Fórmula Completa</h2>
              <p>{product.formula}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
