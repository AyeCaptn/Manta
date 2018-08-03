import { getAllDocs } from '../helpers/pouchDB';

// Retrieve Initial state from IndexDB
const getInitialState = () =>
  Promise.all([getAllDocs('contacts'), getAllDocs('invoices'), getAllDocs('items'), getAllDocs('categories')])
    .then(values => ({
      contacts: values[0],
      invoices: values[1],
      items: values[2],
      categories: values[3],
    }))
    .catch(err => console.log(err));

export { getInitialState };
