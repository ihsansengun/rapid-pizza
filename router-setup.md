
## Router Configuration

The application uses `createBrowserRouter` from React Router to define the routes. Here's the basic structure:

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);
```

## Route Structure

1. **Home Page**: `/` - Displays the main landing page
2. **Menu Page**: `/menu` - Shows the available pizza menu
3. **Cart Page**: `/cart` - Displays the user's shopping cart
4. **Create Order Page**: `/order/new` - Form for creating a new order
5. **Order Details Page**: `/order/:orderId` - Shows details for a specific order
   - Note: `:orderId` is a URL parameter that can be accessed in the Order component

## Common Layout

All routes are wrapped in an `AppLayout` component, which provides a consistent structure across all pages:

```jsx
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
```

The `Outlet` component from React Router is used to render the content of the active route within the layout.

## Implementation

The router is provided to the application using the `RouterProvider` component:

```jsx
function App() {
  return <RouterProvider router={router} />;
}
```

This setup allows for a clean separation of routing logic and component rendering, making the application more maintainable and easier to extend with new routes in the future.