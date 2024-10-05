# Project README

## Challenge Overview

This project is a React and TypeScript implementation of a page that features a left-side menu, footer, and a main list of cards. The layout is designed to be user-friendly, visually appealing, and responsive.

## DONE

1. **Used FSD Architecture**  
   Implemented Feature-Sliced Design (FSD) for improved scalability and maintainability.

2. **Used CSS Variables for Theming**  
   Employed CSS variables for flexible and easily adjustable theming.

3. **Integrated Public API**  
   Utilized the JSONPlaceholder API to fetch and display at least 10 entries, showing "name" and "subject" fields.

4. **Expandable Cards**  
   Cards can be expanded or collapsed by clicking on them or on any text-free space.

5. **Pagination Functionality**  
   Implemented pagination controls to navigate between pages of posts.

6. **Kept Page Index State in URL**  
   Maintained current page index in the URL for persistence during page reloads.

7. **Removed Cards**  
   Added the ability to remove cards by clicking a button.

## TODO
1. **Confirmation for Deleting Posts**  
   Implemented a confirmation dialog to prevent accidental deletions of cards.

2. **Update Post List After Deletion**  
   Ensured the list of entries is updated based on the current page index after a post is deleted.

3. **Display Error State on the Page**  
    Incorporated error handling to show messages for failed operations.

4. **Improve Accessibility**  
    Enhanced accessibility features to ensure the application is usable for all users.

## NOTES

1. **Handling Clicks in Text-Free Spaces**  
   Uncertainty exists on whether any text-free space can collapse cards. The `handleTextFreeClick` function checks for text nodes at the click point.

## Demo

The project is deployed and demo-ready. You can access it [here](insert-demo-link).
