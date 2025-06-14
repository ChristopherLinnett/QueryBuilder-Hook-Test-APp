# README

## Description
The purpose of this repo is to finetune/test and implement a custom component that can be slotted into any JSX code in React. 
- Using hooks can be very inefficient, and when data from multiple locations is needed, it can cause an unlimited amount of re-renders
- The goal here is to create a self contained Component that can be declared in JSX that will take the DECLARATION of a hook (such as UseQuery hook), take in its parameters (if any), then allow the output to be used in its children.

## The Reason
- This would greatly decrease re-renders as only the nested children with changing datasource would be re-rendered. Not the entire page/parent it is rendered within. 
- This also would allow a user to get around the typical rules of hooks. 
  - Conditional Hooks: Rendering this component conditionally is perfectly fine. The internal hook would not be invoked until this component is rendered (by the necessary condition)
  - Iterating over hooks. Lets say there's a list element, you want to pass an id to render it. Normally, you'd have to add the querying logic to the child component, in this case. You can use a reusable component along with this Builder component and only pass the necessary data. Keeping your code reusable for other contexts, without having the typicl detriments of keeping the hook at a higher level. 
  - Placing the hook anywhere. Lets say your page Simply needs a small piece of data for one small section. It can simply be placed here, and allow it to return your component from it. No need to either, put this hook at top level creating additional re-renders, and no need to go create another custom component just for this small implementation.
- State handling, usign a library like Tanstack Query is great, but as mentioned above, having multiple datasources being fetched in a single page would cause multiple re-renders, and potential data conflicts and make the code harder to read. This will allow you to only get the specific data in the specific place where you want it. It will also allow you to use the appropriate loading/error states in that specific area without having to interfere with the rest of the page operation. 