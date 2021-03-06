# express-rest-paginate

> Express pagination middleware.

## Install

```bash
npm install -S express-rest-paginate
```

## Example with Sequelize ORM
```js

// # app.js

const express = require('express');
const restPaginate = require('express-rest-paginate');
const app = express();

// keep this before all routes that will use pagination
app.use(restPaginate());

// with optional startup settings
app.use(restPaginate({
    offset: 0, //default: 0
    page: 1, //default: 1
    limit: 30, //default: 10
    sort: 'created_at', //default: createdAt
    descTrue: 'desc', //default: desc
    descFalse: 'asc' //default: asc
}));

//page  = limit * offset

app.get('/users', async (req, res, next) => {
  const user = await User.findAndCountAll({
    offset: req.paginate.page,
    limit: req.paginate.limit,
    order: [[req.paginate.sort, req.paginate.desc]],
  });

  return res.json(user);
});

app.listen(3000);
```