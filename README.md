# Textbook Reader and Analyzer
This simple React WebApp will analyze images of textbooks and provide the text it contains as well as a summary of its content.
# How To Set Up
After cloning the repository, run `npm i` to download the necessary packages. Then, create a `.env` file in the root folder with the variable `REACT_APP_HUGGINGFACE_TOKEN` set to your HuggingFace token. Run `npm start` to deploy locally.

# Branch Layout
The main branch will contain the bare minimum code that we will be teaching during the series. The `fancy` branch will contian a tricked-out version of the code with all the bells and whistles: pretty CSS (complete with squircle buttons), an option to paste the image rather than choose a file, and perhaps a way to take a pdf and do the analysis on that (even if it has multiple pages ;) ). 