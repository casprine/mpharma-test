import './App.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { seed, addItem } from './action/products';
import axios from 'axios';
import { FormControl, InputLabel, Input, Card, Box, Button } from '@material-ui/core';
import { formatMoney } from './utils/format';

const Form = ({ type, form, onChange, action }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <FormControl style={{ marginBottom: 15 }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          value={form.name}
          name="name"
          onChange={onChange}
          id="name"
          aria-describedby="product-name"
        />
      </FormControl>

      <FormControl style={{ marginBottom: 15 }}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          value={form.price}
          onChange={onChange}
          name="price"
          id="price"
          type="number"
          aria-describedby="product-price"
        />
      </FormControl>

      <Button onClick={action} color="primary" variant="contained" style={{ marginTop: 10 }}>
        {type === 'create' ? 'Add Product' : 'Edit Product'}
      </Button>
    </Box>
  );
};

const Product = ({ prices, name, id, onEdit }) => {
  return (
    <Card className="product">
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <p>{name}</p>

          <Box>
            <Button>Edit</Button>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Box>
        </Box>

        {prices.map((price) => {
          return (
            <Box key={price.id} display="flex" alignItems="center" justifyContent="space-between">
              <p> GHS {formatMoney(price.price)}</p>
              <p>{new Date(price.date).toLocaleString()}</p>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

function App({ addItem, seedStore, products, prices }) {
  const [form, setForm] = useState({ name: '', price: '' });
  const [formType, setFormType] = useState('create');

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get('https://www.mocky.io/v2/5c3e15e63500006e003e9795');
      const {
        data: { products },
      } = response;

      seedStore(products);
    }

    fetchData();
  }, [seedStore]);

  const onChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  function action() {
    if (formType === 'create') {
      addItem({
        ...form,
      });
    }
  }

  return (
    <div className="container-large">
      <h2 className="heading">Mpharma Inventory System</h2>
      <Card className="form-card">
        <Form type={formType} action={action} form={form} onChange={onChange} />
      </Card>

      <div className="products">
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  seedStore: seed,
  addItem,
};

const mapStateToProps = (state) => {
  const {
    products: { products, prices },
  } = state;

  return {
    products: products.map((product) => {
      product.prices = prices.filter((price) => price.productId === product.id);
      return product;
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
