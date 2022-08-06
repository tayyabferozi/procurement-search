## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

### Context

We would like you to implement a new feature in a sample procurement data search app.

We’ve built a very simple page that lets users search the content of our famous [Tender Wall of Fame](app.stotles.com/wall-of-fame). The page needs some obvious usability improvements and we want the users to be able to search records by the government organisations that published them.

# Warm-up exercises

To find your way around the codebase please start with making these few small improvements:

1. Currently the text query only searches in record’s title. Modify the search API to also search in the description of the record.
2. The search only returns records where the text query appears at the start of the title. After you add searching in description, change the logic to search anywhere in the text, not only for the prefix.
3. The fields displayed in the table are minimal. Add the following fields to the table:
   - value (including currency)
   - stage:
     - for tenders (see `stage` column):
       - “Open until {close_date}” if close date is null or close date is in the future
       - “Closed” otherwise
     - for contracts (see `stage` column):
       - “Awarded on `{award_date}`”

# The task

Every procurement record has a buyer (see `server/migrations/001_initial_schema.sql`) - the government organisation that published it and will buy the requested works or services.

We would like to add a “buyer” filter to our record search.

Requirements:

1. Add a buyer filter selector, where users can select any buyer in the database.
2. When the user selects a buyer, the results are filtered to only show the records published by that buyer.
3. The existing text query should still work in combination with the buyer search.
4. In the real world application we would have to support millions of records and tens of thousands of buyers. Please consider this when designing your solution as we will take this assumption into account when reviewing your code.

### Other notes & tips

- The code uses [Ant Design](https://ant.design/components/overview/) components for the UI. The documentation will be useful for finishing the warm-up tasks & you might find some components that will help with the main task.
- The existing codebase has minimal structure - feel free to refactor it as you see fit or leave comments describing how it should be structured.
- Consider how we could make the search experience better, what improvements we could implement? Add comments in code or notes in the README.
- Tests are not a requirement - write them if you think a piece of code needs them or if they help you in the development process.

* **Links**

  - What is a tender? [A bit more detail about procurement](https://en.wikipedia.org/wiki/Invitation_to_tender)
  - Sequelize documentation
    - [Raw SQL queries](https://sequelize.org/docs/v6/core-concepts/raw-queries/)

* **Changes**
  - Added the "buyer" interface/type in the top of App.tsx and passed a function down to the table component for setting the buyer filter
  - Added two new fields (value and stage) in the table
  - Returned the same two fields (value and stage) along-with two more fields (award_date and close_date) from the API to use on the frontend
  - Added a new field (buyerID) in the search API to filter out for a specific buyer
  - Adjusted the front-end to adopt the change
  - Made the buyer name (in the table) clickable to apply the filter
  - Made the breadcrumb item clickable if the buyer filter is applied and the selected buyer's name in the breadcrumb
  - Fixed the search API to search through the whole title (rather than just the prefix)
  - Fixed the search API to also look for the search query inside the record description
  - Added a new class in App.css
