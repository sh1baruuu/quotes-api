const express = require("express");
const port = 3000;
const app = express();
const quotes = require("./quotes");
const tags = require("./tags")

app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/api/quotes", (req, res) => {
    const { tags, author } = req.query;
    let quoteLists = quotes;

    if (tags) {
        const tagList = tags.toLowerCase().split(","); // Convert query tags to lowercase
        quoteLists = quotes.filter(quote => tagList.some(tag => quote.tags.includes(tag.toLowerCase())));

        if (quoteLists.length === 0) {
            return res.status(404).json({ message: 'No quotes found for the specified tags' });
        }
    }


    if (author) {
        const thisAuthor = author.toLowerCase();
        quoteLists = quotes.filter(quote => quote.author.toLowerCase().startsWith(thisAuthor));
        if (quoteLists.length === 0) {
            return res.status(404).json({ message: 'No quotes found for the specified author' });
        }
    }

    res.status(200).json(quoteLists);
});

app.get("/api/quotes/tags", (req, res) => {
    res.status(200).json(tags)
})



app.all("*", (req, res) => {
    res.status(404).send("Page not Found")
})


app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

