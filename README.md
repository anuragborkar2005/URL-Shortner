

# URL Shortener

The URL Shortener is a web application designed to simplify long URLs into manageable, easy-to-share short links. This project is ideal for those looking to streamline their online sharing experience, whether on social media, emails, or any other digital platform.

## Features
- **Simplify Long URLs**: Convert lengthy URLs into short, easily shareable links.
- **Custom Short Codes**: Optionally, create custom short codes for easy recall and branding.
- **Redirect Functionality**: Automatically redirects users to the original URL when they access the short link.
- **User-Friendly Interface**: A clean and intuitive interface for both creating and managing short URLs.
- **Persistent Storage**: All generated short links are stored in a JSON file, ensuring they persist across server restarts.

## Technologies Used
- **Frontend**: HTML, CSS (TailwindCSS), and JavaScript.
- **Backend**: Node.js with HTTP server functionality.
- **Storage**: JSON file for storing the URL mappings.
- **Security**: Ensures only valid URLs are processed and stored.

## How It Works
1. **Enter URL**: Users can input the original URL they want to shorten.
2. **Custom Code (Optional)**: Users can provide a custom short code; otherwise, a random code is generated.
3. **Shorten and Save**: The application generates a short URL and saves the mapping in a JSON file.
4. **Access Short URL**: When the short URL is accessed, the application redirects to the original URL.

## Getting Started
To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/url-shortener.git
   ```
2. Navigate to the project directory:
   ```sh
   cd url-shortener
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Usage
1. Start the server:
   ```sh
   node app.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Contact
Anurag Borkar - [anuragborkar2005@gmail.com](mailto:anuragborkar2005@gmail.com)

Project Link: [https://github.com/anuragborkar2005/url-shortener](https://github.com/anuragborkar2005/url-shortener)

