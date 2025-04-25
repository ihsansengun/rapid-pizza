# Understanding useNavigation and Loading States in React Router

## What is useNavigation?

useNavigation is a hook provided by React Router (v6+) that gives you access to the current navigation state. This hook is extremely useful for implementing loading indicators and managing UI states during navigation transitions.

## Basic Usage

Code example:

import { useNavigation } from 'react-router-dom';

function MyComponent() {
  const navigation = useNavigation();

  // Access the current navigation state
  console.log(navigation.state);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

The useNavigation hook returns an object with the following properties:

- state: A string representing the current navigation state. Possible values are:
  - "idle": No navigation is in progress
  - "loading": Navigation is in progress (data is being loaded)
  - "submitting": Form submission is in progress

- location: The location that is being navigated to (if navigation is in progress)
- formData: Form data that is being submitted (if a form submission is in progress)
- formAction: The action URL for the form being submitted
- formMethod: The HTTP method used for the form submission

## Using isLoading with useNavigation

A common pattern is to create an isLoading variable based on the navigation state:

Code example:

import { useNavigation } from 'react-router-dom';
import Loader from './Loader';

function MyComponent() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && <Loader />}
      {/* Rest of your component */}
    </div>
  );
}

## Real-World Example from Our Codebase

In our application, we use useNavigation in the AppLayout component to show a loading indicator whenever data is being fetched during navigation:

Code example (AppLayout.jsx):

import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader.jsx";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

This works in conjunction with loader functions defined in our route components:

Code example (Menu.jsx):

import { getMenu } from "../../services/apiRestaurant.js";
import { useLoaderData } from "react-router-dom";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

// This loader function triggers the loading state
export async function loader() {
  return await getMenu();
}

export default Menu;

## Best Practices

1. Global Loading Indicators: Place the loading indicator in a layout component that wraps your routes to show loading states for all navigation events.

2. Granular Loading States: For more complex UIs, you can use useNavigation in specific components to show loading states only for certain parts of the UI.

3. Error Handling: Combine with error boundaries or try/catch blocks in loader functions to handle loading errors gracefully.

4. User Experience: Use loading indicators to provide feedback to users during data fetching operations, especially for operations that might take time.

5. Conditional Rendering: Use the loading state to conditionally render UI elements or disable interactive elements during navigation.

## When to Use useNavigation vs. Other Loading State Management

- Use useNavigation when you want to track loading states related to route transitions and data loading through React Router's loader functions.

- For loading states not related to navigation (e.g., button click actions, manual API calls), consider using React's useState or other state management solutions.

## Conclusion

The useNavigation hook is a powerful tool for managing loading states in React Router applications. By leveraging this hook, you can create responsive UIs that provide clear feedback to users during navigation and data loading operations.
