const { MongoClient } = require('mongodb')
require('dotenv').config()

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    const db = client.db('libraryApp')
    // const coll = db.collection('authors')

    // const docs = [
    //   {
    //     name: 'Robert Martin',
    //     born: 1952,
    //   },
    //   {
    //     name: 'Martin Fowler',
    //     born: 1963,
    //   },
    //   {
    //     name: 'Fyodor Dostoevsky',
    //     born: 1821,
    //   },
    //   {
    //     name: 'Joshua Kerievsky',
    //   },
    //   {
    //     name: 'Sandi Metz',
    //   },
    // ]
    // const result = await coll.insertMany(docs)
    // console.log(result.insertedIds)

    const coll2 = db.collection('books')

    const docs2 = [
      {
        title: 'Clean Code',
        published: 2008,
        author: '635befd90ac095ef623ae810',
        genres: ['refactoring'],
      },
      {
        title: 'Agile software development',
        published: 2002,
        author: '635befd90ac095ef623ae810',
        genres: ['agile', 'patterns', 'design'],
      },
      {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: '635befd90ac095ef623ae811',
        genres: ['refactoring'],
      },
      {
        title: 'Refactoring to patterns',
        published: 2008,
        author: '635befd90ac095ef623ae813',
        genres: ['refactoring', 'patterns'],
      },
      {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: '635befd90ac095ef623ae814',
        genres: ['refactoring', 'design'],
      },
      {
        title: 'Crime and punishment',
        published: 1866,
        author: '635befd90ac095ef623ae812',
        genres: ['classic', 'crime'],
      },
      {
        title: 'The Demon ',
        published: 1872,
        author: '635befd90ac095ef623ae812',
        genres: ['classic', 'revolution'],
      },
    ]
    const result2 = await coll2.insertMany(docs2)
    console.log(result2.insertedIds)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
