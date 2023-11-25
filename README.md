# FloresCCTVWebService

Web service for FloresCCTV to delegate API calls for internal/external services

## Development

### Project install

Clone the repo and install the dependencies

```
git clone git@github.com:ArvinFlores/FloresCCTVWebService.git
npm i
```

### Create env file

Create a `.env` file in the root of the project and add the following

```
FILE_STORAGE_DIR=<folder id of google drive directory>
```

To get the folder id of a google drive directory go to https://drive.google.com/drive/u/1/home and click on the folder you would like to store files in. The folder id will be in the url `https://drive.google.com/drive/u/1/folders/<FOLDER_ID>`.

### Add google service account key file

Add the service account json file for your google drive account into `config/google_service.json`. This json file will be needed by the app to interface with the Google Drive API. See [here](https://developers.google.com/workspace/guides/create-credentials#service-account) for how to create a key json file for service accounts.

### Start dev server

To start the dev server on `http://localhost:3000` run
```
npm run dev
```

## Scripts

| Script      | Description |
| ----------- | ----------- |
| start | builds the assets and starts the node server on `http://localhost:3000` |
| dev | starts the hot reloading dev server on `http://localhost:3000` |
| lint | lints the js/ts files |
| build | creates production assets and places them in the `build/` directory |
