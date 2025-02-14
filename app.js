import { writeFile } from "fs/promises"; // Importing the writeFile function from fs/promises
import { readFile } from "fs/promises"; // Importing the readFile function from fs/promises
import { createServer } from "http"; // Importing the createServer function from http
import path from "path"; // Importing the path module for handling file paths
import crypto from "crypto"; // Importing the crypto module for generating random bytes

const PORT = 3000; // Defining the port number for the server
const DATA_FILE = path.join("data", "links.json"); // Defining the path to the JSON file that stores the links

// Function to save links to the JSON file
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links)); // Writing the links object to the JSON file
};

// Function to serve static files like HTML and CSS
const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath); // Reading the file content
    res.writeHead(200, { "Content-Type": contentType }); // Setting the content type and status code to 200
    res.end(data); // Sending the file content as the response
    console.log(`Served ${filePath}`);
  } catch (error) {
    console.log(`Error in serving ${filePath}: `, error);
    res.writeHead(404, { "Content-Type": "text/plain" }); // Setting the status code to 404 if the file is not found
    res.end("404 page not found"); // Sending a 404 error message as the response
  }
};

// Function to load links from the JSON file
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8"); // Reading the JSON file content as a string
    return JSON.parse(data); // Parsing the JSON string and returning the links object
  } catch (error) {
    if (error.code === "ENOENT") {
      // Checking if the error is because the file does not exist
      await writeFile(DATA_FILE, JSON.stringify({})); // Creating an empty JSON file
      return {}; // Returning an empty object
    }
    throw error; // Throwing the error if it is not an ENOENT error
  }
};

// Creating the HTTP server
const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    // Handling GET requests
    if (req.url === "/") {
      return serveFile(res, path.join("src", "index.html"), "text/html"); // Serving the index.html file
    } else if (req.url === "/output.css") {
      return serveFile(res, path.join("src", "output.css"), "text/css"); // Serving the output.css file
    } else if (req.url === "/links") {
      const links = await loadLinks(); // Loading the links from the JSON file
      res.writeHead(200, { "Content-Type": "application/json" }); // Setting the content type to JSON
      return res.end(JSON.stringify(links)); // Sending the links as the response
    } else {
      const links = await loadLinks(); // Loading the links from the JSON file
      const shortCode = req.url.slice(1); // Extracting the short code from the URL
      if (links[shortCode]) {
        res.writeHead(302, { location: links[shortCode] }); // Redirecting to the original URL
        return res.end();
      }
      res.writeHead(404, { "Content-Type": "text/plain" }); // Setting the status code to 404 if the short code is not found
      return res.end("Shortened URL is not found"); // Sending a 404 error message as the response
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    // Handling POST requests to shorten a URL
    const links = await loadLinks(); // Loading the links from the JSON file
    let data = "";
    req.on("data", (chunk) => {
      data += chunk; // Collecting the data chunks
    });
    req.on("end", async () => {
      console.log(data);
      const { url, code } = JSON.parse(data); // Parsing the JSON data

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" }); // Setting the status code to 400 if the URL is not provided
        return res.end("URL is required"); // Sending an error message as the response
      }

      const finalShortCode = code || crypto.randomBytes(4).toString("hex"); // Generating a short code if it is not provided

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" }); // Setting the status code to 400 if the short code already exists
        return res.end("Short Code already exists. Please choose another"); // Sending an error message as the response
      }
      links[finalShortCode] = url; // Adding the URL to the links object with the short code as the key

      await saveLinks(links); // Saving the links to the JSON file

      res.writeHead(200, { "Content-Type": "application/json" }); // Setting the content type to JSON
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode })); // Sending the short code as the response
    });
  }
});

// Starting the server and listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}/ `);
});
