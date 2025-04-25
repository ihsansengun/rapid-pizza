# Rapid Pizza - Hooks and Redux Documentation

## Table of Contents
1. [React Hooks](#react-hooks)
   - [Built-in React Hooks](#built-in-react-hooks)
   - [React Router Hooks](#react-router-hooks)
   - [Redux Hooks](#redux-hooks)
2. [Redux Implementation](#redux-implementation)
   - [Store Configuration](#store-configuration)
   - [User Slice](#user-slice)
   - [Cart Slice](#cart-slice)
   - [Redux Patterns](#redux-patterns)

## React Hooks

### Built-in React Hooks

#### useState
The `useState` hook is used to add state management to functional components. In Rapid Pizza, it's used in several components:

1. **CreateOrder.jsx**
   ```jsx
   const [withPriority, setWithPriority] = useState(false);
   ```
   This state tracks whether the user wants to make their order a priority order, which affects the total price.

2. **SearchOrder.jsx**
   ```jsx
   const [query, setQuery] = useState('');
   ```
   This state manages the search input value when users search for their orders.

3. **CreateUser.jsx**
   ```jsx
   const [username, setUsername] = useState("");
   ```
   This state manages the username input when users create their profile.

#### useEffect
The `useEffect` hook performs side effects in functional components. In Rapid Pizza, it's used in:

1. **Order.jsx**
   ```jsx
   useEffect(() => {
     if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
   }, [fetcher]);
   ```
   This effect loads the menu data when the component is idle and doesn't have data yet, which is needed to display pizza ingredients in the order details.

### React Router Hooks

#### useLoaderData
The `useLoaderData` hook provides access to data returned from route loader functions. In Rapid Pizza, it's used in:

1. **Menu.jsx**
   ```jsx
   const menu = useLoaderData();
   ```
   This accesses the menu data loaded by the loader function, which fetches the pizza menu from the API.

2. **Order.jsx**
   ```jsx
   const order = useLoaderData();
   ```
   This accesses the order data loaded by the loader function, which fetches a specific order from the API.

#### useFetcher
The `useFetcher` hook allows interaction with loaders and actions without causing navigation. In Rapid Pizza, it's used in:

1. **Order.jsx**
   ```jsx
   const fetcher = useFetcher();
   ```
   This is used to fetch menu data to display pizza ingredients in the order details without navigating away from the order page.

2. **UpdateOrder.jsx**
   ```jsx
   const fetcher = useFetcher();
   ```
   This is used to submit a form that updates an order (making it priority) without navigating away from the page.

#### useNavigation
The `useNavigation` hook provides information about the current navigation state. In Rapid Pizza, it's used in:

1. **AppLayout.jsx**
   ```jsx
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';
   ```
   This is used to show a loading indicator during navigation transitions.

2. **CreateOrder.jsx**
   ```jsx
   const navigation = useNavigation();
   const isSubmitting = navigation.state === "submitting";
   ```
   This is used to disable the submit button and show a loading message while the form is being submitted.

#### useActionData
The `useActionData` hook provides access to data returned from route action functions. In Rapid Pizza, it's used in:

1. **CreateOrder.jsx**
   ```jsx
   const formErrors = useActionData();
   ```
   This accesses validation errors returned from the action function when creating an order.

### Redux Hooks

#### useSelector
The `useSelector` hook extracts data from the Redux store state. In Rapid Pizza, it's used extensively:

1. **Cart.jsx**
   ```jsx
   const cart = useSelector(getCart);
   const username = useSelector(getUserName);
   ```
   This accesses the cart items and username from the Redux store.

2. **CartItem.jsx**
   ```jsx
   const currentQuantity = useSelector(getCurrentQuantityByID(pizzaId));
   ```
   This accesses the quantity of a specific item in the cart.

3. **MenuItem.jsx**
   ```jsx
   const currentQuantity = useSelector(getCurrentQuantityByID(id));
   ```
   This checks if a pizza is already in the cart and its quantity.

4. **CreateOrder.jsx**
   ```jsx
   const {
     username,
     status: addressStatus,
     position,
     address,
     error: errorAddress,
   } = useSelector((state) => state.user);
   ```
   This accesses various user-related state values for the order form.

#### useDispatch
The `useDispatch` hook returns the Redux store's dispatch function. In Rapid Pizza, it's used to dispatch actions:

1. **Cart.jsx**
   ```jsx
   const dispatch = useDispatch();
   function handleClearCart() {
     dispatch(clearCart());
   }
   ```
   This dispatches the clearCart action to empty the cart.

2. **DeleteItem.jsx**
   ```jsx
   const dispatch = useDispatch();
   function handleDelete() {
     dispatch(deleteItem(pizzaId));
   }
   ```
   This dispatches the deleteItem action to remove an item from the cart.

3. **UpdateItemQuantity.jsx**
   ```jsx
   const dispatch = useDispatch();
   // ...
   <Button type="round" onClick={() => dispatch(decreaseQuantity(id))}>-</Button>
   <Button type="round" onClick={() => dispatch(increaseQuantity(id))}>+</Button>
   ```
   This dispatches actions to increase or decrease item quantities.

4. **MenuItem.jsx**
   ```jsx
   const dispatch = useDispatch();
   function handleAddToCart() {
     dispatch(addItem(newItem));
   }
   ```
   This dispatches the addItem action to add a pizza to the cart.

5. **CreateOrder.jsx**
   ```jsx
   const dispatch = useDispatch();
   // ...
   <Button onClick={(e) => {
     e.preventDefault();
     dispatch(fetchAddress());
   }}>
     Get Position
   </Button>
   ```
   This dispatches the fetchAddress async thunk to get the user's location.

## Redux Implementation

### Store Configuration
The Redux store is configured in `store.js` using Redux Toolkit's `configureStore`:

```jsx
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
```

This creates a store with two slices:
- `user`: Manages user-related state
- `cart`: Manages shopping cart state

### User Slice
The user slice (`userSlice.js`) manages user information and geolocation functionality:

#### State Structure
```jsx
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
```

#### Reducers
```jsx
reducers: {
  updateName(state, action) {
    state.username = action.payload;
  },
},
```

#### Async Thunks
```jsx
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) Get user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Use reverse geocoding API to get address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Return position and address
    return { position, address };
  },
);
```

#### Extra Reducers
```jsx
extraReducers: (builder) =>
  builder
    .addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = "idle";
    })
    .addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }),
```

### Cart Slice
The cart slice (`cartSlice.js`) manages the shopping cart functionality:

#### State Structure
```jsx
const initialState = {
  cart: [],
};
```

#### Reducers
```jsx
reducers: {
  addItem(state, action) {
    // Check if item exists
    const existingItem = state.cart.find(
      (item) => item.pizzaId === action.payload.pizzaId,
    );

    if (existingItem) {
      // Update existing item
      existingItem.quantity += action.payload.quantity;
      existingItem.totalPrice += action.payload.totalPrice;
    } else {
      // Add new item
      state.cart.push(action.payload);
    }
  },

  deleteItem(state, action) {
    state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
  },

  increaseQuantity(state, action) {
    const item = state.cart.find((item) => item.pizzaId === action.payload);
    item.quantity++;
    item.totalPrice = item.quantity * item.unitPrice;
  },

  decreaseQuantity(state, action) {
    const item = state.cart.find((item) => item.pizzaId === action.payload);
    item.quantity--;
    item.totalPrice = item.quantity * item.unitPrice;
    if (item.quantity === 0) {
      cartSlice.caseReducers.deleteItem(state, action);
    }
  },

  clearCart(state) {
    state.cart = [];
  },
}
```

#### Selectors
```jsx
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getCurrentQuantityByID = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
```

### Redux Patterns

#### Memoized Selectors
The cart slice uses selector functions to derive data from the state, such as total quantity and price. These could be further optimized using the `reselect` library for memoization, as mentioned in a comment:

```jsx
// check reselect library for more optimised way
export const getCurrentQuantityByID = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
```

#### Async Thunks
The user slice uses Redux Toolkit's `createAsyncThunk` for handling asynchronous operations like fetching the user's address based on geolocation:

```jsx
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // Async logic...
  }
);
```

This creates a thunk action creator that automatically dispatches pending/fulfilled/rejected actions based on the promise state.

#### Immer Integration
Redux Toolkit uses Immer under the hood, allowing "mutating" logic in reducers that actually produces immutable updates:

```jsx
increaseQuantity(state, action) {
  const item = state.cart.find((item) => item.pizzaId === action.payload);
  item.quantity++; // This looks like mutation but is safe with Immer
  item.totalPrice = item.quantity * item.unitPrice;
},
```

#### Cross-Slice Selectors
The cart slice includes a selector that accesses the user slice state:

```jsx
export const getUserName = (state) => state.user.username;
```

This demonstrates how selectors can access data across different slices of the Redux store.

#### Dispatching from Outside Components
In some cases, Redux actions are dispatched from outside React components, such as in the CreateOrder action function:

```jsx
export async function action({ request }) {
  // ...
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
```

This pattern should be used sparingly, as noted in the comment, since it's generally better to dispatch actions from within React components or Redux middleware.